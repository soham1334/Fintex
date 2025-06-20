import { useState } from "react";
import MiniBarChart from "./MiniBarchart";

type income = {
  annual_data: { period: string; revenue: number; profit: number }[];
  quarterly_data: { period: string; revenue: number; profit: number }[];
};

function Growth({ annual_data, quarterly_data }: income) {
  // State toggles
  const [showRevenue, setShowRevenue] = useState(true); // true: revenue, false: profit
  const [showYearly, setShowYearly] = useState(true);   // true: yearly, false: quarterly

  // Prepare data
  const annualRevenue = annual_data.map((d) => ({ period: d.period, value: d.revenue }));
  const annualProfit = annual_data.map((d) => ({ period: d.period, value: d.profit }));
  const quarterlyRevenue = quarterly_data.map((d) => ({ period: d.period, value: d.revenue }));
  const quarterlyProfit = quarterly_data.map((d) => ({ period: d.period, value: d.profit }));

  // Select data & title based on toggles
  let dataToShow, title, color;
  if (showYearly && showRevenue) {
    dataToShow = annualRevenue;
    title = "Annual Revenue";
    color = "#4F46E5";
  } else if (showYearly && !showRevenue) {
    dataToShow = annualProfit;
    title = "Annual Profit";
    color = "#10B981";
  } else if (!showYearly && showRevenue) {
    dataToShow = quarterlyRevenue;
    title = "Quarterly Revenue";
    color = "#6366F1";
  } else {
    dataToShow = quarterlyProfit;
    title = "Quarterly Profit";
    color = "#059669";
  }

  // Handlers
  const toggleYearlyQuarterly = () => setShowYearly((prev) => !prev);
  const toggleRevenueProfit = () => setShowRevenue((prev) => !prev);

  return (
    <div className="flex px-12 mb-8 justify-center">
      <div className="flex gap-20 w-full max-w-6xl">
        {/* Left: Chart & toggles */}
        <div className="bg-white border rounded-xl p-6 text-gray-700 text-sm leading-relaxed h-[400px] w-[530px] flex flex-col">
          <div className="mb-6">
            <p>
             Explore the company’s financial performance through interactive charts presenting revenue and profit trends across annual and quarterly periods. (All amounts are in Indian Rupees)
           </p>


          </div>

          {/* Toggle buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={toggleRevenueProfit}
              className={`flex-1 px-5 py-2 font-semibold rounded-lg transition 
                ${showRevenue 
                  ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700" 
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
              aria-pressed={showRevenue}
            >
              {showRevenue ? "Revenue" : "Profit"}
            </button>

            <button
              onClick={toggleYearlyQuarterly}
              className={`flex-1 px-5 py-2 font-semibold rounded-lg transition
                ${showYearly 
                  ? "bg-green-600 text-white shadow-md hover:bg-green-700" 
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
              aria-pressed={showYearly}
            >
              {showYearly ? "Yearly" : "Quarterly"}
            </button>
          </div>

          {/* Chart */}
          <div className="flex-grow">
            <MiniBarChart title={title} data={dataToShow} color={color} />
          </div>
        </div>

        {/* Right side */}
        <div className="bg-white border rounded-xl p-6 text-gray-700 text-sm h-[400px] w-[535px]">
          <p>Additional Info</p>
        </div>
      </div>
    </div>
  );
}

export default Growth;
