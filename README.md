# Portfolio Dashboard — Frontend (React / Next.js)

Hi, I'm **Shubham**. This is the frontend for the OctaByte Portfolio Dashboard — summary cards, allocation chart, and sector-wise tables.

For the full project overview and how to run both backend + frontend together, see the **root [README](../README.md)**.

---

## Prerequisites

- Node.js 18+
- Backend API running on port 5000 (see `octa-byte-portpolio-dashbaord-node`)

## Setup

```bash
npm install
```

## Run

1. **Start the backend first** (in `octa-byte-portpolio-dashbaord-node`):

   ```bash
   npm run dev
   ```

2. **Start the frontend:**

   ```bash
   npm run dev
   ```

3. Open **http://localhost:3000** in your browser.

## Changing the API URL

The app uses `http://localhost:5000` for the backend. To point elsewhere, update **`app/network/endpoint.ts`** (or add something like `NEXT_PUBLIC_API_URL` and use it there).

## Build for production

```bash
npm run build
npm start
```

## Tech stack

- Next.js (App Router), React, TypeScript  
- Tailwind CSS  
- SWR, Recharts, TanStack Table, Axios  

— **Shubham**
