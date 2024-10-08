/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Copy } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useOrderDetails } from '@/api';
import dayjs from 'dayjs';
import { OrderStatus } from '../status-views/order';
import { useStore } from '@/contexts/store-context';
import OrderReviewSkeleton from '../skeletons/order-review-skeleton';
import { useTranslation } from 'react-i18next';

type Props = {
  orderId: string;
};

const OrderReview = ({ orderId }: Props) => {
  const {t} = useTranslation();
  const orderDetails = useOrderDetails(orderId);
  const { storeConfiguration } = useStore();

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      {orderDetails.isPending ? (
        <OrderReviewSkeleton />
      ) : (
        <>
          <CardHeader className="bg-muted/50">
            <div className="flex flex-row items-start ">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  {t("order.name")} {orderDetails?.data?.data?.orderNumber}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">{t("order.order_copy_id")}</span>
                  </Button>
                </CardTitle>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <OrderStatus status={orderDetails?.data?.data?.status} />
              </div>
            </div>
            <CardDescription>
              {t("order.date")}:{' '}
              {dayjs(orderDetails?.data?.data?.createdAt).format(
                'MMMM DD, YYYY'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">{t("order.order_details")}</div>
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
                  <span className="text-muted-foreground">{t("order_fields.subtotal")}</span>
                  <span>
                    {orderDetails?.data?.data?.totalAmount?.toFixed(2)}{' '}
                    {storeConfiguration?.currency}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("order_fields.shipping")}</span>
                  <span>
                    {orderDetails?.data?.data?.deliveryPrice?.toFixed(2)}{' '}
                    {storeConfiguration?.currency}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("order_fields.tax")}</span>
                  <span>
                    {orderDetails?.data?.data?.totalTax?.toFixed(2)}{' '}
                    {storeConfiguration?.currency}
                  </span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">{t("order_fields.total")}</span>
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
                <div className="font-semibold">{t("order_fields.shipping_information")}</div>
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
                <div className="font-semibold">{t("order_fields.billing_address_information")}</div>
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
              <div className="font-semibold">{t("order_fields.customer_information")}</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">{t("order_fields.customer")}</dt>
                  <dd>{orderDetails?.data?.data?.customer?.name}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">{t("email")}</dt>
                  <dd>
                    <a href="mailto:">
                      {orderDetails?.data?.data?.customer?.contactInfo?.email ||
                        '-'}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">{t("phone")}</dt>
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
              {t("updated")}{' '}
              <time dateTime="2023-11-23">
                {dayjs(orderDetails?.data?.data?.updatedAt).format(
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

export default OrderReview;
