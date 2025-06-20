// components/Stock/HoldingsPieChart.tsx
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  data: { period: string; value: number }[]; // value is a fraction (0–1)
};

const COLORS = ['#6366f1', '#06b6d4', '#10b981']; // Indigo, Cyan, Green

const renderCustomLabel = ({
  name,
  value,
  cx,
  cy,
  midAngle,
  outerRadius,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#4B5563"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-sm font-bold"
    >
      {`${name}: ${(value * 100).toFixed(1)}%`}
    </text>
  );
};

function HoldingsPieChart({ data }: Props) {
  const isEmpty = data.every((d) => d.value === 0);

  if (isEmpty) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="period"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={renderCustomLabel}
          isAnimationActive={true}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip
          formatter={(value: number,name:string, props: any) => {
            if (!props || !props.payload || typeof props.payload.period === 'undefined') {
              return [`${(value * 100).toFixed(2)}%`, name];
            }
            return [`${(value * 100).toFixed(2)}%`, props.payload.period];
          }}
          contentStyle={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#374151',
          }}
        />

        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: '14px', color: '#6b7280' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default HoldingsPieChart;
