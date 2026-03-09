"use client";

import { memo, useMemo } from "react";
import { PortfolioStock } from "../types/portfolio";

interface Props {
  data: PortfolioStock[];
  topN?: number;
}

function TopGainersLosers({ data, topN = 5 }: Props) {
  const { gainers, losers } = useMemo(() => {
    const hasDayChange = data.some(
      (s) => s.dayChange != null || s.dayChangePercent != null
    );
    const key = hasDayChange ? "dayChange" : "gainLoss";
    const getVal = (s: PortfolioStock) =>
      key === "dayChange" ? (s.dayChange ?? 0) : s.gainLoss;
    const sortedDesc = [...data].sort((a, b) => getVal(b) - getVal(a));
    const gainersList = sortedDesc.filter((s) => getVal(s) > 0).slice(0, topN);
    const sortedAsc = [...data].sort((a, b) => getVal(a) - getVal(b));
    const losersList = sortedAsc.filter((s) => getVal(s) < 0).slice(0, topN);
    return { gainers: gainersList, losers: losersList };
  }, [data, topN]);

  const renderRow = (
    s: PortfolioStock,
    isGainer: boolean
  ) => {
    const value = s.dayChange != null ? s.dayChange : s.gainLoss;
    const pct = s.dayChangePercent != null
      ? s.dayChangePercent
      : s.investment
        ? (s.gainLoss / s.investment) * 100
        : 0;
    return (
      <tr
        key={s.symbol}
        className="border-t border-surface-subtle hover:bg-surface-muted/50 transition-colors"
      >
        <td className="paragraph p-2 sm:p-3 text-foreground">{s.name}</td>
        <td className="paragraph p-2 sm:p-3 tabular-nums text-right">
          <span
            className={
              isGainer ? "text-gain-positive font-semibold" : "text-gain-negative font-semibold"
            }
          >
            ₹{value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </td>
        <td className="paragraph p-2 sm:p-3 tabular-nums text-right">
          <span
            className={
              isGainer ? "text-gain-positive" : "text-gain-negative"
            }
          >
            {pct >= 0 ? "+" : ""}{pct.toFixed(2)}%
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className="w-full min-w-0">
      <h2 className="heading-2 text-primary mb-4">Today&apos;s Top Gainers &amp; Losers</h2>
      <p className="label text-card-label mb-6">Top {topN} by day&apos;s P&amp;L (from your holdings)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="card rounded-lg border border-surface-subtle overflow-hidden">
          <div className="p-3 sm:p-4 bg-gain-positive/10 border-b border-surface-subtle">
            <h3 className="heading-4 text-gain-positive">Today&apos;s Top 5 Gainers</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[200px]">
              <thead className="bg-surface-subtle">
                <tr>
                  <th className="label p-2 sm:p-3 text-left text-card-label font-semibold">
                    Stock
                  </th>
                  <th className="label p-2 sm:p-3 text-right text-card-label font-semibold">
                    P&amp;L
                  </th>
                  <th className="label p-2 sm:p-3 text-right text-card-label font-semibold">
                    P&amp;L %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background">
                {gainers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="paragraph p-3 text-card-label text-center">
                      No gainers in portfolio
                    </td>
                  </tr>
                ) : (
                  gainers.map((s) => renderRow(s, true))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card rounded-lg border border-surface-subtle overflow-hidden">
          <div className="p-3 sm:p-4 bg-gain-negative/10 border-b border-surface-subtle">
            <h3 className="heading-4 text-gain-negative">Today&apos;s Top 5 Losers</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[200px]">
              <thead className="bg-surface-subtle">
                <tr>
                  <th className="label p-2 sm:p-3 text-left text-card-label font-semibold">
                    Stock
                  </th>
                  <th className="label p-2 sm:p-3 text-right text-card-label font-semibold">
                    P&amp;L
                  </th>
                  <th className="label p-2 sm:p-3 text-right text-card-label font-semibold">
                    P&amp;L %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background">
                {losers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="paragraph p-3 text-card-label text-center">
                      No losers in portfolio
                    </td>
                  </tr>
                ) : (
                  losers.map((s) => renderRow(s, false))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TopGainersLosers);
