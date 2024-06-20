import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@/contexts/store-context";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import PurchaseDetailsList from "../purchases/purchase-details-list";
import type { ProductForm, Purchase } from "@/lib/types";
import { ProductFomSchema } from "@/lib/schemas";
import { useCreateInventory, useUpdatePurchase } from "@/api";
import { APICreateInventory, APIPurchase } from "@/lib/interfaces";
import { toast } from "sonner";
import dayjs from "dayjs";
import {
  calculateTotalPrice,
  calculateTotalTax,
  calculateTotalWithoutTax,
} from "@/lib/utils";

type Props = {
  purchase: Purchase;
  setPurchase: (purchase: Purchase) => void;
  setSteps: (steps: number) => void;
};

export default function PurchaseFormList({
  purchase,
  setPurchase,
  setSteps,
}: Props) {
  const createInventory = useCreateInventory();
  const updatePurchase = useUpdatePurchase();
  const { tax, currency } = useStore();

  const form = useForm<ProductForm>({
    resolver: zodResolver(ProductFomSchema),
    defaultValues: {
      reference: "",
      name: "",
      price: 0,
      tax: tax,
      quantity: 1,
      unit: "",
    },
    mode: "onChange",
  });

  const handleFinish = async () => {
    const payload: APIPurchase = {
      _id: purchase._id,
      reference: purchase.reference,
      supplier: purchase.supplierId,
      totalPrice: calculateTotalPrice(purchase.purchaseDetails) ?? 0,
      totalWithoutTax: calculateTotalWithoutTax(purchase.purchaseDetails) ?? 0,
      totalTax: calculateTotalTax(purchase.purchaseDetails) ?? 0,
      broughtAt: dayjs(purchase.createdAt).toDate(),
    };

    await updatePurchase.mutateAsync(payload);

    setPurchase({
      reference: "",
      supplierId: "",
      supplierLabel: "",
      createdAt: "",
      purchaseDetails: [],
      total: 0,
    });

    setSteps(0);
  };

  const onSubmit = async (data: ProductForm) => {
    try {
      if (!purchase?._id)
        return toast.error(
          "Purchase not created yet try again. or contact the support team."
        );

      const payload: APICreateInventory = {
        ...data,
        supplier: purchase?.supplierId,
        purchaseId: purchase?._id,
        purchaseReference: purchase?.reference,
      };

      await createInventory.mutateAsync(payload);

      const purchaseDetails: ProductForm[] = purchase.purchaseDetails || [];
      purchaseDetails.push(data);

      setPurchase({
        ...purchase,
        purchaseDetails,
      });

      form.reset({
        reference: "",
        name: "",
        price: 0,
        tax: tax,
        quantity: 1,
        unit: "",
      });
    } catch (error) {
      toast.error("An error occurred while saving the product.");
    }
  };

  return (
    <div className="grid md:grid-cols-[350px_1fr] gap-4  mx-auto ">
      <PurchaseDetailsList purchase={purchase} currency={currency} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid border p-4 bg-muted/40 rounded-lg gap-6"
        >
          <div className="grid md:grid-cols-2 gap-4 ">
            <div className="grid gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4">
              <FormField
                name="reference"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ({currency?.symbol})</FormLabel>
                  <Input
                    type="number"
                    step="0.01" // Set the step value to allow decimal numbers with two decimal places
                    min={0}
                    {...field}
                    onChange={(event) => {
                      const value = parseFloat(event.target.value);
                      field.onChange(typeof value === "number" && value);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="tax"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax</FormLabel>
                  <Input
                    type="number"
                    step="0.01" // Set the step value to allow decimal numbers with two decimal places
                    min={0}
                    {...field}
                    onChange={(event) => {
                      const value = parseFloat(event.target.value);
                      field.onChange(typeof value === "number" && value);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              name="unit"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="quantity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>

                  <Input
                    type="number"
                    min={0}
                    step="0.01" // Set the step value to allow decimal numbers with two decimal places
                    {...field}
                    onChange={(event) => {
                      const value = parseFloat(event.target.value);
                      field.onChange(typeof value === "number" && value);
                    }}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleFinish}>
              Finish
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
