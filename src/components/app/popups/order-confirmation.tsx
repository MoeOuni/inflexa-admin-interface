import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStore } from '@/contexts/store-context.tsx';
import React from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { PaymentStatus } from '@/components/app/status-views/payment';
import { useTranslation } from 'react-i18next';

// @ts-ignore
const OrderConfirmationPopup = ({ form, onSubmit, disabled }) => {
  const { t } = useTranslation();
  const { currency } = useStore();
  const [open, setOpen] = React.useState(false);

  const onOpenChange = () => {
    form.trigger().then((result: boolean) => {
      if (!result) {
        if (form.formState.errors.products?.message) {
          toast.error(form.formState.errors.products.message);
        } else if (form.formState.errors.delivery?.deliveryPrice) {
          toast.error(form.formState.errors.delivery.deliveryPrice?.message);
        } else {
          toast.error('Please validate all the fields before submitting');
        }
      } else {
        setOpen(true);
      }
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Button
        size="sm"
        className="h-8 gap-1"
        type={'button'}
        onClick={onOpenChange}
      >
        {t('validate')}
      </Button>
      <DialogContent className="sm:max-w-[712px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('order.order_confirmation')}</DialogTitle>
          <DialogDescription>
            {t('order.order_confirmation_text')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-muted">
          <div className="grid gap-2 p-4">
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
              <div className="text-xs">
                <div className="text-muted-foreground">
                  {t('order_fields.customer')}
                </div>
                <div>{form.getValues().customerName}</div>
              </div>
              <div className="text-xs">
                <div className="text-muted-foreground">
                  {t('order_fields.shipping_information')}
                </div>
                <address className="text-xs not-italic">
                  <div>
                    {`${form.getValues().shippingAddress?.street}, ${
                      form.getValues().shippingAddress?.city
                    }, ${form.getValues().shippingAddress?.postalCode}`}
                  </div>

                  <div>
                    {`${form.getValues().shippingAddress?.country}, ${
                      form.getValues().shippingAddress?.city
                    }, ${form.getValues().shippingAddress?.state}`}
                  </div>
                </address>
              </div>
            </div>

            <table className="w-full text-left text-sm dark:dark:text-white text-gray-500">
              <thead className="text-xs uppercase border-gray-200 dark:border-gray-700 border-b dark:dark:text-white text-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="dark:bg-gray-600 bg-gray-100 px-3 py-3"
                  >
                    {t('order_fields.quantity')}
                  </th>
                  <th scope="col" className="px-3 py-3">
                    {t('order_fields.product_name')}
                  </th>
                  <th
                    scope="col"
                    className="dark:bg-gray-600 bg-gray-100 px-3 py-3 text-right"
                  >
                    {t('order_fields.unit_price')}
                  </th>
                  <th scope="col" className="px-3 py-3">
                    {t('order_fields.tax')}
                  </th>
                  <th
                    scope="col"
                    className="dark:bg-gray-600 bg-gray-100 px-3 py-3 text-right"
                  >
                    {t('order_fields.total_price')}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {form
                  .getValues()
                  .products.map(
                    (product: {
                      product: string;
                      quantity: number;
                      name: string;
                      price: number;
                    }) => (
                      <tr
                        className="border-b border-gray-200 dark:border-gray-700"
                        key={product.product}
                      >
                        <td className="dark:bg-gray-600 bg-gray-100 px-3 py-3">
                          {product.quantity}
                        </td>
                        <td className="px-3 py-3 font-bold">{product.name}</td>
                        <td className="dark:bg-gray-600 bg-gray-100 px-3 py-3 text-right">
                          {product.price.toFixed(2)}
                          {currency.symbol}
                        </td>
                        <td className="px-3 py-3">19%</td>
                        <td className="dark:bg-gray-600 bg-gray-100 px-3 py-3 text-right">
                          {(product.price * product.quantity).toFixed(2)}
                          {currency.symbol}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>

            <div className="grid gap-2 text-xs uppercase dark:text-white text-gray-700">
              <div className="grid grid-cols-[1fr_auto] items-center gap-2 pb-2 px-3 border-gray-200 dark:border-gray-700 border-b">
                <div className="font-bold">Subtotal</div>
                <div className="text-muted-foreground dark:text-white">
                  {form
                    .getValues()
                    .products.reduce(
                      (
                        acc: number,
                        product: { price: number; quantity: number }
                      ) => acc + product.price * product.quantity,
                      0
                    )
                    .toFixed(2)}
                  {currency.symbol}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-2 pb-2 px-3 border-gray-200 dark:border-gray-700 border-b">
                <div className="font-bold">Shipping</div>
                <div className="text-muted-foreground dark:text-white">
                  {form.getValues()?.deliveryPrice?.toFixed(2) || 0}
                  {currency.symbol}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-2 pb-2 px-3 border-gray-200 dark:border-gray-700 border-b">
                <div className="font-bold">Tax</div>
                <div className="text-muted-foreground dark:text-white">
                  {(
                    form
                      .getValues()
                      .products.reduce(
                        (
                          acc: number,
                          product: { price: number; quantity: number }
                        ) => acc + product.price * product.quantity,
                        0
                      ) * 0.19
                  ).toFixed(2)}
                  {currency.symbol}
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto] items-center gap-2 pb-2 px-3 border-gray-200 dark:border-gray-700 border-b ">
                <div className="font-bold">Total</div>
                <div className="text-muted-foreground dark:text-white">
                  {(
                    form
                      .getValues()
                      .products.reduce(
                        (
                          acc: number,
                          product: { price: number; quantity: number }
                        ) => acc + product.price * product.quantity,
                        0
                      ) +
                    (form.getValues()?.deliveryPrice || 0) +
                    form
                      .getValues()
                      .products.reduce(
                        (
                          acc: number,
                          product: { price: number; quantity: number }
                        ) => acc + product.price * product.quantity,
                        0
                      ) *
                      0.19
                  ).toFixed(2)}
                  {currency.symbol}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-2 pb-2 px-3 ">
              <div className="text-xs uppercase font-bold">
                {t('order_fields.payment_type')}
              </div>
              <PaymentStatus status={form.getValues().payment} />
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-2 pb-2 px-3 ">
              <div className="text-xs uppercase font-bold">
                {t('order_fields.delivery_man')}
              </div>
              <div className="grid gap-1">
                <div className="text-xs dark:text-white text-gray-700 flex justify-between gap-3">
                  <span>{t('order_fields.delivery_man_name')}: </span>{' '}
                  <span> {form.getValues().delivery?.deliveryMan?.name}</span>
                </div>
                <div className="text-xs dark:text-white text-gray-700 flex justify-between gap-3">
                  <span>{t('order_fields.delivery_man_phone')}: </span>
                  <span> {form.getValues().delivery?.deliveryMan?.phone}</span>
                </div>
                <div className="text-xs dark:text-white text-gray-700 flex justify-between gap-3">
                  <span>{t('order_fields.delivery_man_reg_number')}: </span>{' '}
                  <span>
                    {' '}
                    {form.getValues().delivery?.deliveryMan?.registrationNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button disabled={disabled} type="button" variant="secondary">
              {t('confirm_cancel')}
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={() => {
              onSubmit();
            }}
            disabled={disabled}
          >
            {disabled && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}{' '}
            {t('order.save_order')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmationPopup;
