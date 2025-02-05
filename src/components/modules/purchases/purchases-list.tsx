import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { SquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PurchasesDataTable from '@/components/data-tables/purchases/purchases-data-table';

const PurchasesList = () => {
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
      </div>
      {/* <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{t('purchases')}</CardTitle>
          <CardDescription>{t('purchases_table_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <PurchasesTable data={data ? data?.data : []} loading={isLoading} />
        </CardContent>
      </Card> */}
      <PurchasesDataTable />
    </div>
  );
};

export default PurchasesList;
