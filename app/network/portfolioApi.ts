import { PortfolioStock, PortfolioApiResponse } from "../types/portfolio";
import { get } from "./http";
import { PORTFOLIO_API_URL } from "./endpoint";

/** API success body: { code, error: false, message, exception, content } */
type ApiSuccessBody = {
  code: number;
  error: false;
  message: string;
  exception: string;
  content: PortfolioApiResponse;
};

export async function fetchPortfolio(): Promise<PortfolioApiResponse> {
  const data = await get<
    PortfolioStock[] | PortfolioApiResponse | ApiSuccessBody
  >(PORTFOLIO_API_URL);

  if (Array.isArray(data)) {
    return { holdings: data };
  }
  // New format: { content: { holdings, summary, bySector, lastUpdated } }
  const payload: PortfolioApiResponse =
    "content" in data && data.content ? data.content : (data as PortfolioApiResponse);
  return {
    holdings: payload.holdings,
    summary: payload.summary,
    bySector: payload.bySector,
    lastUpdated: payload.lastUpdated,
  };
}
