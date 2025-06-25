import { useEffect, useState } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

type indx = {
  cur: number;
  prev: number;
  diff: number;
};

function MarketIndex() {
  const [Index, setIndex] = useState<indx[]>([]);

  useEffect(() => {
    const fetch_index = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_FINANCE_API}`);
        setIndex(response.data);
        localStorage.setItem("lastIndexCall", Date.now().toString());
        localStorage.setItem("cachedIndexData", JSON.stringify(response.data));
      } catch (error) {
        alert("REQUEST FAILED");
        console.log("REQUEST FAILED", error);
      }
    };

    const lastCalled = parseInt(localStorage.getItem("lastIndexCall") || "0");
    const cachedData = localStorage.getItem("cachedIndexData");
    const now = Date.now();

    if (cachedData) {
      setIndex(JSON.parse(cachedData));
    }

    if (now - lastCalled >= 5000) {
      fetch_index();
    } else {
     
    }
  }, []);

  return (
    <>
      
      {/* Mini Index Cards */}
      <div className="flex justify-center mt-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full sm:w-[90%] lg:w-[75%]">
          {/* SENSEX CARD */}
          <div
            key="sensex"
            className="bg-white backdrop-blur-md shadow-lg rounded-xl px-6 py-6 hover:scale-105 transition-transform h-24 flex flex-col justify-between"
          >
            <div className="flex flex-row justify-between items-start">
              <div className="text-black font-semibold text-3xl leading-tight">
                {Index[0]?.cur.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-indigo-700 font-semibold text-lg">SENSEX</div>
            </div>

            {Index.length > 0 && Index[0] && (
              <div className="flex flex-row items-center space-x-2 text-sm font-medium">
                <span className={`${Index[0].diff > 0 ? "text-green-700" : "text-red-700"}`}>
                  {Index[0].diff.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <span className={`${Index[0].diff > 0 ? "text-green-700" : "text-red-700"}`}>
                  (
                  {(Index[0].diff / Index[0].prev * 100).toLocaleString("en-US", {
                    minimumFractionDigits: 4,
                  })}
                  %)
                </span>
                <span className={`${Index[0].diff > 0 ? "text-green-600" : "text-red-600"}`}>
                  {Index[0].diff > 0 ? "▲" : "▼"}
                </span>
                <span className="text-gray-800 font-semibold">today</span>
              </div>
            )}
          </div>

          {/* NIFTY50 CARD */}
          <div
            key="nifty"
            className="bg-white backdrop-blur-md shadow-lg rounded-xl px-6 py-6 hover:scale-105 transition-transform h-24 flex flex-col justify-between"
          >
            <div className="flex flex-row justify-between items-start">
              <div className="text-black font-semibold text-3xl leading-tight">
                {Index[1]?.cur.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-indigo-700 font-semibold text-lg">NIFTY50</div>
            </div>

            {Index.length > 0 && Index[1] && (
              <div className="flex flex-row items-center space-x-2 text-sm font-medium">
                <span className={`${Index[1].diff > 0 ? "text-green-700" : "text-red-700"}`}>
                  {Index[1].diff.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <span className={`${Index[1].diff > 0 ? "text-green-700" : "text-red-700"}`}>
                  (
                  {(Index[1].diff / Index[1].prev * 100).toLocaleString("en-US", {
                    minimumFractionDigits: 4,
                  })}
                  %)
                </span>
                <span className={`${Index[1].diff > 0 ? "text-green-600" : "text-red-600"}`}>
                  {Index[1].diff > 0 ? "▲" : "▼"}
                </span>
                <span className="text-gray-800 font-semibold">today</span>
              </div>
            )}
          </div>

          {/* BANKNIFTY CARD */}
          <div
            key="banknifty"
            className="bg-white backdrop-blur-md shadow-lg rounded-xl px-6 py-6 hover:scale-105 transition-transform h-24 flex flex-col justify-between"
          >
            <div className="flex flex-row justify-between items-start">
              <div className="text-black font-semibold text-3xl leading-tight">
                {Index[2]?.cur.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-indigo-700 font-semibold text-lg">BANKNIFTY</div>
            </div>

            {Index.length > 0 && Index[2] && (
              <div className="flex flex-row items-center space-x-2 text-sm font-medium">
                <span className={`${Index[2].diff > 0 ? "text-green-700" : "text-red-700"}`}>
                  {Index[2].diff.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <span className={`${Index[2].diff > 0 ? "text-green-700" : "text-red-700"}`}>
                  (
                  {(Index[2].diff / Index[2].prev * 100).toLocaleString("en-US", {
                    minimumFractionDigits: 4,
                  })}
                  %)
                </span>
                <span className={`${Index[2].diff > 0 ? "text-green-600" : "text-red-600"}`}>
                  {Index[2].diff > 0 ? "▲" : "▼"}
                </span>
                <span className="text-gray-800 font-semibold">today</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketIndex;
