"use client";

import { memo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Props {
  data: any[];
}

function PortfolioChart({ data }: Props) {
  const sectorMap: Record<string, number> = {};

  data.forEach((stock) => {
    if (!sectorMap[stock.sector]) {
      sectorMap[stock.sector] = 0;
    }
    sectorMap[stock.sector] += stock.investment;
  });

  const chartData = Object.entries(sectorMap).map(([sector, value]) => ({
    name: sector,
    value,
  }));

  const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
  ];

  const formatTooltip = (value: number) =>
    `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

  return (
    <div className="w-full min-w-0">
      <h2 className="heading-2 text-primary mb-4">Portfolio Allocation</h2>
      <p className="label text-card-label mb-6">Investment by sector</p>
      <div className="w-full h-[280px] sm:h-[320px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius="72%"
              strokeWidth={2}
              stroke="var(--background)"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatTooltip(Number(value ?? 0))} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default memo(PortfolioChart);
