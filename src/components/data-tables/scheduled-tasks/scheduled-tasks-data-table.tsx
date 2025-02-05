/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useCronTasksPagination } from '@/api';
import { getColumns } from './scheduled-tasks-table-columns';
import { useDataTable } from '@/hooks/use-data-table';
import DataTable from '@/components/common/data-table/data-table';
import { useTranslation } from 'react-i18next';
// import {
//   ScheduledTasksTableProvider,
// } from './scheduled-tasks-provider';
import { ScheduledTasksTableFloatingBar } from './scheduled-tasks-table-floating-bar';
import { DataTableToolbar } from '@/components/common/data-table/data-table-toolbar';
import { ScheduledTasksTableToolbarActions } from './scheduled-tasks-toolbar-actions';

const ScheduledTasksDataTable = () => {
  const { i18n, t } = useTranslation();

  const cronTasks = useCronTasksPagination();

  const columns = useMemo(
    () =>
      getColumns({
        i18n,
        t,
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
    data: cronTasks?.data?.data ? cronTasks?.data?.data : [],
    columns,
    pageCount: cronTasks?.data?.headers?.['x-total-pages'] ?? 0,
    // filterFields,
    enableAdvancedFilter: false,
    initialState: {},
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
      floatingBar={<ScheduledTasksTableFloatingBar table={table} />}
    >
      <Toolbar table={table}>
        <ScheduledTasksTableToolbarActions table={table} />
      </Toolbar>
    </DataTable>
    // </ScheduledTasksTableProvider>
  );
};

export default ScheduledTasksDataTable;
