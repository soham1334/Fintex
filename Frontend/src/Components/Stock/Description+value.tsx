import { useEffect, useState, useContext } from "react";
import { CompanyNameContext, SearchClick } from './stock';
import axios from 'axios';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type discription = {
  Sector: string;
  Industry: string;
  Website: string;
  Description: string;
};

type Perfor = {
  current_price: number;
  previous_close: number;
  diff: number;
  open: number;
  close: number;
  high_today: number;
  low_today: number;
  volume: number;
  trailing_pe: number;
  fifty_two_week_high: number;
  fifty_two_week_low: number;
};

function DescriptionValue({ Sector, Industry, Website, Description }: discription) {
  const [expanded, setExpanded] = useState(false);
  const [Performance, setPerformance] = useState<Perfor | null>(null);
  const { company } = useContext(CompanyNameContext)!;
  const { searchclick } = useContext(SearchClick)!;

  useEffect(() => {
    const cacheKey = `performanceData_${company}`;
    const lastCallKey = `lastPerformanceCall_${company}`;
    const sessionKey = `hasFetchedPerformance_${company}`;

    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      setPerformance(JSON.parse(cachedData));
    }

    const lastCalled = parseInt(localStorage.getItem(lastCallKey) || "0");
    const now = Date.now();
    const alreadyFetchedThisSession = sessionStorage.getItem(sessionKey);

    const fetchPerformance = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_PERFORMANCE_API}`, { company });
        setPerformance(response.data);
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
        localStorage.setItem(lastCallKey, now.toString());
        sessionStorage.setItem(sessionKey, 'true');
      } catch (error) {
        console.log("PERFORMANCE REQUEST FAILED", error);
      }
    };

    if (!alreadyFetchedThisSession && (now - lastCalled >= 5000 || !cachedData)) {
      fetchPerformance();
    } else  {
      toast.error("Slow down! Please wait before refreshing again.");
    }

  }, [company, searchclick]);

  return (
    <>
      <ToastContainer />
      <div className="flex px-12 mb-8">
        <div className="flex gap-12 w-full">
          <div className="bg-white border rounded-2xl p-6 text-gray-800 text-base leading-relaxed shadow-md w-full max-w-3xl space-y-4">
            <div>
              <span className="font-semibold text-black"> Sector:</span>
              <span className="ml-2">{Sector || 'N/A'}</span>
            </div>
            <div>
              <span className="font-semibold text-black"> Industry:</span>
              <span className="ml-2">{Industry || 'N/A'}</span>
            </div>

            <div>
              <p className={`text-black font-medium transition-all duration-300 ease-in-out ${expanded ? '' : 'line-clamp-5'}`}>
                {Description || 'No description available.'}
              </p>
              {Description && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  {expanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>

            {Website && (
              <div>
                <span className="font-semibold text-black">🌐 Website:</span>
                <a
                  href={Website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:underline"
                >
                  {Website}
                </a>
              </div>
            )}
          </div>

          <div className="bg-white border rounded-2xl p-6 text-gray-800 shadow-xl w-[320px] h-[370px]">
            <div className="flex flex-col items-start gap-1 text-sm font-medium mb-4">
              <div className="text-black font-semibold text-3xl leading-tight">
                {Performance?.current_price?.toLocaleString('en-US', { minimumFractionDigits: 2 }) ?? "N/A"}
              </div>

              <div className="flex flex-row items-center space-x-2">
                <span className={`${(Performance?.diff ?? 0) > 0 ? "text-green-700" : "text-red-700"} font-semibold`}>
                  {(Performance?.diff ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>

                <span className={`${(Performance?.diff ?? 0) > 0 ? "text-green-700" : "text-red-700"} font-semibold`}>
                  (
                  {(
                    ((Performance?.diff ?? 0) / (Performance?.previous_close ?? 1)) * 100
                  ).toLocaleString('en-US', { minimumFractionDigits: 4 })}
                  %)
                </span>

                <span className={`${(Performance?.diff ?? 0) > 0 ? "text-green-600" : "text-red-600"} font-bold`}>
                  {(Performance?.diff ?? 0) > 0 ? "▲" : "▼"}
                </span>
                <span className="text-gray-800 font-semibold">today</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-500">Open</span>
                <span className="font-semibold">{Performance?.open?.toFixed(3) ?? "N/A"}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Close</span>
                <span className="font-semibold">{Performance?.close?.toFixed(3) ?? "N/A"}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Volume</span>
                <span className="font-semibold">{Performance?.volume?.toLocaleString() ?? "N/A"}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">P/E ratio (TTM)</span>
                <span className="font-semibold">{Performance?.trailing_pe?.toLocaleString() ?? "N/A"}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1">
                  High Today <ArrowUpRight size={14} className="text-green-500" />
                </span>
                <span className="font-semibold">{Performance?.high_today?.toFixed(3) ?? "N/A"}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1">
                  Low Today <ArrowDownRight size={14} className="text-red-500" />
                </span>
                <span className="font-semibold">{Performance?.low_today?.toFixed(3) ?? "N/A"}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1">
                  52W High <TrendingUp size={14} className="text-green-500" />
                </span>
                <span className="font-semibold">{Performance?.fifty_two_week_high?.toFixed(3) ?? "N/A"}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1">
                  52W Low <TrendingDown size={14} className="text-red-500" />
                </span>
                <span className="font-semibold">{Performance?.fifty_two_week_low?.toFixed(3) ?? "N/A"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default DescriptionValue;
