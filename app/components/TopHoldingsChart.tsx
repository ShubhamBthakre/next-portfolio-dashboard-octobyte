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

interface Props {
  data: PortfolioStock[];
  topN?: number;
}

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

function TopHoldingsChart({ data, topN = 10 }: Props) {
  const chartData = useMemo(() => {
    return [...data]
      .sort((a, b) => b.presentValue - a.presentValue)
      .slice(0, topN)
      .map((s) => ({
        name: s.name.length > 18 ? s.name.slice(0, 16) + "…" : s.name,
        fullName: s.name,
        value: s.presentValue,
        investment: s.investment,
        gainLoss: s.gainLoss,
      }));
  }, [data, topN]);

  const formatTooltip = (value: number) =>
    `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  if (chartData.length === 0) return null;

  return (
    <div className="w-full min-w-0">
      <h2 className="heading-2 text-primary mb-4">Top Holdings</h2>
      <p className="label text-card-label mb-6">By present value (top {topN})</p>
      <div className="w-full h-[280px] sm:h-[320px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-subtle)" />
            <XAxis
              type="number"
              tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
              stroke="var(--card-label)"
              fontSize={12}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              stroke="var(--card-label)"
              fontSize={11}
              tick={{ fill: "var(--card-value)" }}
            />
            <Tooltip
              formatter={(value) => [formatTooltip(Number(value ?? 0)), "Present value"]}
              contentStyle={{
                background: "var(--background)",
                border: "1px solid var(--surface-subtle)",
                borderRadius: "8px",
              }}
              labelFormatter={(_, payload) =>
                (payload?.[0]?.payload as { fullName?: string } | undefined)?.fullName ?? ""
              }
            />
            <Bar dataKey="value" name="Present value" radius={[0, 4, 4, 0]} maxBarSize={28}>
              {chartData.map((_, index) => (
                <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default memo(TopHoldingsChart);
