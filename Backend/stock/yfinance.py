import yfinance as yf
from .company_name_symbol import symbol_map

def getnifty (ind_name):

    # Load index
    nifty = yf.Ticker(ind_name)

    # Get market data
    info = nifty.info

    # Extract values
    current_price = info["regularMarketPrice"]
    previous_close = info["regularMarketPreviousClose"]

    return current_price,previous_close

def Company_info(company_name):
    print(company_name)
    key = company_name.lower().strip()
    print("KEY:",key)
    company_sym = ""
    if key in symbol_map:
        company_sym =  symbol_map[key]
    else: 
        return {"Error":"Invalid Company Name"}

    ticker = yf.Ticker(company_sym)
    info = ticker.info

    annual = ticker.income_stmt.loc[['Total Revenue', 'Net Income']].iloc[:, :4].T
    quarterly = ticker.quarterly_income_stmt.loc[['Total Revenue', 'Net Income']].iloc[:, :4].T

# Format for frontend use
    annual_data = [
        {
            "period": str(date.year),
            "revenue": int(row["Total Revenue"]),
            "profit": int(row["Net Income"]),
        }
        for date, row in annual.iterrows()
    ]

    quarterly_data = [
        {
            "period": date.strftime("%Y-%m"),
            "revenue": int(row["Total Revenue"]),
            "profit": int(row["Net Income"]),
        }
        for date, row in quarterly.iterrows()
    ]

    major_holders = ticker.get_major_holders()
    share_holdings = {}
    if major_holders is not None and not major_holders.empty:
        for key, value_series in major_holders.iterrows():
            try:
                share_holdings[key] = float(value_series['Value'])
            except (KeyError, ValueError):
                print(f"Warning: Could not process share holding for key '{key}'.")

    insiders = float(share_holdings.get('insidersPercentHeld', 0))
    institutions = float(share_holdings.get('institutionsPercentHeld', 0))
    others_share = max(0, 1 - insiders - institutions)    
    company_details = {
        "Company_Name": info['longName'],
        "Sector": info['sector'],
        "Industry": info['industry'],
        "Website": info['website'],
        "Description": info['longBusinessSummary'],
        "market_cap" : info.get("marketCap", "N/A"),
        "enterprise_value" : info.get("enterpriseValue", "N/A"),
        "peg_ratio" : info.get("pegRatio", "N/A"),
        "price_to_book" : info.get("priceToBook", "N/A"),
        "shares_outstanding" : info.get("sharesOutstanding", "N/A"),
        "beta" : info.get("beta", "N/A"),
        "profit_margin" : info.get("profitMargins"),               
        "operating_margin" : info.get("operatingMargins") ,        
        "return_on_assets" : info.get("returnOnAssets"),          
        "return_on_equity" : info.get("returnOnEquity"),          
        "debt_to_equity" : info.get("debtToEquity") ,              
        "current_ratio" : info.get("currentRatio"),               
        "quick_ratio" : info.get("quickRatio"),
        "annual_data" : annual_data ,
        "quarterly_data" :quarterly_data,
        "insiders" : insiders,
        "institutions" : institutions,
        "others" : others_share               
    }

    return company_details

def Company_Performance(company_name):

    key = company_name.lower().strip()
    company_sym = ""
    if key in symbol_map:
        company_sym =  symbol_map[key]
    else: 
        return {"Error":"Invalid Company Name"}
    
    ticker = yf.Ticker(company_sym)
    hist = ticker.history(period="1d")
    if hist.empty:
        return f"No data available for {company_name}"
    
    today_data = hist.iloc[0]
    
    info = ticker.info  
    cur = ticker.fast_info["last_price"]
    prev = ticker.fast_info["previous_close"]
    result = {
        "current_price" : cur,
        "previous_close" :prev ,
        "diff": cur-prev,
        "open": today_data["Open"],
        "close": today_data["Close"],
        "high_today": today_data["High"],
        "low_today": today_data["Low"],
        "volume": today_data["Volume"],
        "trailing_pe" : info.get("trailingPE", None),
        "fifty_two_week_high": info.get("fiftyTwoWeekHigh"),
        "fifty_two_week_low": info.get("fiftyTwoWeekLow"),
    }
    
    return result

def Financial_Statements(cmp_name):
    ticker = yf.Ticker(cmp_name)
    # Income Statement
    income_statement = ticker.financials

    # Balance Sheet    
    balance_sheet = ticker.balance_sheet

    # Cash Flow Statement
    cashflow_statement = ticker.cashflow

    # Quarterly versions
    quarterly_income = ticker.quarterly_financials
    quarterly_balance = ticker.quarterly_balance_sheet
    quarterly_cashflow = ticker.quarterly_cashflow