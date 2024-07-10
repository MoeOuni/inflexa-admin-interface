import { OrderFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
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
import { useCustomers } from '@/api';
import { Customer } from '@/lib/interfaces/customer';


type OrderForm = z.infer<typeof OrderFormSchema>;

const OrderForm = () => {
  const navigate = useNavigate();

  // API HOOKS
  const customers = useCustomers();

  const [defaultValues, setDefaultValues] = React.useState<
    OrderForm | undefined
  >(undefined);

  const form = useForm<OrderForm>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'products',
    control: form.control,
  });

  async function onSubmit(data: OrderForm) {
    setDefaultValues(data);

    console.log(data);
  }

  const handleNewCustomer = () => {
    window.open('/customers/save', '_blank');
  }

  const handleSearchCustomer = (value: string) => {
    console.log('search customer: ' + value);
  };

  const handleSearchProduct = (value: string) => {
    console.log('search product: ' + value);
  };

  const handleReturnNavigate = () => {
    navigate('/orders');
  };

  return (
    <div className="pb-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid flex-1 auto-rows-max gap-4"
        >
          {/* Top Side Menu */}
          <div className="flex items-center gap-4">
            <BackButton onClick={handleReturnNavigate} />
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              New Order
            </h1>
            <div>
              <Badge>Pending</Badge>
            </div>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button type="submit" size="sm" className="h-8 gap-1">
                Save Order
              </Button>
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
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    'max-w-sm justify-between',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value
                                    ? customers?.data.data.find(
                                        (customer: Customer) =>
                                          customer._id === field.value
                                      )?.name
                                    : 'Select Customer'}

                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput
                                  onValueChange={(value) =>
                                    handleSearchCustomer(value)
                                  }
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
                                                form.setValue(
                                                  'customer',
                                                  customer?._id || ''
                                                );
                                              }}
                                            >
                                              {customer.name}
                                              <div className="flex gap-1 ml-auto items-center">
                                                <Badge className="text-xs font-normal">
                                                  #{customer?.customerId}
                                                </Badge>
                                                <CheckIcon
                                                  className={cn(
                                                    'ml-auto h-4 w-4',
                                                    customer._id === field.value
                                                      ? 'opacity-100'
                                                      : 'opacity-0'
                                                  )}
                                                />
                                              </div>
                                            </CommandItem>
                                          )
                                        )}
                                        {/* {languages.map((language) => (
                              <CommandItem
                                key={language.value}
                                onSelect={() => {
                                  form.setValue('customer', language.value);
                                }}
                              >
                                {language.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    language.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))} */}
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
                  <Button type="button" variant={'outline'} className="ml-auto" onClick={handleNewCustomer}>
                    Create New Customer
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Order Status
                  </CardTitle>
                  <CardContent>

                  </CardContent>
                </CardHeader>
              </Card>
            </div>
          </div>
          {/* Bottom Side Action Buttons ON MOBILE */}
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm" type="submit" className="h-8 gap-1">
              Save Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;
