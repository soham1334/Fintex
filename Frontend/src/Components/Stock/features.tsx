// const features = [
//   {
//     title: 'Historical Market Data',
//     details: [
//       'Stock prices (Open, High, Low, Close, Volume, Adjusted Close)',
//       'Date range and intervals: 1m, 2m, 5m, 15m, 1h, 1d, 1wk, 1mo',
//       "Example: ticker.history(period='1y', interval='1d')",
//     ],
//   },
//   {
//     title: 'Real-Time Quotes',
//     details: [
//       'Current price, bid/ask, volume',
//       "Example: ticker.info['currentPrice']",
//     ],
//   },
//   {
//     title: 'Company Fundamentals',
//     details: [
//       'Market cap, P/E ratio, PEG ratio, beta',
//       'EPS, earnings date, dividend yield',
//       'Example: ticker.info',
//     ],
//   },
//   {
//     title: 'Financial Statements',
//     details: [
//       'Income statement: revenue, net income, cost of revenue',
//       'Balance sheet: assets, liabilities, equity',
//       'Cash flow: operating, investing, financing activities',
//       'Example: ticker.financials, ticker.balance_sheet, ticker.cashflow',
//     ],
//   },
//   {
//     title: 'Earnings & Analyst Data',
//     details: [
//       'Quarterly and yearly earnings',
//       'EPS forecast, revenue estimate',
//       'Example: ticker.earnings, ticker.earnings_forecasts',
//     ],
//   },
//   {
//     title: 'Dividends & Splits',
//     details: [
//       'Historical dividends and stock splits',
//       'Example: ticker.dividends, ticker.splits',
//     ],
//   },
//   {
//     title: 'Institutional Holdings',
//     details: [
//       'Top holders, mutual fund holders, insider transactions',
//       'Example: ticker.institutional_holders, ticker.major_holders',
//     ],
//   },
//   {
//     title: 'Corporate Actions',
//     details: [
//       'Upcoming and past events like earnings dates, dividends',
//       'Example: ticker.calendar',
//     ],
//   },
//   // {
//   //   title: 'Usability Features',
//   //   details: [
//   //     'Multiple Tickers at Once: yf.download(["AAPL", "MSFT"], period="1mo")',
//   //     'Ticker Object: ticker = yf.Ticker("AAPL")',
//   //     'DataFrames for Analysis: pandas.DataFrame output',
//   //     'International Support: global exchange tickers',
//   //     'Caching and Performance Optimizations',
//   //   ],
//   // },
// ];


/* Feature Cards
  <div className="flex justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full px-6 sm:w-[90%] lg:w-[100%]">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="bg-gray-50 border border-gray-700/50 text-purple-500 rounded-3xl shadow-xl transition-transform duration-200 hover:scale-[1.02]"
        >
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold tracking-wide text-green-500">
              {feature.title}
            </h2>
            <ul className="list-disc list-inside text-sm text-purple-500 space-y-1">
              {feature.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  </div> */