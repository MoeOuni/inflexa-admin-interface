/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useSuppliersPagination } from '@/api';
import { getColumns } from './suppliers-table-columns';
import { useDataTable } from '@/hooks/use-data-table';
import DataTable from '@/components/common/data-table/data-table';
import { SuppliersTableFloatingBar } from './suppliers-table-floating-bar';
import { DataTableToolbar } from '@/components/common/data-table/data-table-toolbar';
import { SuppliersTableToolbarActions } from './suppliers-toolbar-actions';

const SuppliersDataTable = () => {
  const suppliers = useSuppliersPagination();

  const columns = useMemo(() => getColumns(), []);

  // const filterFields: DataTableFilterField<any>[] = [
  //   {
  //     label: 'Title',
  //     value: 'name',
  //     placeholder: 'Filter titles...',
  //   },
  // ];

  const { table } = useDataTable({
    data: suppliers?.data?.data ? suppliers?.data?.data : [],
    columns,
    pageCount: suppliers?.data?.headers?.['x-total-pages'] ?? 0,
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
      floatingBar={<SuppliersTableFloatingBar table={table} />}
    >
      <Toolbar table={table}>
        <SuppliersTableToolbarActions table={table} />
      </Toolbar>
    </DataTable>
    // </ScheduledTasksTableProvider>
  );
};

export default SuppliersDataTable;
