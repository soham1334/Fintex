// components/Stock/ReportHoldings.tsx
import HoldingsPieChart from './Piechart';

type holdings = {
  insiders: number;
  institutions: number;
  others: number;
};

function ReportHoldings({ insiders, institutions, others }: holdings) {
  const total = insiders + institutions + others;
  //console.log("Before holdingsdata:",insiders , institutions ,others)
  const holdingsData = [
    { period: 'Insiders', value: insiders / total },
    { period: 'Institutions', value: institutions / total },
    { period: 'Others', value: others / total },
  ];

 // console.log("holdingsData:",holdingsData)

  return (
    <div className="flex px-12 mb-8">
      <div className="flex gap-20 w-full">
        <div className="bg-white border rounded-xl p-4 text-gray-700 text-sm leading-relaxed h-[350px] w-[530px] overflow-auto">
          FOR FINANCIAL REPORT
        </div>
        <div className="bg-white border rounded-xl p-3 text-gray-700 text-sm h-[350px] w-[535px]">
          <p className="font-semibold">HOLDINGS</p>
          <HoldingsPieChart data={holdingsData} />
        </div>
      </div>
    </div>
  );
}

export default ReportHoldings;
