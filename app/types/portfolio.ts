export interface Stock {
  name: string;
  symbol: string;
  exchange: "NSE" | "BSE";
  sector: string;
  purchasePrice: number;
  quantity: number;
}

export interface PortfolioStock extends Stock {
  cmp: number;
  investment: number;
  presentValue: number;
  gainLoss: number;
  portfolioPercent?: number;
  peRatio?: number;
  latestEarnings?: string;
  /** Today's P&L (regular market change × quantity). Optional for backward compatibility. */
  dayChange?: number;
  /** Today's P&L % (regular market change percent). Optional for backward compatibility. */
  dayChangePercent?: number;
}

export interface PortfolioSummaryResponse {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  totalStocks: number;
}

export interface BySectorItem {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  gainLoss: number;
  count: number;
}

export interface PortfolioApiResponse {
  holdings: PortfolioStock[];
  summary?: PortfolioSummaryResponse;
  bySector?: BySectorItem[];
  lastUpdated?: string;
}
