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
import { Image, Tooltip } from 'antd';
import { Product } from '@/lib/interfaces';
import { ProductActionMenu } from '../action-menus/product-action-menu';
import { ProductStatus } from '../status-views/product';
import { useStore } from '@/contexts/store-context';

type Props = {
  data: Product[];
  loading: boolean;
};

export function ProductsTable({ data, loading }: Props) {
  const { t } = useTranslation();
  const { currency } = useStore();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) =>
        row.original?.images?.[0] ? (
          <Image.PreviewGroup
            items={row.original?.images?.map(
              (image) => import.meta.env.VITE_API_URL + '/' + image.url
            )}
          >
            <Image
              alt="Product image"
              className="aspect-square rounded-md object-contain"
              height={64}
              src={
                import.meta.env.VITE_API_URL +
                '/' +
                row.original?.images?.[0]?.url
              }
              width={64}
            />
          </Image.PreviewGroup>
        ) : (
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-contain"
            height={64}
            src={'/placeholder.svg'}
            width={64}
          />
        ),
    },
    {
      accessorKey: 'reference',
      header: 'Reference',
      cell: ({ row }) => <div>{row.original.reference}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: 'category.categoryName',
      header: 'Category',
      cell: ({ row }) => <div>{row.original?.category?.categoryName}</div>,
    },
    {
      accessorKey: 'price.listPrice',
      header: 'List Price',
      cell: ({ row }) =>
        row.original.price?.listPrice && (
          <div>
            {row.original.price?.listPrice.toFixed(2)}
            {" "}
            {currency?.symbol}
          </div>
        ),
    },
    {
      accessorKey: 'price.discountPrice',
      header: 'Discount Price',
      cell: ({ row }) =>
        row.original.price?.discountPrice && (
          <div>
            {row.original.price?.discountPrice.toFixed(2)}
            {" "}
            {currency?.symbol}
          </div>
        ),
    },
    {
      accessorKey: 'stock.currentStock',
      header: 'Current Stock',
      cell: ({ row }) => (
        <div>
          {row.original.stock?.currentStock} {row.original.stock?.unit}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="flex gap-2 flex-wrap max-w-[190px]">
          <ProductStatus status={row.original.status} />
        </div>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => <ProductActionMenu product={row.original} />,
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
        pageSize: 6, //custom default page size
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
    <div className="w-full">
      <div className="flex items-start md:items-center flex-col md:flex-row gap-2 py-4">
        <Input
          placeholder={'Search products...'}
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        <Input
          placeholder={'Search references...'}
          value={(table.getColumn('reference')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('reference')?.setFilterValue(event.target.value)
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
                    'No results.'
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
