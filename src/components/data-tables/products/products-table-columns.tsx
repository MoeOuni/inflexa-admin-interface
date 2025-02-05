import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/lib/interfaces';
import { Image } from 'antd';
import { ProductStatus } from '@/components/app/status-views/product';
import { Currency } from '@/lib/types';
import { ProductsActionMenu } from '@/components/data-tables/products/products-action-menu.tsx';

type Props = {
  currency: Currency;
};

export function getColumns({ currency }: Props): ColumnDef<Product>[] {
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
      id: 'image',
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
            {row.original.price?.listPrice?.toFixed(2)} {currency?.symbol}
          </div>
        ),
    },
    {
      accessorKey: 'price.discountPrice',
      header: 'Discount Price',
      cell: ({ row }) =>
        row.original.price?.discountPrice && (
          <div>
            {row.original.price?.discountPrice?.toFixed(2)} {currency?.symbol}
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
      header: '',
      enableHiding: false,
      cell: ({ row }) => <ProductsActionMenu product={row.original} />,
    },
  ];
}
