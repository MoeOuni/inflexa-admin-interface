import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Supplier } from '@/lib/interfaces';
import i18next from 'i18next';
import { SuppliersActionMenu } from './suppliers-action-menu';

export function getColumns(): ColumnDef<Supplier>[] {
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
      accessorKey: 'Supplier code',
      header: i18next.t('supplier_code_label'),
      cell: ({ row }) => (
        <div className="capitalize">{row.original.supplierCode}</div>
      ),
    },
    {
      accessorKey: 'companyName',
      header: i18next.t('supplier_company_name_label'),
      cell: ({ row }) => (
        <div className="capitalize">{row.original.companyName}</div>
      ),
    },
    {
      accessorKey: 'Address',
      header: i18next.t('supplier_address_label'),
      cell: ({ row }) => (
        <div className="capitalize">{row.original.address}</div>
      ),
    },
    {
      accessorKey: 'Telephone',
      header: i18next.t('supplier_phone_label'),
      cell: ({ row }) => (
        <div className="capitalize">{row.original.phoneNumber}</div>
      ),
    },
    {
      accessorKey: 'Tax number',
      header: i18next.t('supplier_tax_number_label'),
      cell: ({ row }) => (
        <div className="capitalize">{row.original.taxNumber}</div>
      ),
    },
    {
      accessorKey: 'Representative/trustee',
      header: i18next.t('supplier_representative_label'),
      cell: ({ row }) => (
        <div className="capitalize">{row.original.representative}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return <SuppliersActionMenu supplier={row.original} status='ACTIVE' />;
      },
    },
  ];
}
