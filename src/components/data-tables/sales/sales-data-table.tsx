/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from 'react';

import { getColumns } from './sales-table-columns';
import { useDataTable } from '@/hooks/use-data-table';
import DataTable from '@/components/common/data-table/data-table';
import { SalesTableFloatingBar } from './sales-table-floating-bar';
import { DataTableToolbar } from '@/components/common/data-table/data-table-toolbar';
import { SalesTableToolbarActions } from './sales-toolbar-actions';
import { useStore } from '@/contexts/store-context';
import { useOrdersPagination } from '@/api';

type Props = {
  setSaleId?: React.Dispatch<React.SetStateAction<string>>;
};

const SalesDataTable = ({ setSaleId }: Props) => {
  const { currency } = useStore();
    
  const orders = useOrdersPagination({
    defaultStatus: 'delivered',
  });

  useEffect(() => {
    if (orders?.data?.data?.length > 0 && setSaleId) {
      setSaleId(orders?.data?.data[0]._id);
    }
  }, [orders.data?.data]);

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
    data: orders?.data?.data ? orders?.data?.data : [],
    columns,
    pageCount: orders?.data?.headers?.['x-total-pages'] ?? 0,
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
      onRowClick={(row) => setSaleId && setSaleId(row?._id)}
      floatingBar={<SalesTableFloatingBar table={table} />}
    >
      <Toolbar table={table}>
        <SalesTableToolbarActions table={table} />
      </Toolbar>
    </DataTable>
    // </ScheduledTasksTableProvider>
  );
};

export default SalesDataTable;
