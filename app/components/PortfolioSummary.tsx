import { memo } from "react";

interface Props {
  summary: {
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
    totalStocks: number;
  };
}

function PortfolioSummary({ summary }: Props) {
  const isGain = summary.totalGainLoss >= 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div className="card p-4 sm:p-5 min-w-0 transition-shadow hover:shadow-md border-l-4 border-primary bg-primary-light/30">
        <p className="label text-primary font-medium uppercase tracking-wide">Total Investment</p>
        <p className="text-xl sm:text-2xl font-semibold text-card-value mt-1 tabular-nums">
          ₹{summary.totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="card p-4 sm:p-5 min-w-0 transition-shadow hover:shadow-md border-l-4 border-chart-2 bg-cyan-50/70">
        <p className="label text-chart-2 font-medium uppercase tracking-wide">Present Value</p>
        <p className="text-xl sm:text-2xl font-semibold text-card-value mt-1 tabular-nums">
          ₹{summary.totalPresentValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div
        className={`card p-4 sm:p-5 min-w-0 transition-shadow hover:shadow-md border-l-4 ${
          isGain ? "border-gain-positive bg-green-50" : "border-gain-negative bg-red-50"
        }`}
      >
        <p className="label text-card-label uppercase tracking-wide">Gain / Loss</p>
        <p
          className={`text-xl sm:text-2xl font-semibold mt-1 tabular-nums ${
            isGain ? "text-gain-positive" : "text-gain-negative"
          }`}
        >
          {isGain ? "+" : ""}₹{summary.totalGainLoss.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="card p-4 sm:p-5 min-w-0 transition-shadow hover:shadow-md border-l-4 border-chart-3 bg-amber-50/80">
        <p className="label text-chart-3 font-medium uppercase tracking-wide">Total Stocks</p>
        <p className="text-xl sm:text-2xl font-semibold text-card-value mt-1 tabular-nums">
          {summary.totalStocks}
        </p>
      </div>
    </div>
  );
}

export default memo(PortfolioSummary);
