import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Purchase } from '@/lib/interfaces';
import { Currency } from '@/lib/types';
import dayjs from 'dayjs';
import { PurchasesActionMenu } from './purchases-action-menu.tsx';

type Props = {
  currency: Currency;
};

export function getColumns({ currency }: Props): ColumnDef<Purchase>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'reference',
      header: 'Reference',
      cell: ({ row }) => (
        <div className="capitalize">{row.original.reference}</div>
      ),
    },
    {
      accessorKey: 'broughtAt',
      header: 'Purchased At',
      cell: ({ row }) => (
        <div className="capitalize">
          {dayjs(row.original.broughtAt).format('DD/MM/YYYY')}
        </div>
      ),
    },
    {
      accessorKey: 'supplierLabel',
      header: 'Supplier',
      cell: ({ row }) => (
        <div className="capitalize">{row.original.supplierLabel}</div>
      ),
    },
    {
      accessorKey: 'totalWithoutTax',
      header: 'Total Price (Without Taxes)',
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.totalWithoutTax?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {currency?.symbol}
        </div>
      ),
    },
    {
      accessorKey: 'totalTax',
      header: 'Total Taxes',
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.totalTax?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {currency?.symbol}
        </div>
      ),
    },
    {
      accessorKey: 'totalPrice',
      header: 'Total Price',
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.totalPrice?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {currency?.symbol}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: () => {
        return (
          <PurchasesActionMenu
          // purchase={row.original}
          />
        );
      },
    },
  ];
}
