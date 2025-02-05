/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useProductsPagination } from '@/api';
import { getColumns } from './products-table-columns';
import { useDataTable } from '@/hooks/use-data-table';
import DataTable from '@/components/common/data-table/data-table';
import { ProductsTableFloatingBar } from './products-table-floating-bar';
import { DataTableToolbar } from '@/components/common/data-table/data-table-toolbar';
import { ProductsTableToolbarActions } from './products-toolbar-actions';
import { useStore } from '@/contexts/store-context';

const ProductsDataTable = () => {
  const { currency } = useStore();

  const products = useProductsPagination();

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
    data: products?.data?.data ? products?.data?.data : [],
    columns,
    pageCount: products?.data?.headers?.['x-total-pages'] ?? 0,
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
      floatingBar={<ProductsTableFloatingBar table={table} />}
    >
      <Toolbar table={table}>
        <ProductsTableToolbarActions table={table} />
      </Toolbar>
    </DataTable>
    // </ScheduledTasksTableProvider>
  );
};

export default ProductsDataTable;
