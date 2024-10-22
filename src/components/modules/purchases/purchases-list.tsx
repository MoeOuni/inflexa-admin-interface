import { usePurchases } from '@/api';
import PurchasesTable from '@/components/data-tables/purchases-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ListFilter, File, SquarePlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PurchasesList = () => {
  const [status, setStatus] = useState('ACTIVE');
  const { data, isLoading } = usePurchases();

  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center pb-3">
        <Button
          size="sm"
          className="h-8 gap-1"
          onClick={() => navigate('/purchases/save')}
        >
          <SquarePlus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t('purchase_add_button')}
          </span>
        </Button>
        <div className="ml-auto flex items-center gap-2">
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
        </div>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{t('purchases')}</CardTitle>
          <CardDescription>{t('purchases_table_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <PurchasesTable data={data ? data?.data : []} loading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchasesList;
