/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useCustomersPagination } from '@/api';
import { getColumns } from './customers-table-columns';
import { useDataTable } from '@/hooks/use-data-table';
import DataTable from '@/components/common/data-table/data-table';
import { CustomersTableFloatingBar } from './customers-table-floating-bar';
import { DataTableToolbar } from '@/components/common/data-table/data-table-toolbar';
import { CustomersTableToolbarActions } from './customers-toolbar-actions';
import { useStore } from '@/contexts/store-context';

const CustomersDataTable = () => {
  const customers = useCustomersPagination();
  const { currency } = useStore();

  const columns = useMemo(() => getColumns({ currency }), []);

  // const filterFields: DataTableFilterField<any>[] = [
  //   {
  //     label: 'Title',
  //     value: 'name',
  //     placeholder: 'Filter titles...',
  //   },
  // ];

  const { table } = useDataTable({
    data: customers?.data?.data ? customers?.data?.data : [],
    columns,
    pageCount: customers?.data?.headers?.['x-total-pages'] ?? 0,
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
      floatingBar={<CustomersTableFloatingBar table={table} />}
    >
      <Toolbar table={table}>
        <CustomersTableToolbarActions table={table} />
      </Toolbar>
    </DataTable>
    // </ScheduledTasksTableProvider>
  );
};

export default CustomersDataTable;
