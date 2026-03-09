export function calculatePortfolioSummary(portfolio: any[]) {
  const totalInvestment = portfolio.reduce(
    (sum, stock) => sum + stock.investment,
    0,
  );

  const totalPresentValue = portfolio.reduce(
    (sum, stock) => sum + stock.presentValue,
    0,
  );

  const totalGainLoss = totalPresentValue - totalInvestment;

  return {
    totalInvestment,
    totalPresentValue,
    totalGainLoss,
    totalStocks: portfolio.length,
  };
}
