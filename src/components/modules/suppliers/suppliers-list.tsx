import { Button } from '@/components/ui/button';
import { SquarePlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SuppliersDataTable from '@/components/data-tables/suppliers/suppliers-data-table';

const SuppliersList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center pb-3">
        <Button
          size="sm"
          className="h-8 gap-1"
          onClick={() => navigate('/suppliers/save')}
        >
          <SquarePlus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t('supplier_add_button')}
          </span>
        </Button>
        {/* <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                onClick={() => {
                  setStatus('ACTIVE');
                }}
                checked={status === 'ACTIVE'}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={() => {
                  setStatus('DELETED');
                }}
                checked={status === 'DELETED'}
              >
                Deleted
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={() => {
                  setStatus('ARCHIVED');
                }}
                checked={status === 'ARCHIVED'}
              >
                Archived
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
        </div> */}
      </div>

      {/* <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{t('suppliers')}</CardTitle>
          <CardDescription>{t('suppliers_table_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ProvidersTable
            data={suppliers?.data?.data ?? []}
            status={status}
            loading={suppliers?.isLoading}
          />
        </CardContent>
      </Card> */}
      <SuppliersDataTable />
    </div>
  );
};

export default SuppliersList;
