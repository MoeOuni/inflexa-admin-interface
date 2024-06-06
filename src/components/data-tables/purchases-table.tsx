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

import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

import { Input } from "../ui/input";

import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import { Purchase } from "@/lib/interfaces";
import dayjs from "dayjs";

type Props = {
  data: Purchase[];
};

const PurchasesTable = ({ data }: Props) => {
  // const navigate = useNavigate();

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
      accessorKey: "Purchase Code",
      header: "Purchase Code",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.reference}</div>
      ),
    },
    {
      accessorKey: "Purchased At",
      header: "Purchased At",
      cell: ({ row }) => (
        <div className="capitalize">
          {dayjs(row.original.broughtAt).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      accessorKey: "Supplier",
      header: "Supplier",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.supplierLabel}</div>
      ),
    },
    {
      accessorKey: "Total Price (Without Taxes)",
      header: "Total Price (Without Taxes)",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.totalWithoutTax}</div>
      ),
    },
    {
      accessorKey: "Total Taxes",
      header: "Total Taxes",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.totalTax}</div>
      ),
    },
    {
      accessorKey: "Total Price",
      header: "Total Price",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.totalPrice}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t("open_menu")}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>

              <Button
                size={"sm"}
                variant={"ghost"}
                className="w-full flex justify-start"
                // onClick={() => {
                //   navigate(`/suppliers/save/${row.original._id}`)

                // }}
              >
                Edit
              </Button>

              <DropdownMenuSeparator />
              {/* <ConfirmButton
                confirmTitle={t(
                  status === "ACTIVE"
                    ? "supplier_archive_confirm_title"
                    : "supplier_restore_confirm_title"
                )}
                confirmText={t(
                  status === "ACTIVE"
                    ? "supplier_archive_confirm_text"
                    : "supplier_restore_confirm_text"
                )}
                confirmFunction={() => {
                  if(status === "ACTIVE") {
                    archiveSupplier.mutate(row.original._id);
                  } else {
                    restoreSupplier.mutate(row.original._id);
                  }
                }}
              > */}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="w-full flex justify-start"
              >
                {/* {t(
                    status === "ACTIVE"
                      ? "supplier_archive_button"
                      : "supplier_restore_button"
                  )} */}
                Archive
              </Button>
              {/* </ConfirmButton> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
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
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Search by supplier..."
          value={
            (table.getColumn("supplier")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("supplier")?.setFilterValue(event.target.value)
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
            <Button variant="outline" className="ml-auto">
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
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                  {t("no_result")}
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
