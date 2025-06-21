from .company_name_symbol import symbol_map

def get_stock_info(symbol):
    import yfinance as yf
    return yf.Ticker(symbol).info


def getnifty(ind_name):
    import yfinance as yf
    nifty = yf.Ticker(ind_name)
    info = nifty.info or {}
    return (
        info.get("regularMarketPrice", "N/A"),
        info.get("regularMarketPreviousClose", "N/A")
    )


def Company_info(company_name):
    import yfinance as yf
    import pandas as pd

    key = company_name.lower().strip()
    if key not in symbol_map:
        return {"Error": "Invalid Company Name"}
    
    symbol = symbol_map[key]
    ticker = yf.Ticker(symbol)
    info = ticker.info or {}

    try:
        annual = ticker.income_stmt.loc[["Total Revenue", "Net Income"]].iloc[:, :4].T
        quarterly = ticker.quarterly_income_stmt.loc[["Total Revenue", "Net Income"]].iloc[:, :4].T
    except Exception:
        annual, quarterly = pd.DataFrame(), pd.DataFrame()

    def format_financial_data(df):
        result = []
        for date, row in df.iterrows():
            try:
                result.append({
                    "period": str(date.year if hasattr(date, 'year') else date),
                    "revenue": int(row.get("Total Revenue", 0)),
                    "profit": int(row.get("Net Income", 0)),
                })
            except Exception:
                continue
        return result

    annual_data = format_financial_data(annual)
    quarterly_data = format_financial_data(quarterly)

    # Major holders fallback
    try:
        major_holders = ticker.get_major_holders()
        share_holdings = {
            key: float(row["Value"])
            for key, row in major_holders.iterrows()
            if "Value" in row
        } if major_holders is not None else {}
    except Exception:
        share_holdings = {}

    insiders = float(share_holdings.get("insidersPercentHeld", 0))
    institutions = float(share_holdings.get("institutionsPercentHeld", 0))
    others_share = max(0, 1 - insiders - institutions)

    return {
        "Company_Name": info.get("longName", symbol),
        "Sector": info.get("sector", "N/A"),
        "Industry": info.get("industry", "N/A"),
        "Website": info.get("website", "N/A"),
        "Description": info.get("longBusinessSummary", "N/A"),
        "market_cap": info.get("marketCap", "N/A"),
        "enterprise_value": info.get("enterpriseValue", "N/A"),
        "peg_ratio": info.get("pegRatio", "N/A"),
        "price_to_book": info.get("priceToBook", "N/A"),
        "shares_outstanding": info.get("sharesOutstanding", "N/A"),
        "beta": info.get("beta", "N/A"),
        "profit_margin": info.get("profitMargins", "N/A"),
        "operating_margin": info.get("operatingMargins", "N/A"),
        "return_on_assets": info.get("returnOnAssets", "N/A"),
        "return_on_equity": info.get("returnOnEquity", "N/A"),
        "debt_to_equity": info.get("debtToEquity", "N/A"),
        "current_ratio": info.get("currentRatio", "N/A"),
        "quick_ratio": info.get("quickRatio", "N/A"),
        "annual_data": annual_data,
        "quarterly_data": quarterly_data,
        "insiders": insiders,
        "institutions": institutions,
        "others": others_share
    }


def Company_Performance(company_name):
    import yfinance as yf

    key = company_name.lower().strip()
    if key not in symbol_map:
        return {"Error": "Invalid Company Name"}

    symbol = symbol_map[key]
    ticker = yf.Ticker(symbol)
    hist = ticker.history(period="1d")

    if hist.empty:
        return {"Error": f"No data available for {company_name}"}

    today_data = hist.iloc[0]
    info = ticker.info or {}
    fast_info = ticker.fast_info or {}

    return {
        "current_price": fast_info.get("last_price", "N/A"),
        "previous_close": fast_info.get("previous_close", "N/A"),
        "diff": (fast_info.get("last_price", 0) - fast_info.get("previous_close", 0)),
        "open": today_data.get("Open", "N/A"),
        "close": today_data.get("Close", "N/A"),
        "high_today": today_data.get("High", "N/A"),
        "low_today": today_data.get("Low", "N/A"),
        "volume": today_data.get("Volume", "N/A"),
        "trailing_pe": info.get("trailingPE", "N/A"),
        "fifty_two_week_high": info.get("fiftyTwoWeekHigh", "N/A"),
        "fifty_two_week_low": info.get("fiftyTwoWeekLow", "N/A"),
    }


def Financial_Statements(cmp_name):
    import yfinance as yf

    ticker = yf.Ticker(cmp_name)

    def df_to_dict(df):
        return df.to_dict() if df is not None else {}

    return {
        "income_statement": df_to_dict(ticker.financials),
        "balance_sheet": df_to_dict(ticker.balance_sheet),
        "cashflow_statement": df_to_dict(ticker.cashflow),
        "quarterly_income": df_to_dict(ticker.quarterly_financials),
        "quarterly_balance": df_to_dict(ticker.quarterly_balance_sheet),
        "quarterly_cashflow": df_to_dict(ticker.quarterly_cashflow),
    }
