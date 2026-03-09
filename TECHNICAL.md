
## 1. No official Yahoo / Google Finance APIs

**Challenge:** The case study asks for CMP from Yahoo Finance and P/E + Latest Earnings from Google Finance. Neither provides an official public API; Yahoo has deprecated its old API, and Google Finance does not offer a supported API for this use case.

**Solution:** I use the **yahoo-finance2** (unofficial) Node.js library to fetch quote data. It provides:

- **CMP** – `regularMarketPrice`
- **P/E (TTM)** – `trailingPE`
- **Latest earnings (EPS)** – `epsTrailingTwelveMonths`

I did not integrate a separate Google Finance source because:

- Reliable Google Finance data usually requires scraping or brittle unofficial endpoints that change often.
- Yahoo’s quote already provides P/E and trailing EPS, which satisfy the requirement for “P/E Ratio” and “Latest Earnings” in a single, maintainable integration.
- The case study notes that “scraping or unofficial libraries” are acceptable; using one well-maintained unofficial library is a practical trade-off.

If evaluators require a distinct Google Finance source, the next step would be to add a small module that scrapes or calls an unofficial Google endpoint for P/E and earnings and merges that data in the backend, with fallback to Yahoo when Google fails.

---

## 2. Rate limiting and blocking

**Challenge:** Public or unofficial data sources can rate-limit or block repeated requests.

**Solution:**

- **Caching:** The backend uses **node-cache** with a 15-second TTL. Repeated requests for the same symbol within 15 seconds are served from memory, reducing calls to Yahoo.
- **Frontend:** SWR is used with `refreshInterval: 15000` (15 seconds), so the dashboard refreshes periodically without hammering the API. Caching and this interval together limit request volume.
- **Optional:** Adding express-rate-limit on the `/api/portfolio` route would protect the backend from abuse; we did not add it for the assignment but it is straightforward to add.

---

## 3. Error handling and partial failures

**Challenge:** If one symbol fails (network error, invalid symbol, or API change), the whole portfolio request could fail and the user would see no data.

**Solution:**

- **Backend:** `getStockData` in `stockService.js` is wrapped in try/catch. On failure it returns `null` instead of throwing. The controller filters out `null` results and returns a **partial portfolio** (only holdings for which market data was fetched). If no holdings could be fetched, the API returns **503** with a clear message so the frontend can show an error state.
- **Frontend:** The app shows “Failed to load data” when the API errors or returns non-2xx. Missing or null P/E / Latest Earnings in a row are displayed as “—” so one missing field does not break the table.

---

## 4. Data accuracy and disclaimers

**Challenge:** Unofficial or scraped data may be delayed or incorrect.

**Solution:**

- Data is used for dashboard display only; we do not expose it as “official” or guaranteed.
- For production, a short disclaimer on the dashboard (e.g. “Data from third-party sources; not guaranteed”) would be appropriate. We did not add UI text for the assignment but recommend it for real use.
- P/E and “Latest Earnings” (EPS) are clearly labeled in the table (e.g. “P/E (TTM)”, “Latest Earnings”) so users understand what the numbers represent.

---

## 5. Portfolio % and sector grouping

**Challenge:** Portfolio (%) must be the share of each holding in the **entire** portfolio, not per sector. Sector grouping must show sector-level totals.

**Solution:**

- **Portfolio %:** After fetching the portfolio, the frontend runs `calculatePortfolioPercentage(portfolio)` which computes `totalInvestment` across all holdings and sets `portfolioPercent = (investment / totalInvestment) * 100` for each stock. This enriched list is then passed to sector grouping and the table, so each row shows the correct portfolio-wide weight.
- **Sector grouping:** Holdings are grouped by `sector` via `groupBySector`. Each sector is rendered with a summary (total investment, present value, gain/loss) and its own table, matching the case study and the structure of the provided Excel sheet.

---

## Summary

| Challenge              | Approach                                                                 |
|------------------------|--------------------------------------------------------------------------|
| No official APIs       | yahoo-finance2 for CMP, P/E, EPS; optional Google later if required     |
| Rate limiting          | Backend cache (15s TTL); frontend 15s refresh; optional API rate limit |
| Partial failures       | try/catch per symbol; partial portfolio; 503 when no data               |
| Data accuracy          | Clear labels; recommend disclaimer in production                        |
| Portfolio % & sectors  | Full-portfolio percentage calculation; then group by sector            |
