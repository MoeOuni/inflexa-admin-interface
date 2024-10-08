import * as React from 'react';
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
} from '@tanstack/react-table';
import {
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ChevronDown,
  Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '../ui/input';

import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import { Order } from '@/lib/interfaces';
import { OrderStatus } from '../status-views/order';
import { OrderActionMenu } from '../action-menus/order-action-menu';
import { useStore } from '@/contexts/store-context';

type Props = {
  setOrderId: React.Dispatch<React.SetStateAction<string>>;
  data: Order[];
  loading: boolean;
};

export function OrdersTable({ data, setOrderId, loading }: Props) {
  const { t } = useTranslation();
  const { currency } = useStore();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'orderNumber',
      header: t("order.data_table_headers.reference"),
      cell: ({ row }) => row.original.orderNumber,
    },
    {
      accessorKey: 'status',
      header: t("order.data_table_headers.status"),
      cell: ({ row }) => (
        <div>
          <OrderStatus status={row.original.status} />
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: t("order.data_table_headers.date"),
      cell: ({ row }) =>
        dayjs(row.original.createdAt).format('YYYY-MM-DD HH:mm'),
    },
    {
      accessorKey: 'totalAmount',
      header: t("order.data_table_headers.amount"),
      cell: ({ row }) =>
        row.original.totalAmount?.toFixed(2) + ' ' + currency?.symbol,
    },
    {
      id: 'actions',
      header: t("actions"),
      enableHiding: false,
      cell: ({ row }) => {
        return <OrderActionMenu order={row.original} />;
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
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 10, //custom default page size
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="max-w-full">
      <div className="flex items-center gap-2 pb-4">
        <Input
          placeholder={'Search by reference'}
          value={
            (table.getColumn('orderNumber')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('orderNumber')?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {t('columns')} <ChevronDown className="ml-2 h-4 w-4" />
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
                              ? 'cursor-pointer select-none flex items-center'
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <Tooltip
                            title={
                              header.column.getCanSort()
                                ? header.column.getNextSortingOrder() === 'asc'
                                  ? 'Sort ascending'
                                  : header.column.getNextSortingOrder() ===
                                    'desc'
                                  ? 'Sort descending'
                                  : 'Clear sort'
                                : undefined
                            }
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
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => setOrderId(row.original?._id)}
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
            {t('previous')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t('next')}
          </Button>
        </div>
      </div>
    </div>
  );
}
