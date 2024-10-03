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
        <ScrollArea className="h-[40vh] w-full rounded-lg border bg-muted">
          <div className="grid gap-2 p-4">
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
