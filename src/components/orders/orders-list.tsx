import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { File, ListFilter, SquarePlus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { OrdersTable } from '../data-tables/orders-table';
import { useOrders } from '@/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUrlState from '@ahooksjs/use-url-state';

type Props = {
  setOrderId: React.Dispatch<React.SetStateAction<string>>;
};

const OrdersList = ({ setOrderId }: Props) => {
  const navigate = useNavigate();
  const [params, setParams] = useUrlState({
    status: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'],
  });

  const orders = useOrders({ params: '' });

  useEffect(() => {
    if (orders?.data?.data?.length > 0) {
      setOrderId(orders.data.data[0]._id);
    }
  }, [orders.status]);

  const handleNavigate = () => {
    navigate('/orders/save');
  };

  const handleCheckChange = (checkedValue: string, checked: boolean) => {
    if (checked === false) {
      const tempStatus = params.status.filter(
        (el: string) => el !== checkedValue
      );
      setParams({ status: tempStatus });
    } else {
      if (Array.isArray(params.status)) {
        setParams({ status: [...params.status, checkedValue] });
      } else {
        setParams({ status: [params.status, checkedValue] });
      }
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 pb-3 flex-col md:flex-row">
        <Button className="h-8 gap-1" size={'sm'} onClick={handleNavigate}>
          <SquarePlus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create New Order
          </span>
        </Button>
        <div className="md:ml-auto flex items-center gap-2 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={params?.status?.includes('pending')}
                onCheckedChange={(e) => handleCheckChange('pending', e)}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={params?.status?.includes('processed')}
                onCheckedChange={(e) => handleCheckChange('processed', e)}
              >
                Processed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={params?.status?.includes('shipped')}
                onCheckedChange={(e) => handleCheckChange('shipped', e)}
              >
                Shipped
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={params?.status?.includes('delivered')}
                onCheckedChange={(e) => handleCheckChange('delivered', e)}
              >
                Delivered
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={params?.status?.includes('cancelled')}
                onCheckedChange={(e) => handleCheckChange('cancelled', e)}
              >
                Cancelled
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Recent orders from your store. The orders are sorted by date, with
            the most recent orders displayed at the top of the table.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-full">
          <OrdersTable
            data={orders?.data?.data || []}
            setOrderId={setOrderId}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersList;
