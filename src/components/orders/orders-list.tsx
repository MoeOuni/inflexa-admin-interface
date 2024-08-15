import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { File, ListFilter } from 'lucide-react';
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

type Props = {
  setOrderId: React.Dispatch<React.SetStateAction<string>>;
};

const OrdersList = ({ setOrderId }: Props) => {
  const orders = useOrders();

  useEffect(() => {
    if (orders?.data?.data?.length > 0) {
      setOrderId(orders.data.data[0]._id)
    }
  }, [orders.status])

  return (
    <div>
      <Tabs defaultValue="week">
        <div className="flex items-center gap-2 flex-col md:flex-row">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          <div className="md:ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        <TabsContent value="week">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Orders</CardTitle>
              <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader>
            <CardContent className="max-w-full">
              <OrdersTable data={orders?.data?.data || []} setOrderId={setOrderId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersList;
