import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '@/lib/types';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import i18next from 'i18next';

export function getColumns(): ColumnDef<Category>[] {
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
      accessorKey: 'name',
      header: i18next.t('category_name_label'),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: i18next.t('category_created_at_label'),
      cell: ({ row }) => (
        <div className="lowercase">
          {dayjs(row.getValue('createdAt')).format('DD/MM/YYYY')}
        </div>
      ),
    },
    {
      accessorKey: 'subCategory',
      header: i18next.t('category_sub_category_key'),
      cell: ({ row }) => {
        const nbrSubCats = row.original.subCategories?.length;
        return (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="font-medium">
                {nbrSubCats} {i18next.t('category_sub_category_mini_unit')}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <ul className="my-2 ml-5 list-disc [&>li]:mt-2">
                {row.original.subCategories?.map((subCategory) => (
                  <li key={subCategory._id}>
                    <div className="capitalize">{subCategory.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {subCategory.description}
                    </div>
                  </li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
        );
      },
    },
  ];
}
