import React from "react";




type Props = {
  visible: boolean;
  onClose: () => void;
 summaryText: {
    summary: Record<string, string>;
  };
};

const Summarycard = ({
  visible,
  onClose,
  summaryText,
}:Props) => {
  return (
    <div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[70vw] max-w-5xl h-[45vh] bg-gradient-to-tr from-blue-700 to-indigo-900  shadow-[0_10px_25px_rgba(0,0,0,0.2)] ring-1 ring-black/5 border border-gray-300 rounded-2xl transition-transform duration-300 ease-in-out z-50 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white font-bold">Summary</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 font-bold text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto text-gray-600 text-base flex-1">
         {summaryText?.summary && Object.entries(summaryText.summary).map(([section,content])=>(
               <div key={section} className="mb-4">
                 <p className="text-white">{content}</p>
               </div>
         ))}
        </div>
      </div>
    </div>
  );
};

export default Summarycard;
