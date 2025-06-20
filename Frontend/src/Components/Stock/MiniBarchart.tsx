// components/Stock/MiniBarChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  data: { period: string; value: number }[];
  title: string;
  color: string;
};

// Custom tooltip content for cleaner UI
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-lg border border-gray-200 text-gray-800 text-sm">
        <p className="font-semibold">{label}</p>
        <p>{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }

  return null;
};

function MiniBarChart({ data, title, color }: Props) {
  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold mb-3 text-gray-900">{title}</h3>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 5, left: 10 }} // added left margin
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="period"
            tick={{ fill: "#6b7280", fontSize: 12, fontWeight: '500' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            width={60} // increase width to 60 for enough space
            tickFormatter={(v) =>
              v >= 1e9
                ? `${(v / 1e9).toFixed(1)}B`
                : v >= 1e6
                ? `${(v / 1e6).toFixed(1)}M`
                : v >= 1e3
                ? `${(v / 1e3).toFixed(1)}K`
                : v.toString()
            }
            tick={{ fill: "#6b7280", fontSize: 12, fontWeight: "500" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            fill={color}
            radius={[4, 4, 0, 0]}
            animationDuration={700}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MiniBarChart;
