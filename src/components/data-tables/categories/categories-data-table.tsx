/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useCategoriesPagination } from '@/api';
import { getColumns } from './categories-table-columns';
import { useDataTable } from '@/hooks/use-data-table';
import DataTable from '@/components/common/data-table/data-table';
import { CategoriesTableFloatingBar } from './categories-table-floating-bar';
import { DataTableToolbar } from '@/components/common/data-table/data-table-toolbar';
import { CategoriesTableToolbarActions } from './categories-toolbar-actions';

const CategoriesDataTable = () => {
  const categories = useCategoriesPagination();

  const columns = useMemo(() => getColumns(), []);

  // const filterFields: DataTableFilterField<any>[] = [
  //   {
  //     label: 'Title',
  //     value: 'name',
  //     placeholder: 'Filter titles...',
  //   },
  // ];

  const { table } = useDataTable({
    data: categories?.data?.data ? categories?.data?.data : [],
    columns,
    pageCount: categories?.data?.headers?.['x-total-pages'] ?? 0,
    // filterFields,
    enableAdvancedFilter: false,
    initialState: {
      columnVisibility: {
        image: false,
      },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    getRowId: (originalRow, index) => `${originalRow._id}-${index}`,
    shallow: false,
    clearOnDefault: true,
  });

  const Toolbar = DataTableToolbar;

  return (
    // <ScheduledTasksTableProvider>
    <DataTable
      table={table}
      floatingBar={<CategoriesTableFloatingBar table={table} />}
    >
      <Toolbar table={table}>
        <CategoriesTableToolbarActions table={table} />
      </Toolbar>
    </DataTable>
    // </ScheduledTasksTableProvider>
  );
};

export default CategoriesDataTable;
