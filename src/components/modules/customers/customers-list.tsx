import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { SquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomersDataTable from '@/components/data-tables/customers/customers-data-table';

const CustomersList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center pb-3">
        <Button
          size="sm"
          className="h-8 gap-1"
          onClick={() => navigate('/customers/save')}
        >
          <SquarePlus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t('customer_add_button')}
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
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
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
      {/* <Card>
        <CardHeader>
          <CardTitle>{t('customers')}</CardTitle>
          <CardDescription>{t('customers_table_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomersTable
            data={customersData.data ? customersData.data?.data : []}
            loading={customersData.isLoading}
          />
        </CardContent>
      </Card> */}
      <CustomersDataTable />
    </div>
  );
};

export default CustomersList;
