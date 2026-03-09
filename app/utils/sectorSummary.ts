export function calculateSectorSummary(sectorStocks: any[]) {
  const totalInvestment = sectorStocks.reduce(
    (sum, s) => sum + s.investment,
    0,
  );

  const totalPresentValue = sectorStocks.reduce(
    (sum, s) => sum + s.presentValue,
    0,
  );

  const gainLoss = totalPresentValue - totalInvestment;

  return {
    totalInvestment,
    totalPresentValue,
    gainLoss,
  };
}
