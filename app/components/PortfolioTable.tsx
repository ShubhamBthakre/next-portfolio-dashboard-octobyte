"use client";

import { memo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

import { PortfolioStock } from "../types/portfolio";

interface Props {
  data: PortfolioStock[];
}

function PortfolioTable({ data }: Props) {
  const columns: ColumnDef<PortfolioStock>[] = [
    { header: "Particulars", accessorKey: "name" },
    { header: "Sector", accessorKey: "sector" },
    { header: "Purchase Price", accessorKey: "purchasePrice" },
    { header: "Qty", accessorKey: "quantity" },
    { header: "Investment", accessorKey: "investment" },
    {
      header: "Portfolio (%)",
      accessorKey: "portfolioPercent",
      cell: (info) => {
        const v = info.getValue();
        const num = typeof v === "number" && !Number.isNaN(v) ? v : 0;
        return `${num.toFixed(2)}%`;
      },
    },
    {
      header: "NSE/BSE",
      accessorKey: "symbol",
      cell: (info) => info.getValue() ?? "—",
    },
    { header: "CMP", accessorKey: "cmp" },
    { header: "Present Value", accessorKey: "presentValue" },
    {
      header: "Gain/Loss",
      accessorKey: "gainLoss",
      cell: (info) => {
        const value = Number(info.getValue());
        return (
          <span
            className={
              value >= 0
                ? "text-gain-positive font-semibold"
                : "text-gain-negative font-semibold"
            }
          >
            {value.toFixed(2)}
          </span>
        );
      },
    },
    {
      header: "Gain/Loss (%)",
      id: "gainLossPercent",
      cell: ({ row }) => {
        const inv = Number(row.original.investment);
        const gl = Number(row.original.gainLoss);
        if (inv === 0) return "—";
        const pct = (gl / inv) * 100;
        return (
          <span
            className={
              pct >= 0 ? "text-gain-positive font-semibold" : "text-gain-negative font-semibold"
            }
          >
            {pct.toFixed(2)}%
          </span>
        );
      },
    },
    {
      header: "P/E (TTM)",
      accessorKey: "peRatio",
      cell: (info) => {
        const v = info.getValue();
        if (v == null || (typeof v === "number" && Number.isNaN(v))) return "—";
        return typeof v === "number" ? v.toFixed(2) : String(v);
      },
    },
    {
      header: "Latest Earnings",
      accessorKey: "latestEarnings",
      cell: (info) => {
        const v = info.getValue();
        if (v == null || (typeof v === "number" && Number.isNaN(v))) return "—";
        return typeof v === "number" ? v.toFixed(2) : String(v);
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        { id: "sector", desc: false },
        { id: "presentValue", desc: true },
      ],
    },
  });

  return (
    <div className="overflow-x-auto min-w-0 rounded-lg border border-surface-subtle">
      <table className="w-full min-w-[800px]">
        <thead className="bg-primary-light/40">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    className={`label p-3 sm:p-4 text-left text-primary font-semibold whitespace-nowrap first:rounded-tl-lg last:rounded-tr-lg ${canSort ? "cursor-pointer select-none hover:opacity-80" : ""}`}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <span className="inline-flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {canSort && (
                        <span className="text-card-label">
                          {sorted === "asc" ? " ↑" : sorted === "desc" ? " ↓" : " ⇅"}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody className="bg-background">
          {table.getRowModel().rows.map((row, i) => (
            <tr
              key={row.id}
              className="border-t border-surface-subtle hover:bg-surface-muted/50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="paragraph p-3 sm:p-4 text-foreground whitespace-nowrap"
                >
                  {cell.column.columnDef.cell != null
                    ? flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )
                    : String(cell.getValue() ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(PortfolioTable);
