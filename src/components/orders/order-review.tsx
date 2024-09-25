/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import {
  // ChevronLeft,
  // ChevronRight,
  Copy,
  // Truck
} from 'lucide-react';
import { Separator } from '../ui/separator';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
// } from '../ui/pagination';
import { useOrderDetails } from '@/api';
import dayjs from 'dayjs';
import { OrderStatus } from '../status-views/order';
import { useStore } from '@/contexts/store-context';

type Props = {
  orderId: string;
};

const OrderReview = ({ orderId }: Props) => {
  const orderDetails = useOrderDetails(orderId);
  const { storeConfiguration } = useStore();

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="bg-muted/50">
        <div className="flex flex-row items-start ">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Order {orderDetails?.data?.data?.orderNumber}
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy Order ID</span>
              </Button>
            </CardTitle>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <OrderStatus status={orderDetails?.data?.data?.status} />
            {/* <Button size="sm" variant="outline" className="h-8 gap-1">
              <Truck className="h-3.5 w-3.5" />
              <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                Track Order
              </span>
            </Button> */}
          </div>
        </div>
        <CardDescription>
          Date:{' '}
          {dayjs(orderDetails?.data?.data?.createdAt).format('MMMM DD, YYYY')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            {orderDetails?.data?.data?.products?.map((product: any) => (
              <li
                key={product._id}
                className="flex items-center justify-between"
              >
                <span className="text-muted-foreground">
                  {product?.product?.name} x <span>{product.quantity}</span>
                </span>
                <span>
                  {(product.price * product.quantity)?.toFixed(2)}{' '}
                  {storeConfiguration?.currency}
                </span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>
                {orderDetails?.data?.data?.totalAmount?.toFixed(2)}{' '}
                {storeConfiguration?.currency}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {orderDetails?.data?.data?.deliveryPrice?.toFixed(2)}{' '}
                {storeConfiguration?.currency}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>
                {orderDetails?.data?.data?.totalTax?.toFixed(2)}{' '}
                {storeConfiguration?.currency}
              </span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>
                {(
                  orderDetails?.data?.data?.totalTax +
                  orderDetails?.data?.data?.deliveryPrice +
                  orderDetails?.data?.data?.totalAmount
                )?.toFixed(2)}{' '}
                {storeConfiguration?.currency}
              </span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{orderDetails?.data?.data?.customer?.name}</span>
              <span>
                {orderDetails?.data?.data?.shippingAddress?.state},{' '}
                {orderDetails?.data?.data?.shippingAddress?.city},{' '}
                {orderDetails?.data?.data?.shippingAddress?.country}
              </span>
              <span>
                {orderDetails?.data?.data?.shippingAddress?.street},{' '}
                {orderDetails?.data?.data?.shippingAddress?.postalCode}
              </span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Information</div>
            <div className="grid gap-0.5 not-italic text-muted-foreground">
              <span>
                {orderDetails?.data?.data?.billingAddress?.state},{' '}
                {orderDetails?.data?.data?.billingAddress?.city},{' '}
                {orderDetails?.data?.data?.billingAddress?.country}
              </span>
              <span>
                {orderDetails?.data?.data?.billingAddress?.street},{' '}
                {orderDetails?.data?.data?.billingAddress?.postalCode}
              </span>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>{orderDetails?.data?.data?.customer?.name}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">
                  {orderDetails?.data?.data?.customer?.contactInfo?.email ||
                    '-'}
                </a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">
                  {orderDetails?.data?.data?.customer?.contactInfo?.phone ||
                    '-'}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated{' '}
          <time dateTime="2023-11-23">
            {dayjs(orderDetails?.data?.data?.updatedAt).format('MMMM DD, YYYY')}
          </time>
        </div>
        {/* <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </CardFooter>
    </Card>
  );
};

export default OrderReview;
