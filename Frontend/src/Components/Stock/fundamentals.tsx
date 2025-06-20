type Funda = {
  market_cap: number;
  enterprise_value: number;
  price_to_book: number;
  shares_outstanding: number;
  beta: number;
  profit_margin: number;
  operating_margin: number;
  return_on_assets: number;
  return_on_equity: number;
  debt_to_equity: number;
  current_ratio: number;
  quick_ratio: number;
};

function Fundamentals({
  market_cap,
  enterprise_value,
  price_to_book,
  shares_outstanding,
  beta,
  profit_margin,
  operating_margin,
  return_on_assets,
  return_on_equity,
  debt_to_equity,
  current_ratio,
  quick_ratio,
}: Funda) {
  return (
    <div className="flex px-6 sm:px-12 mb-8 w-full max-w-[1240px]">
      <div className="flex flex-col sm:flex-row gap-6 bg-white border rounded-xl p-6 w-full shadow-md">
        {/* LEFT COLUMN */}
        <div className="w-full sm:w-1/2 space-y-4 text-sm text-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Valuation Snapshot</h2>
          <div className="flex justify-between">
            <span className="text-gray-500">Market Cap:</span>
            <span className="font-semibold">${market_cap.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Enterprise Value:</span>
            <span className="font-semibold">${enterprise_value.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Price to Book:</span>
            <span className="font-semibold">{price_to_book.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shares Outstanding:</span>
            <span className="font-semibold">{shares_outstanding.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Beta:</span>
            <span className="font-semibold">{beta.toFixed(2)}</span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full sm:w-1/2 space-y-4 text-sm text-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Profitability & Ratios</h2>
          <div className="flex justify-between">
            <span className="text-gray-500">Profit Margin:</span>
            <span className="font-semibold">{(profit_margin * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Operating Margin:</span>
            <span className="font-semibold">{(operating_margin * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Return on Assets (ROA):</span>
            <span className="font-semibold">{(return_on_assets * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Return on Equity (ROE):</span>
            <span className="font-semibold">{(return_on_equity * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Debt to Equity:</span>
            <span className="font-semibold">{debt_to_equity.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Current Ratio:</span>
            <span className="font-semibold">{current_ratio.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Quick Ratio:</span>
            <span className="font-semibold">{quick_ratio.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fundamentals;
