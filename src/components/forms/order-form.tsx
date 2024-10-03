import { OrderFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import BackButton from '../app/back-button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../app/scroll-area';
import { Textarea } from '../ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useCreateOrder, useCustomers, useProducts } from '@/api';
import { Customer } from '@/lib/interfaces/customer';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { OrderStatus } from '../status-views/order';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Input } from '../ui/input';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { Product } from '@/lib/interfaces';
import { PhoneInput } from '../app/phone-input';
import { PaymentStatus } from '../status-views/payment';
import { toast } from 'sonner';
import OrderConfirmationPopup from '@/components/popups/order-confirmation.tsx';

type OrderForm = z.infer<typeof OrderFormSchema>;

const OrderForm = () => {
  const navigate = useNavigate();

  // API HOOKS
  const customers = useCustomers();
  const products = useProducts({
    isAvailable: true,
    needsReview: false,
  });
  const order = useCreateOrder();

  const form = useForm<OrderForm>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      customer: '',
      status: 'processed',
      notes: '',
      products: [],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'products',
    control: form.control,
  });

  async function onSubmit(data: OrderForm) {
    order
      .mutateAsync(data)
      .then(() => {
        navigate('/orders');
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            'An error occurred while saving the product.',
        );
      });
  }

  const handleNewCustomer = () => {
    window.open('/customers/save', '_blank');
  };

  const handleReturnNavigate = () => {
    navigate('/orders');
  };

  const handleSelectCustomer = (customer: Customer) => {
    const shippingAddress = customer?.contactInfo?.shippingAddress?.[
      customer.contactInfo?.shippingAddress?.length - 1
    ] ?? { postalCode: '', city: '', country: '', state: '', street: '' };
    const billingAddress = customer?.contactInfo?.billingAddress?.[
      customer.contactInfo?.billingAddress?.length - 1
    ] ?? { postalCode: '', city: '', country: '', state: '', street: '' };

    form.setValue('customer', customer._id || '');

    form.setValue(`billingAddress`, billingAddress);
    form.setValue(`shippingAddress`, shippingAddress);

    form.setValue('customerName', customer.name ?? '');
  };

  const handleSelectProduct = (product: Product, index: number) => {
    form.setValue(`products.${index}.product`, product._id || '');
    form.setValue(`products.${index}.productRef`, product.reference || '');
    form.setValue(`products.${index}.price`, product.price?.listPrice || 0);
    form.setValue(`products.${index}.name`, product.name || '');
  };

  return (
    <div className="pb-2">
      <Form {...form}>
        <form
          onInvalid={(e) => console.log(e)}
          className="grid flex-1 auto-rows-max gap-4"
        >
          {/* Top Side Menu */}
          <div className="flex items-center gap-4">
            <BackButton onClick={handleReturnNavigate} />
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              New Order
            </h1>
            <div>
              <Badge>New</Badge>
            </div>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" disabled={order.isPending}>
                Discard
              </Button>
              <OrderConfirmationPopup
                form={form}
                onSubmit={form.handleSubmit(onSubmit)}
                disabled={order.isPending}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_340px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Customer</CardTitle>
                  <CardDescription>
                    Select a customer for this order. If the customer is not in
                    the list, you can create a new one from the button below.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      name="customer"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Customer</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  disabled={order.isPending}
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    'max-w-sm justify-between',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value
                                    ? customers?.data.data.find(
                                        (customer: Customer) =>
                                          customer._id === field.value,
                                      )?.name
                                    : 'Select Customer'}

                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search customer..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <ScrollArea className="h-72">
                                    <CommandEmpty>
                                      No customer found.
                                    </CommandEmpty>

                                    {customers?.isSuccess && (
                                      <CommandGroup>
                                        {customers?.data.data?.map(
                                          (customer: Customer) => (
                                            <CommandItem
                                              className="w-full"
                                              key={customer._id}
                                              onSelect={() => {
                                                handleSelectCustomer(customer);
                                              }}
                                            >
                                              {customer.name}
                                              <div className="flex gap-1 ml-auto items-center">
                                                <Badge
                                                  className="text-xs font-normal"
                                                  variant={'outline'}
                                                >
                                                  #{customer?.customerId}
                                                </Badge>
                                                <CheckIcon
                                                  className={cn(
                                                    'ml-auto h-4 w-4',
                                                    customer?._id ===
                                                      field.value
                                                      ? 'opacity-100'
                                                      : 'opacity-0',
                                                  )}
                                                />
                                              </div>
                                            </CommandItem>
                                          ),
                                        )}
                                      </CommandGroup>
                                    )}
                                  </ScrollArea>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="notes"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              disabled={order.isPending}
                              {...field}
                              className="h-32 p-2 border rounded-md w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="button"
                    disabled={order.isPending}
                    variant={'outline'}
                    className="ml-auto"
                    onClick={handleNewCustomer}
                  >
                    Create New Customer
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Add products to the order. You can search for products by
                    name or reference.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fields.map((_field, index) => (
                        <TableRow>
                          <TableCell className="align-top">
                            <FormField
                              control={form.control}
                              name={`products.${index}.product`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            type={'button'}
                                            disabled={order.isPending}
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                              'w-full justify-between',
                                              !field.value &&
                                                'text-muted-foreground',
                                            )}
                                          >
                                            {field.value
                                              ? products?.data.data.find(
                                                  (product: Product) =>
                                                    product._id === field.value,
                                                )?.name
                                              : 'Select Product'}

                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="p-0">
                                        <Command>
                                          <CommandInput
                                            placeholder="Search product..."
                                            className="h-9"
                                          />
                                          <CommandList>
                                            <ScrollArea className="h-72">
                                              <CommandEmpty>
                                                No product found.
                                              </CommandEmpty>

                                              {products?.isSuccess && (
                                                <CommandGroup>
                                                  {products?.data.data?.map(
                                                    (product: Product) => (
                                                      <CommandItem
                                                        className="w-full"
                                                        key={product._id}
                                                        onSelect={() => {
                                                          handleSelectProduct(
                                                            product,
                                                            index,
                                                          );
                                                        }}
                                                      >
                                                        {product.name}
                                                        <div className="flex gap-1 ml-auto items-center">
                                                          <Badge
                                                            className="text-xs font-normal"
                                                            variant={'outline'}
                                                          >
                                                            #
                                                            {product?.reference}
                                                          </Badge>
                                                          <CheckIcon
                                                            className={cn(
                                                              'ml-auto h-4 w-4',
                                                              product?._id ===
                                                                field.value
                                                                ? 'opacity-100'
                                                                : 'opacity-0',
                                                            )}
                                                          />
                                                        </div>
                                                      </CommandItem>
                                                    ),
                                                  )}
                                                </CommandGroup>
                                              )}
                                            </ScrollArea>
                                          </CommandList>
                                        </Command>
                                      </PopoverContent>
                                    </Popover>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="align-top">
                            <FormField
                              control={form.control}
                              name={`products.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      disabled={order.isPending}
                                      {...field}
                                      type="number"
                                      step="0.01"
                                      max={
                                        products?.data.data.find(
                                          (product: Product) =>
                                            product?._id ===
                                            form.getValues(
                                              `products.${index}.product`,
                                            ),
                                        )?.stock?.currentStock
                                      }
                                      className="max-w-24"
                                      onChange={(event) => {
                                        const value = parseFloat(
                                          event.target.value,
                                        );
                                        field.onChange(
                                          typeof value === 'number' && value,
                                        );
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="align-top">
                            <FormField
                              control={form.control}
                              name={`products.${index}.price`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      disabled={order.isPending}
                                      {...field}
                                      type="number"
                                      step="0.01"
                                      className="max-w-36"
                                      onChange={(event) => {
                                        const value = parseFloat(
                                          event.target.value,
                                        );
                                        field.onChange(
                                          typeof value === 'number' && value,
                                        );
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="align-top">
                            <Button
                              type={'button'}
                              disabled={order.isPending}
                              variant={'ghost'}
                              onClick={() => remove(index)}
                              className=""
                              size={'sm'}
                            >
                              <Trash2 className="h-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="justify-center border-t">
                  <Button
                    size="sm"
                    type="button"
                    disabled={order.isPending}
                    variant="ghost"
                    className="gap-1 mt-2"
                    onClick={() =>
                      append({
                        product: '',
                        quantity: 1,
                        price: 0,
                        productRef: '',
                      })
                    }
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Product
                  </Button>
                </CardFooter>
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
                              disabled={order.isPending}
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
                            <Input
                              disabled={order.isPending}
                              id="city"
                              placeholder="Enter city"
                              {...field}
                            />
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
                            <Input
                              disabled={order.isPending}
                              id="state"
                              placeholder="Enter state"
                              {...field}
                            />
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
                          <FormLabel htmlFor="postalCode">
                            Postal Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
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
                              disabled={order.isPending}
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
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="billingAddress.street"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="street">Street</FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
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
                      name="billingAddress.city"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="city">City</FormLabel>
                          <FormControl>
                            <Input
                              id="city"
                              disabled={order.isPending}
                              placeholder="Enter city"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="billingAddress.state"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="state">State</FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
                              id="state"
                              placeholder="Enter state"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="billingAddress.postalCode"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="postalCode">
                            Postal Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
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
                      name="billingAddress.country"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="country">Country</FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
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
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="space-y-3 ">
                          <FormControl>
                            <RadioGroup
                              disabled={order.isPending}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <div>
                                  <FormControl>
                                    <RadioGroupItem value="pending" />
                                  </FormControl>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel>
                                    <OrderStatus status="pending" />
                                  </FormLabel>
                                  <FormDescription>
                                    The order has been placed but not yet
                                    processed.
                                  </FormDescription>
                                </div>
                              </FormItem>
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <div>
                                  <FormControl>
                                    <RadioGroupItem value="processed" />
                                  </FormControl>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel>
                                    <OrderStatus status="processed" />
                                  </FormLabel>
                                  <FormDescription>
                                    The order has been reviewed and is being
                                    prepared for shipment.
                                  </FormDescription>
                                </div>
                              </FormItem>
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <div>
                                  <FormControl>
                                    <RadioGroupItem value="shipped" />
                                  </FormControl>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel>
                                    <OrderStatus status="shipped" />
                                  </FormLabel>
                                  <FormDescription>
                                    The order has been dispatched and is on its
                                    way to the delivery address.
                                  </FormDescription>
                                </div>
                              </FormItem>
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <div>
                                  <FormControl>
                                    <RadioGroupItem value="delivered" />
                                  </FormControl>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel>
                                    <OrderStatus status="delivered" />
                                  </FormLabel>
                                  <FormDescription>
                                    The order has been delivered to the
                                    customer.
                                  </FormDescription>
                                </div>
                              </FormItem>
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <div>
                                  <FormControl>
                                    <RadioGroupItem value="cancelled" />
                                  </FormControl>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel>
                                    <OrderStatus status="cancelled" />
                                  </FormLabel>
                                  <FormDescription>
                                    The order has been cancelled and will not be
                                    processed or delivered.
                                  </FormDescription>
                                </div>
                              </FormItem>
                            </RadioGroup>
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
                  <CardTitle>Delivery (Optional)</CardTitle>
                  <CardDescription>
                    You can leave this section empty if the order does is not
                    ready for delivery.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      name="delivery.deliveryMan.name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>
                            Delivery Man Name
                            <span className="text-muted-foreground">
                              {' '}
                              (Optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input disabled={order.isPending} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="delivery.deliveryMan.phone"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Delivery Phone Number</FormLabel>
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
                      name="delivery.deliveryMan.registrationNumber"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Delivery Registration Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="deliveryPrice"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Price</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              onChange={(event) => {
                                const value = parseFloat(event.target.value);
                                field.onChange(
                                  typeof value === 'number' && value,
                                );
                              }}
                              disabled={products.isPending}
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
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="payment"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Payment Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              disabled={order.isPending}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <div>
                                  <FormControl>
                                    <RadioGroupItem value="cash" />
                                  </FormControl>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel>
                                    <PaymentStatus status="cash" />
                                  </FormLabel>
                                </div>
                              </FormItem>
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <div>
                                  <FormControl>
                                    <RadioGroupItem value="credit" />
                                  </FormControl>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel>
                                    <PaymentStatus status="credit" />
                                  </FormLabel>
                                </div>
                              </FormItem>
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <div>
                                  <FormControl>
                                    <RadioGroupItem value="debit" />
                                  </FormControl>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel>
                                    <PaymentStatus status="debit" />
                                  </FormLabel>
                                </div>
                              </FormItem>
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <div>
                                  <FormControl>
                                    <RadioGroupItem value="check" />
                                  </FormControl>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel>
                                    <PaymentStatus status="check" />
                                  </FormLabel>
                                </div>
                              </FormItem>
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <div>
                                  <FormControl>
                                    <RadioGroupItem value="payment_on_delivery" />
                                  </FormControl>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel>
                                    <PaymentStatus status="payment_on_delivery" />
                                  </FormLabel>
                                </div>
                              </FormItem>
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <div>
                                  <FormControl>
                                    <RadioGroupItem value="other" />
                                  </FormControl>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel>
                                    <PaymentStatus status="other" />
                                  </FormLabel>
                                </div>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Bottom Side Action Buttons ON MOBILE */}
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" disabled={order.isPending}>
              Discard
            </Button>
            <Button
              size="sm"
              type="submit"
              className="h-8 gap-1"
              disabled={order.isPending}
            >
              {order.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}{' '}
              Save Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;
