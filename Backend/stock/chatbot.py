from langgraph.graph import StateGraph
from langgraph.prebuilt import create_react_agent
from langchain.agents import create_react_agent, AgentExecutor
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import Tool 
from langchain_community.tools import DuckDuckGoSearchRun 
from langchain.prompts import PromptTemplate
import yfinance as yf
from langchain.memory import ConversationBufferMemory
import re
import os
from typing import TypedDict
from .company_name_symbol import symbol_map
load_dotenv()
# 1. Static Symbol Map for Fast Resolution


# 2. Tool: Symbol Resolver with Fallback
search_tool = DuckDuckGoSearchRun()

def resolve_company_symbol(company_name: str) -> str:
   
    key = company_name.lower().strip()
    

    if key in symbol_map:
        return symbol_map[key]
    
    try:
       
        response = search_tool.run(f"{company_name.strip()} NSE stock symbol")
       
        match = re.search(r"([A-Z]{2,10})\\.NS", response) # Look for CAPITALLETTERS.NS
        if match:
            found_symbol = match.group(0)
           
            return found_symbol
        else:
            
            return "Symbol not found"
    except Exception as e:
        
        return "Symbol not found due to search error"

symbol_lookup_tool = Tool(
    name="FindCompanySymbol",
    func=resolve_company_symbol,
    description="Use this to find the NSE stock symbol for a company. The input MUST be just the company name, like 'Infosys', 'Tata Motors', or 'Reliance', NOT a symbol like 'INFY.NS'. If the user asks for a generic name like 'TATA', you should clarify which specific Tata company (e.g., 'Tata Consultancy Services', 'Tata Motors', 'Tata Steel') they mean before calling this tool, or try a common one like 'Tata Consultancy Services'."
)

# 3. Tool: Fetch Company Info from yfinance
def get_company_overview(symbol: str) -> str:
    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info

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

        fast = ticker.fast_info
        hist = ticker.history(period="1d")
        if not hist.empty:
            today = hist.iloc[0]
            profile.update({
                "Open": today["Open"],
                "Close": today["Close"],
                "High": today["High"],
                "Low": today["Low"],
                "Volume": today["Volume"],
                "Current Price": fast.get("last_price"),
                "Previous Close": fast.get("previous_close"),
                "52W High": info.get("fiftyTwoWeekHigh"),
                "52W Low": info.get("fiftyTwoWeekLow"),
                "Trailing P/E": info.get("trailingPE")
            })

        # Filter out None values and format output
        formatted_profile = "\n".join([f"{k}: {v}" for k, v in profile.items() if v is not None])
        if not formatted_profile:
            return f"No detailed profile information found for {symbol}."
        return formatted_profile
    except Exception as e:
        return f"Error fetching company data for {symbol}: {str(e)}"

company_profile_tool = Tool(
    name="GetCompanyProfile",
    func=get_company_overview,
    description="Use this to get full financial + stock data of a company using its NSE symbol."
)

# 4. Tool: Compare Companies Based on Name Extraction -> Symbol -> Compare
def compare_companies(two_company_names_str: str) -> str:
    """
    Compares two companies.
    Input should be a string containing two company names separated by ' and ' or ','.
    Example: 'Infosys and TCS' or 'Infosys, TCS'
    """
    names = []
    # Try parsing "CompanyA and CompanyB"
    match_and = re.search(r"(.*) and (.*)", two_company_names_str.lower().strip())
    if match_and:
        names = [match_and.group(1).strip(), match_and.group(2).strip()]
    else:
        # Fallback to comma-separated if "and" not found
        names_split_comma = [n.strip() for n in two_company_names_str.split(',')]
        names = [n for n in names_split_comma if n] # Filter out empty strings

    if len(names) < 2:
        return f"Could not extract two company names from '{two_company_names_str}'. Please provide two company names, e.g., 'Infosys and TCS' or 'Infosys, TCS'."

    name1, name2 = names[0], names[1]
    # print(f"DEBUG: Comparing '{name1}' and '{name2}'")

    symbol1 = resolve_company_symbol(name1)
    symbol2 = resolve_company_symbol(name2)

    if "not found" in symbol1.lower() or "not found" in symbol2.lower():
        return f"Could not resolve symbol(s) for comparison: {name1} -> {symbol1}, {name2} -> {symbol2}"

    try:
        profile1 = get_company_overview(symbol1)
        profile2 = get_company_overview(symbol2)

        return (
            f"Compare the following companies:\n\n"
            f"{name1} ({symbol1}):\n{profile1}\n\n"
            f"{name2} ({symbol2}):\n{profile2}\n\n"
            f"Give a summary of which company performs better in revenue, valuation, and financial health."
        )
    except Exception as e:
        return f"Comparison failed for {name1} and {name2}: {str(e)}"

comparison_tool = Tool(
    name="CompareCompanies",
    func=compare_companies,
    description="Use this to compare two companies by name. The input MUST be a string containing the two company names separated by ' and ' or a comma. Example: 'Infosys and TCS' or 'Infosys, TCS'."
)

# 5. Setup LLM and Prompt
llm = ChatGoogleGenerativeAI(model="models/gemini-1.5-pro", google_api_key=os.environ["GOOGLE_API_KEY"]) # Replace with your actual API key

# Removed the 'extract_company_names' function and tool, as it's better handled
# by the LLM's natural reasoning within the agent executor.

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
    tools=[symbol_lookup_tool,company_profile_tool,comparison_tool],
    prompt=prompt,
    )

agent_executor = AgentExecutor(
    agent=agent,
    tools=[symbol_lookup_tool, company_profile_tool,comparison_tool],
    verbose=True,
    memory=memory ,
    return_intermediate_steps=True,
    handle_parsing_errors=True,
    output_key="output",
    )

# 6. Setup LangGraph StateGraph
class GraphState(TypedDict):
    input: str
    output: str
    memory: dict  

def run_agent_with_memory(state: GraphState) -> GraphState:
    query = state["input"]
    memory_dict = state.get("memory", {})

    # Save chat history so far (list of strings)
    chat_history = memory_dict.get("chat_history", [])

    # Construct conversation string or list of messages
    result = agent_executor.invoke({
        "input": query,
        "chat_history": chat_history
    })

    # Append current query and response to chat history
    chat_history.append(("user", query))
    chat_history.append(("ai", result["output"]))

    # Store back updated memory
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

# if __name__ == "__main__":
#     # Example 1: Simple stock price lookup
#     print("--- Running Example 1: TCS stock price ---")
# Global memory object to persist across chats
graph_memory: dict = {}

def Query(query):
    print("ENTERED IN FUNCTION")
    inputs = {
        "input": query,
        "memory": graph_memory
    }

    # Run the compiled LangGraph and collect the output
    output = [s['agent']['output'] for s in compiled_graph.stream(inputs)]
    
    # Update memory after running the stream
    graph_memory.update(inputs["memory"])

    return output

    
