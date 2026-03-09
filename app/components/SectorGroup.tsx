import { memo } from "react";
import PortfolioTable from "./PortfolioTable";
import { calculateSectorSummary } from "../utils/sectorSummary";
import { PortfolioStock } from "../types/portfolio";

interface Props {
  sector: string;
  stocks: PortfolioStock[];
}

function SectorGroup({ sector, stocks }: Props) {
  const summary = calculateSectorSummary(stocks);

  const sectorGain = summary.gainLoss >= 0;

  return (
    <div className="card-elevated overflow-hidden border-t-4 border-primary">
      <div className="p-4 sm:p-5 border-b border-surface-subtle bg-primary-light/40">
        <h2 className="heading-2 text-primary">{sector} Sector</h2>
        <div className="flex flex-wrap gap-4 sm:gap-6 mt-3">
          <span className="label text-card-label">
            Investment: <strong className="text-card-value font-semibold">₹{summary.totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong>
          </span>
          <span className="label text-card-label">
            Present Value: <strong className="text-card-value font-semibold">₹{summary.totalPresentValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong>
          </span>
          <span className={`label font-semibold ${sectorGain ? "text-gain-positive" : "text-gain-negative"}`}>
            Gain/Loss: {sectorGain ? "+" : ""}₹{summary.gainLoss.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      <div className="p-2 sm:p-4">
        <PortfolioTable data={stocks} />
      </div>
    </div>
  );
}

export default memo(SectorGroup);
