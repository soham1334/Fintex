from newspaper import Article
from langchain.schema import Document
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains.summarize import load_summarize_chain
import json
from dotenv import load_dotenv

load_dotenv()



llm = ChatGoogleGenerativeAI(model="models/gemini-1.5-pro-latest", google_api_key=os.environ["GOOGLE_API_KEY"])

response = llm.invoke("What is the capital of Maharashtra?")
print(response.content)

custom_prompt = PromptTemplate(
    input_variables=["text"],
    template="""
You are a professional financial news analyst.

Your task is to summarize the following article in exactly four clearly defined sections without using any subcategories or bullet points. The total word count of the summary must be between 70-100 words. Follow the structure and instructions below strictly.

Sections to include (in this exact format):

Company Highlights – Summarize the key details about the company, including the main business activity or event, and any strategic moves or updates mentioned.

Market Reaction – Describe any stock price movements, analyst reactions, or broader market/sector impacts that were noted.

Expert Insights – Include any quotes, opinions, or perspectives from executives, analysts, or government officials. Mention any forecasts or warnings if provided.

Leadership Perspectives – Summarize leadership or government viewpoints as presented in the article.

*Instructions:

Output must be a valid JSON object only.

Do not use subcategories or bullet points inside the JSON.

Do not invent, assume, or add any new points not present in the article.

If there is no information related to the above-mentioned point(s) available in the article, then ignore that point or points(dont mention 'NO information available about that point or something like it).

Keep each section concise and factual, sticking closely to the content provided.

**strictly dont include ```json and  ``` in output just output pure json form of summary

Article:
{text}
""",
    output_variables = [ "title","author","date_of_publish","Company Highlights","Market Reaction","Expert Insights"]
)

chain = load_summarize_chain(
    llm=llm,
    chain_type= "stuff",
    prompt=custom_prompt
)
#news_url = "https://www.moneycontrol.com/news/business/indias-gdp-rises-to-a-four-quarter-high-of-7-4-in-q4-full-year-fy25-growth-at-6-5-13070100.html"

def news_summary(news_url):
    url = news_url
    print("URL reached to new_summary") 
    def fetch_data (url) :
        article = Article(url)
        print("Article fetched from url")
        try:
            article.download()
            article.parse()
            print("News download and parse successful")
        except article as e: # Catch specific newspaper exceptions
            print(f"Error downloading article from {url}: {e}")
            raise ValueError(f"Failed to download article from {url}: {e}") # Raise a custom error    
       
       
        print("converted raw html to doc")
        return Document(
           page_content=article.text,
           metadata={
               "title": article.title,
               "authors": article.authors,
               "publish_date": str(article.publish_date) if article.publish_date else None,
               "source": url
            }
        )    
    

    news = fetch_data(url)
    doc = [news]
    print("Proceding to LLM calling and summatization")
    try:
        raw_llm_response = chain.run(input_documents=doc)
        print("LLM call successfull")
        summary = json.loads(raw_llm_response)
        print("summary successfully converted to json")
        print(summary)
        return summary
    except json.JSONDecodeError as e:
        print(f"JSONDecodeError: {e}")
        print(f"Raw LLM response was: {raw_llm_response}")
        raise ValueError(f"LLM did not return valid JSON: {raw_llm_response}") from e
    except Exception as e:
        print(f"An unexpected error occurred during summarization: {e}")
        raise
    
    

if __name__ == "__main__":
    news_summary(news_url)
    

