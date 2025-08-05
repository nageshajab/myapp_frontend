import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface PieChartProps {
  totalsavings: number;
  totalFd: number;
  totalPf: number;
  mfCurrentVal: number;
  stocksCurrentVal: number;
}
const PieChartExample: React.FC<PieChartProps> = ({
  totalsavings,
  totalFd,
  totalPf,
  mfCurrentVal,
  stocksCurrentVal,
}) => {
  const data = [
    { name: "PF", value: totalPf },
    { name: "MF", value: mfCurrentVal },
    { name: "Stocks", value: stocksCurrentVal },
    { name: "FD", value: totalFd },
    { name: "Bank Savings", value: totalsavings },
  ];
  return (
    <div>
      <div>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name, percent }) =>
              percent !== undefined
                ? `${name}: ${(percent * 100).toFixed(0)}%`
                : name
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <br></br>
      <b>Bank Savings Acc </b> {totalsavings.toLocaleString("en-IN")}&nbsp;
      <b> Fixed deposit </b>
      {totalFd.toLocaleString("en-IN")}
      <b> Providend Fund </b>
      {totalPf.toLocaleString("en-IN")}
      <b> Mutual Fund </b>
      {mfCurrentVal.toLocaleString("en-IN")}
      <b> Stocks </b>
      {stocksCurrentVal.toLocaleString("en-IN")}
    </div>
  );
};

export default PieChartExample;
