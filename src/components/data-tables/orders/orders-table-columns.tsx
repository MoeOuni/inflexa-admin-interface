import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Order } from '@/lib/interfaces';
import { Currency } from '@/lib/types';
import { OrderStatus } from '@/components/app/status-views/order';
import i18next from 'i18next';
import dayjs from 'dayjs';
import { OrdersActionMenu } from '@/components/data-tables/orders/orders-action-menu.tsx';

type Props = {
  currency: Currency;
};

export function getColumns({ currency }: Props): ColumnDef<Order>[] {
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
      header: i18next.t('order.data_table_headers.reference'),
      cell: ({ row }) => row.original.orderNumber,
    },
    {
      accessorKey: 'status',
      header: i18next.t('order.data_table_headers.status'),
      cell: ({ row }) => (
        <div>
          <OrderStatus status={row.original.status} />
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: i18next.t('order.data_table_headers.date'),
      cell: ({ row }) =>
        dayjs(row.original.createdAt).format('YYYY-MM-DD HH:mm'),
    },
    {
      accessorKey: 'totalAmount',
      header: i18next.t('order.data_table_headers.amount'),
      cell: ({ row }) =>
        row.original.totalAmount?.toFixed(2) + ' ' + currency?.symbol,
    },
    {
      id: 'actions',
      header: i18next.t('actions'),
      enableHiding: false,
      cell: ({ row }) => {
        return <OrdersActionMenu order={row.original} />;
      },
    },
  ];
}
