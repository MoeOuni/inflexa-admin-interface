import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { ISale } from '@/lib/interfaces';
import { Currency } from '@/lib/types';
// import i18next from 'i18next';
import dayjs from 'dayjs';

import { SalesActionMenu } from './sales-action-menu';
// import { OrderStatus } from '@/components/app/status-views/order';

type Props = {
  currency: Currency;
};

export function getColumns({ currency }: Props): ColumnDef<ISale>[] {
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
      accessorKey: 'orderNumber',
      header: 'Reference',
      cell: ({ row }) => row.original.invoiceNumber || row.original.orderNumber,
    },
    // {
    //   accessorKey: 'status',
    //   header: 'Status',
    //   cell: ({ row }) => (
    //     <div>
    //       <OrderStatus status={row.original.status} />
    //     </div>
    //   ),
    // },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) =>
        dayjs(row.original.createdAt).format('YYYY-MM-DD HH:mm'),
    },
    {
      accessorKey: 'totalAmount',
      header: 'Amount',
      cell: ({ row }) =>
        row.original.totalAmount?.toFixed(2) + ' ' + currency?.symbol,
    },
    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: ({ row }) => {
        return <SalesActionMenu sale={row.original} />;
      },
    },
  ];
}
