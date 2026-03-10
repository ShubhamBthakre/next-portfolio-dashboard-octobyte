"use client";

import { usePortfolio } from "./hooks/usePortfolio";
import PortfolioSummary from "./components/PortfolioSummary";
import { calculatePortfolioSummary } from "./utils/portfolioSummary";
import { calculatePortfolioPercentage } from "./utils/calculations";
import PortfolioChart from "./components/PortfolioChart";
import SectorPerformanceChart from "./components/SectorPerformanceChart";
import TopHoldingsChart from "./components/TopHoldingsChart";
import TopGainersLosers from "./components/TopGainersLosers";
import PortfolioTable from "./components/PortfolioTable";

export default function Home() {
  const { portfolio, loading, error, isMarketUnavailable, mutate } = usePortfolio();

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="paragraph text-card-label">Loading your portfolio...</p>
          <p className="label text-card-label mt-1">Please wait</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="paragraph font-semibold text-foreground">
            {isMarketUnavailable
              ? "Live market data temporarily unavailable"
              : "Unable to load portfolio"}
          </p>
          <p className="label text-card-label mt-1">
            {isMarketUnavailable
              ? "The data provider is rate-limiting. Please try again in a moment."
              : "Check your connection and try again."}
          </p>
          <button
            type="button"
            onClick={() => mutate()}
            className="mt-4 paragraph px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-muted transition-colors font-semibold"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  const portfolioWithPercent = calculatePortfolioPercentage(portfolio || []);
  const summary = calculatePortfolioSummary(portfolioWithPercent);

  return (
    <main className="min-h-screen bg-surface-muted">
      <header className="bg-background border-b-4 border-primary shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-6">
          <h1 className="heading-1 text-primary tracking-tight">
            Portfolio Dashboard
          </h1>
          <p className="label text-card-label mt-1">
            Track performance, allocation, and holdings at a glance
          </p>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="sr-only">
            Portfolio overview
          </h2>
          <PortfolioSummary summary={summary} />
        </section>

        <section aria-label="Charts" className="space-y-6 sm:space-y-8">
          <div className="card-elevated p-4 sm:p-6 border-t-4 border-primary">
            <TopGainersLosers data={portfolioWithPercent} topN={5} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="card-elevated p-4 sm:p-6 border-t-4 border-primary">
              <PortfolioChart data={portfolioWithPercent} />
            </div>
            <div className="card-elevated p-4 sm:p-6 border-t-4 border-primary">
              <SectorPerformanceChart data={portfolioWithPercent} />
            </div>
          </div>
          <div className="card-elevated p-4 sm:p-6 border-t-4 border-primary">
            <TopHoldingsChart data={portfolioWithPercent} topN={10} />
          </div>
        </section>

        <section
          aria-label="All holdings"
          className="card-elevated overflow-hidden border-t-4 border-primary"
        >
          <div className="p-4 sm:p-5 border-b border-surface-subtle bg-primary-light/40">
            <h2 className="heading-2 text-primary">Holdings</h2>
            <p className="label text-card-label mt-1">
              All holdings by sector and value
            </p>
          </div>
          <div className="p-2 sm:p-4">
            <PortfolioTable data={portfolioWithPercent} />
          </div>
        </section>
      </div>
    </main>
  );
}
