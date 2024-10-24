import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ChevronDown,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import { Purchase } from "@/lib/interfaces";
import dayjs from "dayjs";
import { useStore } from "@/contexts/store-context";
import { Tooltip } from "antd";
import { PurchaseActionMenu } from "@/components/app/action-menus/purchase-action-menu";

type Props = {
  data: Purchase[];
  loading: boolean;
};

const PurchasesTable = ({ data, loading }: Props) => {
  // const navigate = useNavigate();
  const { currency } = useStore();
  const { t } = useTranslation();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Purchase>[] = [
    {
      accessorKey: "reference",
      header: "Reference",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.reference}</div>
      ),
    },
    {
      accessorKey: "broughtAt",
      header: "Purchased At",
      cell: ({ row }) => (
        <div className="capitalize">
          {dayjs(row.original.broughtAt).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      accessorKey: "supplierLabel",
      header: "Supplier",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.supplierLabel}</div>
      ),
    },
    {
      accessorKey: "totalWithoutTax",
      header: "Total Price (Without Taxes)",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.totalWithoutTax?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          {currency?.symbol}
        </div>
      ),
    },
    {
      accessorKey: "totalTax",
      header: "Total Taxes",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.totalTax?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          {currency?.symbol}
        </div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.totalPrice?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          {currency?.symbol}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return <PurchaseActionMenu purchase={row.original} />;
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-start md:items-center flex-col md:flex-row gap-2 pb-4">
        <Input
          placeholder="Search by supplier..."
          value={
            (table.getColumn("supplierLabel")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("supplierLabel")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        <Input
          placeholder="Search by reference..."
          value={
            (table.getColumn("reference")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("reference")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {String(column.columnDef?.header)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <Tooltip
                           title={() => {
                            const tooltipTitle = header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === 'asc'
                                ? 'Sort ascending'
                                : header.column.getNextSortingOrder() ===
                                  'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                              : undefined;
                            return tooltipTitle;
                          }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Tooltip>
                          {{
                            asc: (
                              <ArrowDownWideNarrow className="h-4 w-4 ml-2" />
                            ),
                            desc: (
                              <ArrowDownNarrowWide className="h-4 w-4 ml-2" />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  {loading ? (
                    <div className="flex justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    </div>
                  ) : (
                    t("no_result")
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t("previous")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchasesTable;
