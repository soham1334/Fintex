import React from "react";

const StockPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">🚧 Coming Soon</h1>

      <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 rounded-2xl max-w-2xl text-center shadow-lg">
        <p className="text-lg md:text-xl leading-relaxed">
          We're building an intelligent stock analysis dashboard that will provide:
          <ul className="mt-4 list-disc list-inside text-left text-white/90">
            <li>📊 Real-time stock charts with technical indicators</li>
            <li>📈 Company fundamentals (P/E, P/B, EPS, etc.)</li>
            <li>🤖 GPT-based insights and market sentiment</li>
            <li>📅 Earnings calendar & analyst predictions</li>
          </ul>
          <p className="mt-4 text-white/80">Stay tuned — powerful insights are on the way!</p>
        </p>
      </div>
    </div>
  );
};

export default StockPage;
