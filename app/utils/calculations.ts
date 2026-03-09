import { Stock } from "../types/portfolio";

export function calculatePortfolio(stock: Stock, cmp: number) {
  const investment = stock.purchasePrice * stock.quantity;

  const presentValue = cmp * stock.quantity;

  const gainLoss = presentValue - investment;

  return {
    ...stock,
    cmp,
    investment,
    presentValue,
    gainLoss,
  };
}

export function calculatePortfolioPercentage(portfolio: any[]) {
  const totalInvestment = portfolio.reduce(
    (sum, stock) => sum + stock.investment,
    0,
  );

  return portfolio.map((stock) => ({
    ...stock,
    portfolioPercent: (stock.investment / totalInvestment) * 100,
  }));
}
