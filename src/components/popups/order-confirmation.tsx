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
import { PaymentStatus } from '@/components/status-views/payment.tsx';

// @ts-ignore
const OrderConfirmationPopup = ({ form, onSubmit, disabled }) => {
  const { currency } = useStore();
  const [open, setOpen] = React.useState(false);

  const onOpenChange = () => {
    form.trigger().then((result: boolean) => {
      if (!result) {
        if (form.formState.errors.products?.message) {
          toast.error(form.formState.errors.products.message);
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
        Validate
      </Button>
      <DialogContent className="sm:max-w-[712px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Order Confirmation</DialogTitle>
          <DialogDescription>
            Confirm the order before proceeding.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[50vh] w-full rounded-lg border bg-muted">
          <div className="grid gap-2 p-4">
            <div className="flex justify-between border-b pb-2">
              <div className="text-xs">
                <div className="text-muted-foreground">Customer</div>
                <div>{form.getValues().customerName}</div>
              </div>
              <div className="text-xs">
                <div className="text-muted-foreground">
                  Shipping Information
                </div>
                <address className="text-xs not-italic">
                  <div>
                    {`${form.getValues().shippingAddress?.street}, ${form.getValues().shippingAddress?.city}, ${form.getValues().shippingAddress?.postalCode}`}
                  </div>

                  <div>
                    {`${form.getValues().shippingAddress?.country}, ${form.getValues().shippingAddress?.city}, ${form.getValues().shippingAddress?.state}`}
                  </div>
                </address>
              </div>
            </div>

            <table className="w-full text-left text-sm text-gray-500">
              <thead className="text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="bg-gray-100 px-3 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Product name
                  </th>
                  <th scope="col" className="bg-gray-100 px-3 py-3 text-right">
                    Unit Price
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Tax
                  </th>
                  <th scope="col" className="bg-gray-100 px-3 py-3 text-right">
                    Total Price
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
                        className="border-b border-gray-200"
                        key={product.product}
                      >
                        <td className="bg-gray-100 px-3 py-3">
                          {product.quantity}
                        </td>
                        <td className="px-3 py-3 font-bold">{product.name}</td>
                        <td className="bg-gray-100 px-3 py-3 text-right">
                          {product.price.toFixed(2)}
                          {currency.symbol}
                        </td>
                        <td className="px-3 py-3">19%</td>
                        <td className="bg-gray-100 px-3 py-3 text-right">
                          {(product.price * product.quantity).toFixed(2)}
                          {currency.symbol}
                        </td>
                      </tr>
                    ),
                  )}
              </tbody>
            </table>

            <div className="grid gap-2 text-xs uppercase text-gray-700">
              <div className="grid grid-cols-[1fr_auto] items-center gap-2 pb-2 px-3 border-b">
                <div className="font-bold">Subtotal</div>
                <div className="text-muted-foreground">
                  {form
                    .getValues()
                    .products.reduce(
                      (
                        acc: number,
                        product: { price: number; quantity: number },
                      ) => acc + product.price * product.quantity,
                      0,
                    )
                    .toFixed(2)}
                  {currency.symbol}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-2 pb-2 px-3 border-b">
                <div className="font-bold">Shipping</div>
                <div className="text-muted-foreground">
                  {form.getValues()?.shippingCost?.toFixed(2) || 0}
                  {currency.symbol}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-2 pb-2 px-3 border-b">
                <div className="font-bold">Tax</div>
                <div className="text-muted-foreground">
                  {(
                    form
                      .getValues()
                      .products.reduce(
                        (
                          acc: number,
                          product: { price: number; quantity: number },
                        ) => acc + product.price * product.quantity,
                        0,
                      ) * 0.19
                  ).toFixed(2)}
                  {currency.symbol}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-2 pb-2 px-3 border-b ">
                <div className="font-bold">Total</div>
                <div className="text-muted-foreground">
                  {(
                    form
                      .getValues()
                      .products.reduce(
                        (
                          acc: number,
                          product: { price: number; quantity: number },
                        ) => acc + product.price * product.quantity,
                        0,
                      ) +
                    (form.getValues()?.shippingCost || 0) +
                    form
                      .getValues()
                      .products.reduce(
                        (
                          acc: number,
                          product: { price: number; quantity: number },
                        ) => acc + product.price * product.quantity,
                        0,
                      ) *
                      0.19
                  ).toFixed(2)}
                  {currency.symbol}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-2 pb-2 px-3 ">
              <div className="text-xs uppercase font-bold">Payment Type</div>
              <PaymentStatus status={form.getValues().payment} />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button disabled={disabled} type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={() => {
              onSubmit();
            }}
            disabled={disabled}
          >
            {disabled && <Loader2 className="mr-2 h-5 w-5 animate-spin" />} Save
            Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmationPopup;
