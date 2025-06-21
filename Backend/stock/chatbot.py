from langgraph.graph import StateGraph
from langgraph.prebuilt import create_react_agent
from langchain.agents import create_react_agent, AgentExecutor
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import Tool
from langchain_community.tools import DuckDuckGoSearchRun
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from typing import TypedDict
from dotenv import load_dotenv
import re
import os
from .company_name_symbol import symbol_map

load_dotenv()

# Tool 1: DuckDuckGo Symbol Resolver
search_tool = DuckDuckGoSearchRun()

def resolve_company_symbol(company_name: str) -> str:
    import re
    key = company_name.lower().strip()
    if key in symbol_map:
        return symbol_map[key]
    try:
        response = search_tool.run(f"{company_name.strip()} NSE stock symbol")
        match = re.search(r"\b([A-Z]{2,10})\.NS\b", response)
        if match:
            found_symbol = match.group(0).strip()
            return found_symbol
        return "Symbol not found"
    except Exception:
        return "Symbol not found due to search error"

symbol_lookup_tool = Tool(
    name="FindCompanySymbol",
    func=resolve_company_symbol,
    description="Use this to find the NSE stock symbol for a company. Input must be a company name like 'Infosys', 'Tata Motors', not a symbol like 'INFY.NS'."
)

# Tool 2: Company Overview Fetcher
def get_company_overview(symbol: str) -> str:
    try:
        import yfinance as yf
        ticker = yf.Ticker(symbol)
        info = ticker.info or {}

        profile = {
            "Company": info.get("longName"),
            "Sector": info.get("sector"),
            "Industry": info.get("industry"),
            "Website": info.get("website"),
            "Description": info.get("longBusinessSummary"),
            "Market Cap": info.get("marketCap"),
            "P/B Ratio": info.get("priceToBook"),
            "PEG Ratio": info.get("pegRatio"),
            "ROE": info.get("returnOnEquity"),
            "Profit Margin": info.get("profitMargins"),
            "Beta": info.get("beta"),
            "Current Ratio": info.get("currentRatio"),
            "Debt to Equity": info.get("debtToEquity")
        }

        fast = ticker.fast_info or {}
        hist = ticker.history(period="1d")
        if not hist.empty:
            today = hist.iloc[0]
            profile.update({
                "Open": today.get("Open"),
                "Close": today.get("Close"),
                "High": today.get("High"),
                "Low": today.get("Low"),
                "Volume": today.get("Volume"),
                "Current Price": fast.get("last_price"),
                "Previous Close": fast.get("previous_close"),
                "52W High": info.get("fiftyTwoWeekHigh"),
                "52W Low": info.get("fiftyTwoWeekLow"),
                "Trailing P/E": info.get("trailingPE")
            })

        formatted = "\n".join([f"{k}: {v}" for k, v in profile.items() if v is not None])
        return formatted if formatted else f"No detailed profile found for {symbol}."
    except Exception as e:
        return f"Error fetching data for {symbol}: {str(e)}"

company_profile_tool = Tool(
    name="GetCompanyProfile",
    func=get_company_overview,
    description="Get a company's financial and stock profile using its NSE symbol."
)

# Tool 3: Company Comparison
def compare_companies(two_company_names_str: str) -> str:
    import re
    names = []

    match = re.search(r"(.*) and (.*)", two_company_names_str.lower().strip())
    if match:
        names = [match.group(1).strip(), match.group(2).strip()]
    else:
        names = [n.strip() for n in two_company_names_str.split(",") if n.strip()]

    if len(names) < 2:
        return f"Could not extract two company names from '{two_company_names_str}'."

    name1, name2 = names[:2]
    symbol1 = resolve_company_symbol(name1)
    symbol2 = resolve_company_symbol(name2)

    if "not found" in symbol1.lower() or "not found" in symbol2.lower():
        return f"Could not resolve symbol(s): {name1} -> {symbol1}, {name2} -> {symbol2}"

    try:
        profile1 = get_company_overview(symbol1)
        profile2 = get_company_overview(symbol2)

        return (
            f"Compare the following companies:\n\n"
            f"{name1} ({symbol1}):\n{profile1}\n\n"
            f"{name2} ({symbol2}):\n{profile2}\n\n"
            f"Now compare their revenue, valuation, and financial health."
        )
    except Exception as e:
        return f"Comparison failed: {str(e)}"

comparison_tool = Tool(
    name="CompareCompanies",
    func=compare_companies,
    description="Compare two companies by name. Input format: 'CompanyA and CompanyB' or 'CompanyA, CompanyB'."
)

# LLM and Agent Setup
llm = ChatGoogleGenerativeAI(model="models/gemini-1.5-pro", google_api_key=os.environ["GOOGLE_API_KEY"])

prompt = PromptTemplate.from_template("""
You are a helpful financial assistant. You can access tools to answer user questions.

You have access to the following tools:
{tools}

Use the following format:

Chat History:
{chat_history}

Question: {input}
Thought: think about what to do
Action: choose a tool from [{tool_names}]
Action Input: the input to the tool
Observation: result of the action
... (this Thought/Action/... block can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the user's question

Begin!

{agent_scratchpad}
""")

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

agent = create_react_agent(
    llm=llm,
    tools=[symbol_lookup_tool, company_profile_tool, comparison_tool],
    prompt=prompt,
)

agent_executor = AgentExecutor(
    agent=agent,
    tools=[symbol_lookup_tool, company_profile_tool, comparison_tool],
    verbose=True,
    memory=memory,
    return_intermediate_steps=True,
    handle_parsing_errors=True,
    output_key="output",
)

# LangGraph StateGraph Setup
class GraphState(TypedDict):
    input: str
    output: str
    memory: dict

def run_agent_with_memory(state: GraphState) -> GraphState:
    query = state["input"]
    memory_dict = state.get("memory", {"chat_history": []})
    chat_history = memory_dict.get("chat_history", [])

    result = agent_executor.invoke({
        "input": query,
        "chat_history": chat_history
    })

    chat_history.append({"role": "user", "content": query})
    chat_history.append({"role": "ai", "content": result["output"]})
    memory_dict["chat_history"] = chat_history

    return {
        "input": query,
        "output": result["output"],
        "memory": memory_dict
    }

graph = StateGraph(GraphState)
graph.add_node("agent", run_agent_with_memory)
graph.set_entry_point("agent")
compiled_graph = graph.compile()

# Global memory across chats
graph_memory: dict = {"chat_history": []}

def Query(query: str) -> str:
    print("ENTERED IN FUNCTION")
    inputs = {
        "input": query,
        "memory": graph_memory
    }

    output = None
    try:
        for state in compiled_graph.stream(inputs):
            if "agent" in state and "output" in state["agent"]:
                output = state["agent"]["output"]
    except Exception as e:
        output = f"Error during execution: {str(e)}"

    graph_memory.update(inputs["memory"])
    return output or "No output generated."

def ResetMemory():
    global graph_memory
    graph_memory = {"chat_history": []}
    return "Memory cleared."
