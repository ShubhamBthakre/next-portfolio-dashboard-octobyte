import { PortfolioStock } from "../types/portfolio";

export function groupBySector(data: PortfolioStock[]): Record<string, PortfolioStock[]> {
  return data.reduce<Record<string, PortfolioStock[]>>((acc, stock) => {
    if (!acc[stock.sector]) {
      acc[stock.sector] = [];
    }

    acc[stock.sector].push(stock);

    return acc;
  }, {});
}
