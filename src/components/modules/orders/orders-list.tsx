import { Button } from '@/components/ui/button';
import { SquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OrdersDataTable from '@/components/data-tables/orders/orders-data-table';

type Props = {
  setOrderId: React.Dispatch<React.SetStateAction<string>>;
};

const OrdersList = ({ setOrderId }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/orders/save');
  };

  return (
    <div>
      <div className="flex items-center gap-2 pb-3 flex-col md:flex-row">
        <Button className="h-8 gap-1" size={'sm'} onClick={handleNavigate}>
          <SquarePlus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t('order.new_order_button')}
          </span>
        </Button>
      </div>

      <OrdersDataTable setOrderId={setOrderId} />
    </div>
  );
};

export default OrdersList;
