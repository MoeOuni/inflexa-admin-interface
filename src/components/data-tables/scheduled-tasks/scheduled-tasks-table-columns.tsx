import cronstrue from 'cronstrue/i18n';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { ICronTask } from '@/lib/interfaces';
import { i18n, TFunction } from 'i18next';
import dayjs from 'dayjs';
import { CircleCheckBig, CircleX } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  i18n: i18n;
  t: TFunction<'translation', undefined>;
};

export function getColumns({ i18n }: Props): ColumnDef<ICronTask>[] {
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
      accessorKey: 'code',
      header: 'Code',
      cell: ({ row }) => <div>#{row.original.code}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help">
                {
                  (row.original.name as { [key: string]: string })[
                    i18n.language
                  ]
                }
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {
                (row.original.description as { [key: string]: string })[
                  i18n.language
                ]
              }
            </TooltipContent>
          </Tooltip>
        </div>
      ),
    },
    {
      accessorKey: 'frequency',
      header: 'Frequency',
      cell: ({ row }) => (
        <div>
          {cronstrue.toString(row.original.frequency, {
            locale: i18n.language,
          })}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div>
          {row.original.status === 'success' ? (
            <div className="text-green-500 flex text-sm items-center gap-2">
              <CircleCheckBig className="h-4 w-4 " />
              <span>Done</span>
            </div>
          ) : (
            <div className="text-red-600 flex text-sm items-center gap-2">
              <CircleX className="h-4 w-4" />
              <span>Failed</span>
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Executed At',
      cell: ({ row }) => (
        <div>
          {dayjs(row.original.createdAt.toLocaleString()).fromNow()}
        </div>
      ),
    },
  ];
}
