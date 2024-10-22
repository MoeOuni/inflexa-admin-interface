import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { File, ListFilter, SquarePlus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OrdersTable } from '@/components/data-tables/orders-table';
import { useOrders } from '@/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUrlState from '@ahooksjs/use-url-state';
import { useTranslation } from 'react-i18next';

type Props = {
  setOrderId: React.Dispatch<React.SetStateAction<string>>;
};

const OrdersList = ({ setOrderId }: Props) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [params, setParams] = useUrlState({
    status: '',
  });

  const orders = useOrders({
    params,
  });

  useEffect(() => {
    if (orders?.data?.data?.length > 0) {
      setOrderId(orders.data.data[0]._id);
    }
  }, [orders.data?.data]);

  const handleNavigate = () => {
    navigate('/orders/save');
  };

  const handleCheckChange = (checkedValue: string, checked: boolean) => {
    if (checked === false) {
      setParams({ status: '' });
    } else {
      setParams({ status: checkedValue });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 pb-3 flex-col md:flex-row">
        <Button className="h-8 gap-1" size={'sm'} onClick={handleNavigate}>
          <SquarePlus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t("order.new_order_button")}
          </span>
        </Button>
        <div className="md:ml-auto flex items-center gap-2 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">{t('filter')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("filter_by")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={params?.status === 'pending'}
                onCheckedChange={(e) => handleCheckChange('pending', e)}
              >
                {t("status.pending")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={params?.status === 'processed'}
                onCheckedChange={(e) => handleCheckChange('processed', e)}
              >
                {t("status.processed")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={params?.status === 'shipped'}
                onCheckedChange={(e) => handleCheckChange('shipped', e)}
              >
                {t("status.shipped")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={params?.status === 'delivered'}
                onCheckedChange={(e) => handleCheckChange('delivered', e)}
              >
                {t("status.delivered")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={params?.status === 'cancelled'}
                onCheckedChange={(e) => handleCheckChange('cancelled', e)}
              >
                {t("status.cancelled")}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">{t("export")}</span>
          </Button>
        </div>
      </div>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>{t("order.orders")}</CardTitle>
          <CardDescription>
            {t("order.orders_table_text")}
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-full">
          <OrdersTable
            data={orders?.data?.data || []}
            setOrderId={setOrderId}
            loading={orders?.status === 'pending'}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersList;
