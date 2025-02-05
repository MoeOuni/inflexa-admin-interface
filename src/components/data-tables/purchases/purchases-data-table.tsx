/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';

import { getColumns } from './purchases-table-columns';
import { useDataTable } from '@/hooks/use-data-table';
import DataTable from '@/components/common/data-table/data-table';
import { PurchasesTableFloatingBar } from './purchases-table-floating-bar';
import { DataTableToolbar } from '@/components/common/data-table/data-table-toolbar';
import { PurchasesTableToolbarActions } from './purchases-toolbar-actions';
import { useStore } from '@/contexts/store-context';
import { usePurchasesPagination } from '@/api';


const PurchasesDataTable = () => {
  const { currency } = useStore();

  const purchases = usePurchasesPagination();

  const columns = useMemo(
    () =>
      getColumns({
        currency,
      }),
    []
  );

  // const filterFields: DataTableFilterField<any>[] = [
  //   {
  //     label: 'Title',
  //     value: 'name',
  //     placeholder: 'Filter titles...',
  //   },
  // ];

  const { table } = useDataTable({
    data: purchases?.data?.data ? purchases?.data?.data : [],
    columns,
    pageCount: purchases?.data?.headers?.['x-total-pages'] ?? 0,
    // filterFields,
    enableAdvancedFilter: false,
    initialState: {
      //   columnVisibility: {
      //     image: false,
      //   },
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
      floatingBar={<PurchasesTableFloatingBar table={table} />}
    >
      <Toolbar table={table}>
        <PurchasesTableToolbarActions table={table} />
      </Toolbar>
    </DataTable>
    // </ScheduledTasksTableProvider>
  );
};

export default PurchasesDataTable;
