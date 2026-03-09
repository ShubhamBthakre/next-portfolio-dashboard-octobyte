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

  return {
    portfolio: data?.holdings ?? undefined,
    summary: data?.summary,
    bySector: data?.bySector,
    lastUpdated: data?.lastUpdated,
    loading: isLoading,
    error,
    mutate,
  };
}
