"use client";

import { memo, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { PortfolioStock } from "../types/portfolio";
import { calculateSectorSummary } from "../utils/sectorSummary";
import { groupBySector } from "../utils/groupBySector";

interface Props {
  data: PortfolioStock[];
}

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

function SectorPerformanceChart({ data }: Props) {
  const chartData = useMemo(() => {
    const grouped = groupBySector(data);
    return Object.entries(grouped).map(([sector, stocks]) => {
      const summary = calculateSectorSummary(stocks);
      return {
        name: sector,
        gainLoss: summary.gainLoss,
        investment: summary.totalInvestment,
        presentValue: summary.totalPresentValue,
      };
    });
  }, [data]);

  const formatTooltip = (value: number) =>
    `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <div className="w-full min-w-0">
      <h2 className="heading-2 text-primary mb-4">Sector Performance</h2>
      <p className="label text-card-label mb-6">Gain / Loss by sector</p>
      <div className="w-full h-[260px] sm:h-[300px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-subtle)" />
            <XAxis
              type="number"
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              stroke="var(--card-label)"
              fontSize={12}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              stroke="var(--card-label)"
              fontSize={12}
              tick={{ fill: "var(--card-value)" }}
            />
            <Tooltip
              formatter={(value) => [formatTooltip(Number(value ?? 0)), "Gain/Loss"]}
              contentStyle={{
                background: "var(--background)",
                border: "1px solid var(--surface-subtle)",
                borderRadius: "8px",
              }}
              labelFormatter={(label) => `${label} Sector`}
            />
            <Bar dataKey="gainLoss" name="Gain/Loss" radius={[0, 4, 4, 0]} maxBarSize={32}>
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={entry.gainLoss >= 0 ? "var(--gain-positive)" : "var(--gain-negative)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default memo(SectorPerformanceChart);
