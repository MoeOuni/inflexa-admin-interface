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
} from '@/components/ui/form';
import BackButton from '@/components/app/back-button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/app/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCreateOrder, useCustomers, useProducts } from '@/api';
import { Customer } from '@/lib/interfaces/customer';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OrderStatus } from '@/components/app/status-views/order';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Product } from '@/lib/interfaces';
import { PhoneInput } from '@/components/app/phone-input';
import { PaymentStatus } from '@/components/app/status-views/payment';
import { toast } from 'sonner';
import OrderConfirmationPopup from '@/components/app/popups/order-confirmation';
import { useTranslation } from 'react-i18next';

type OrderForm = z.infer<typeof OrderFormSchema>;

const OrderForm = () => {
  const { t } = useTranslation();
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
            <BackButton />
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {t('order.new_order')}
            </h1>
            <div>
              <Badge>{t('new')}</Badge>
            </div>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" disabled={order.isPending}>
                {t('discard')}
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
                  <CardTitle>{t('order_fields.customer')}</CardTitle>
                  <CardDescription>
                    {t('order_fields.customer_text')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      name="customer"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>{t('order_fields.customer')}</FormLabel>
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
                                    : t('select_customer')}

                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput
                                  placeholder={t('search_customer')}
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
                          <FormLabel>{t('order_fields.notes')}</FormLabel>
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
                    {t('customer_add_button')}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('order_fields.products')}</CardTitle>
                  <CardDescription>
                    {t('order_fields.products_text')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('order_fields.product')}</TableHead>
                        <TableHead>{t('order_fields.quantity')}</TableHead>
                        <TableHead>{t('order_fields.unit_price')}</TableHead>
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
                                              : t('select_product')}

                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="p-0">
                                        <Command>
                                          <CommandInput
                                            placeholder={t('search_product')}
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
                    {t('add_product_button')}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {t('order_fields.shipping_information')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="shippingAddress.street"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="street">
                            {t('address_fields.street')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
                              id="street"
                              placeholder={t(
                                'address_fields.street_placeholder',
                              )}
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
                          <FormLabel htmlFor="city">
                            {t('address_fields.city')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
                              id="city"
                              placeholder={t('address_fields.city_placeholder')}
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
                          <FormLabel htmlFor="state">
                            {t('address_fields.state')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
                              id="state"
                              placeholder={t(
                                'address_fields.state_placeholder',
                              )}
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
                            {t('address_fields.zip_code')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
                              id="postalCode"
                              placeholder={t(
                                'address_fields.zip_code_placeholder',
                              )}
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
                          <FormLabel htmlFor="country">
                            {t('address_fields.country')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
                              id="country"
                              placeholder={t(
                                'address_fields.country_placeholder',
                              )}
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
                  <CardTitle>
                    {t('order_fields.billing_address_information')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="billingAddress.street"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="street">
                            {t('address_fields.street')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
                              id="street"
                              placeholder={t(
                                'address_fields.street_placeholder',
                              )}
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
                          <FormLabel htmlFor="city">
                            {t('address_fields.city')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="city"
                              disabled={order.isPending}
                              placeholder={t('address_fields.city_placeholder')}
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
                          <FormLabel htmlFor="state">
                            {t('address_fields.state')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
                              id="state"
                              placeholder={t(
                                'address_fields.state_placeholder',
                              )}
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
                            {t('address_fields.zip_code')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
                              id="postalCode"
                              placeholder={t(
                                'address_fields.zip_code_placeholder',
                              )}
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
                          <FormLabel htmlFor="country">
                            {t('address_fields.country')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={order.isPending}
                              id="country"
                              placeholder={t(
                                'address_fields.country_placeholder',
                              )}
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
                  <CardTitle>{t('order_fields.order_status')}</CardTitle>
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
                                    {t('status_descriptions.order_pending')}
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
                                    {t('status_descriptions.order_processed')}
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
                                    {t('status_descriptions.order_shipped')}
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
                                    {t('status_descriptions.order_delivered')}
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
                                    {t('status_descriptions.order_cancelled')}
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
                  <CardTitle>{t('order_fields.payment')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="payment"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            {t('order_fields.payment_type')}
                          </FormLabel>
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
              <Card>
                <CardHeader>
                  <CardTitle>{t('order_fields.delivery')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      name="delivery.deliveryMan.name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>
                            {t('order_fields.delivery_man_name_label')}
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
                          <FormLabel>
                            {t('order_fields.delivery_man_phone_label')}
                          </FormLabel>
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
                          <FormLabel>
                            {t('order_fields.delivery_man_reg_number_label')}
                          </FormLabel>
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
                          <FormLabel>
                            {t('order_fields.delivery_price_label')}
                          </FormLabel>
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
            </div>
          </div>
          {/* Bottom Side Action Buttons ON MOBILE */}
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" disabled={order.isPending}>
              {t('discard')}
            </Button>
            <OrderConfirmationPopup
              form={form}
              onSubmit={form.handleSubmit(onSubmit)}
              disabled={order.isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;
