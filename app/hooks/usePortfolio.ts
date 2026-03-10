import useSWR from "swr";
import { fetchPortfolio } from "../network/portfolioApi";

export function usePortfolio() {
  const { data, error, isLoading, mutate } = useSWR(
    "portfolio",
    fetchPortfolio,
    {
      refreshInterval: 15000, // 15 seconds
    },
  );

  const errorData = error?.response?.data as
    | { code?: number; message?: string; content?: string }
    | undefined;
  const isMarketUnavailable =
    error?.response?.status === 503 ||
    errorData?.content === "MARKET_DATA_UNAVAILABLE";

  return {
    portfolio: data?.holdings ?? undefined,
    summary: data?.summary,
    bySector: data?.bySector,
    lastUpdated: data?.lastUpdated,
    loading: isLoading,
    error,
    isMarketUnavailable: !!isMarketUnavailable,
    mutate,
  };
}
