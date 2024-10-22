/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useOrderDetails } from '@/api';
import { useStore } from '@/contexts/store-context';
import dayjs from 'dayjs';
import { Separator } from '@/components/ui/separator';
// import { OrderStatus } from '@/components/app/status-views/order';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderReviewSkeleton from '@/components/app/skeletons/order-review-skeleton';

type Props = { saleId: string };

const SaleReview = ({ saleId }: Props) => {
  const saleDetails = useOrderDetails(saleId);
  const { storeConfiguration } = useStore();
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      {saleDetails.isPending ? (
        <OrderReviewSkeleton />
      ) : (
        <>
          <CardHeader className="bg-muted/50">
            <div className="flex flex-row items-start ">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Sale {saleDetails?.data?.data?.orderNumber}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Sale ID</span>
                  </Button>
                </CardTitle>
              </div>
              <div className="ml-auto flex items-center gap-1"></div>
            </div>
            <CardDescription>
              Date:{' '}
              {dayjs(saleDetails?.data?.data?.createdAt).format(
                'MMMM DD, YYYY'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Sale Details</div>
              <ul className="grid gap-3">
                {saleDetails?.data?.data?.products?.map((product: any) => (
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
                    {saleDetails?.data?.data?.totalAmount?.toFixed(2)}{' '}
                    {storeConfiguration?.currency}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {saleDetails?.data?.data?.deliveryPrice?.toFixed(2)}{' '}
                    {storeConfiguration?.currency}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>
                    {saleDetails?.data?.data?.totalTax?.toFixed(2)}{' '}
                    {storeConfiguration?.currency}
                  </span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>
                    {(
                      saleDetails?.data?.data?.totalTax +
                      saleDetails?.data?.data?.deliveryPrice +
                      saleDetails?.data?.data?.totalAmount
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
                  <span>{saleDetails?.data?.data?.customer?.name}</span>
                  <span>
                    {saleDetails?.data?.data?.shippingAddress?.state},{' '}
                    {saleDetails?.data?.data?.shippingAddress?.city},{' '}
                    {saleDetails?.data?.data?.shippingAddress?.country}
                  </span>
                  <span>
                    {saleDetails?.data?.data?.shippingAddress?.street},{' '}
                    {saleDetails?.data?.data?.shippingAddress?.postalCode}
                  </span>
                </address>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold">Billing Information</div>
                <div className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>
                    {saleDetails?.data?.data?.billingAddress?.state},{' '}
                    {saleDetails?.data?.data?.billingAddress?.city},{' '}
                    {saleDetails?.data?.data?.billingAddress?.country}
                  </span>
                  <span>
                    {saleDetails?.data?.data?.billingAddress?.street},{' '}
                    {saleDetails?.data?.data?.billingAddress?.postalCode}
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
                  <dd>{saleDetails?.data?.data?.customer?.name}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:">
                      {saleDetails?.data?.data?.customer?.contactInfo?.email ||
                        '-'}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <a href="tel:">
                      {saleDetails?.data?.data?.customer?.contactInfo?.phone ||
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
                {dayjs(saleDetails?.data?.data?.updatedAt).format(
                  'MMMM DD, YYYY'
                )}
              </time>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default SaleReview;
