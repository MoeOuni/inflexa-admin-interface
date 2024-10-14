import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  CustomerFormSchema,
  CustomerFormSchemaDefaultValues,
} from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { PhoneInput } from '../app/phone-input';
// import { toast } from "sonner";
import { useStore } from '@/contexts/store-context';
import { useCreateCustomer } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ClipboardX, Save } from 'lucide-react';
import BackButton from '../app/back-button';

type CustomerFormType = z.infer<typeof CustomerFormSchema>;
function CustomerForm() {
  const createCustomer = useCreateCustomer();
  const { currency } = useStore();
  const [defaultValues, setDefaultValues] = useState<CustomerFormType>({
    ...CustomerFormSchemaDefaultValues,
  });

  const form = useForm<CustomerFormType>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: CustomerFormType) => {
    let status = '';

    await createCustomer.mutateAsync(data);

    status = createCustomer.status;

    if (status === 'success') {
      setDefaultValues({ ...CustomerFormSchemaDefaultValues });
      form.reset(CustomerFormSchemaDefaultValues);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            New Customer
          </h1>

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={() => {
                form.reset({});
              }}
            >
              <ClipboardX className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Discard
              </span>
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createCustomer.isPending}
              className="h-8 gap-1"
            >
              <Save className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Save Customer
              </span>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="name">Customer Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                      />
                    </FormControl>
                    <FormDescription>
                      You don't have to provide your email, but if you do, we
                      can create an account for you later to see your orders and
                      purchases.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="phnoe">Phone</FormLabel>
                    <FormControl>
                      <PhoneInput
                        defaultCountry="TN"
                        placeholder="Enter a phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fax"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="fax">Fax</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="fax"
                        type="tel"
                        placeholder="Enter fax number"
                        pattern="^+?d{1,2}?[-s]?(?d{3})?[-s]?d{3}[-s]?d{4}$"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="id">Customer ID</FormLabel>
                    <FormControl>
                      <Input
                        id="id"
                        placeholder="Enter customer ID"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="creditLimit"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="creditLimit">
                      Advance payment ({currency?.symbol})
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="balance"
                        type="number"
                        placeholder="Enter balance"
                        defaultValue={0}
                        step="0.01"
                        min={0}
                        {...field}
                        onChange={(event) => {
                          const value = parseFloat(event.target.value);
                          field.onChange(typeof value === 'number' && value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="shippingAddress.street"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="street">Street</FormLabel>
                    <FormControl>
                      <Input
                        id="street"
                        placeholder="Enter street address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress.city"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="city">City</FormLabel>
                    <FormControl>
                      <Input id="city" placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="shippingAddress.state"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="state">State</FormLabel>
                    <FormControl>
                      <Input id="state" placeholder="Enter state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress.postalCode"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        id="postalCode"
                        placeholder="Enter postal code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress.country"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <FormControl>
                      <Input
                        id="country"
                        placeholder="Enter country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="identicalShippingAndBilling"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Shipping address is the same as billing address
                    </FormLabel>
                    <FormDescription>
                      If your shipping address is identical to your billing
                      address, you can check this box to save time. This way,
                      you won't need to enter the same information twice.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

export default CustomerForm;
