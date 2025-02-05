import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Customer } from '@/lib/interfaces/customer';
import i18next from 'i18next';
import { CustomersActionMenu } from './customers-action-menu';
import { Currency } from '@/lib/types';
type Props = {
  currency: Currency;
};

export function getColumns({ currency }: Props): ColumnDef<Customer>[] {
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
      accessorKey: 'customerId',
      header: i18next.t('customer_id_label'),
      cell: ({ row }) => <div>{row.original.customerId}</div>,
    },
    {
      accessorKey: 'name',
      header: i18next.t('customer_name_label'),
      cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
    },
    {
      accessorKey: 'contactInfo.email',
      header: i18next.t('customer_email_label'),
      cell: ({ row }) => (
        <div>
          {row.original.contactInfo?.email
            ? row.original.contactInfo?.email
            : ' - '}
        </div>
      ),
    },
    {
      accessorKey: 'contactInfo.phone',
      header: i18next.t('customer_phone_label'),
      cell: ({ row }) => (
        <div className="capitalize">{row.original.contactInfo?.phone}</div>
      ),
    },
    // {
    //   accessorKey: "totalSpent",
    //   header: i18next.t("customer_total_spent_label"),
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.original.totalSpent}</div>
    //   ),
    // },
    {
      accessorKey: 'financialInfo.creditLimit',
      header: i18next.t('customer_credit_limit_label'),
      cell: ({ row }) => {
        const displayValue = `${
          row.original.financialInfo?.creditLimit?.toLocaleString() ?? '0'
        }
          ${currency?.symbol}`;
        return <div className="capitalize">{displayValue}</div>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return <CustomersActionMenu customer={row.original} />;
      },
    },
  ];
}
