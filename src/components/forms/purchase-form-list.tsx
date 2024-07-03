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
import { useCreateProduct, useUpdatePurchase } from "@/api";
import { APICreateInventory, APIPurchase } from "@/lib/interfaces";
import { toast } from "sonner";
import dayjs from "dayjs";
import {
  calculateTotalPrice,
  calculateTotalTax,
  calculateTotalWithoutTax,
} from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import BackButton from "../app/back-button";
import { useNavigate } from "react-router-dom";
import { Save, Tags } from "lucide-react";

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
  const createInventory = useCreateProduct();
  const updatePurchase = useUpdatePurchase();

  const navigate = useNavigate();

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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4">
            <BackButton
              onClick={() => {
                navigate("/purchases");
              }}
            />
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              New Purchase
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 gap-1"
                onClick={handleFinish}
              >
                <Save className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Save Purchase
                </span>
              </Button>
              <Button type="submit" size="sm" className="h-8 gap-1">
                <Tags className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Save Product
                </span>
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-[350px_1fr] gap-4 mx-auto py-3 ">
            <PurchaseDetailsList purchase={purchase} currency={currency} />
            <Card>
              <CardHeader>
                <CardTitle>Product</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
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
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
