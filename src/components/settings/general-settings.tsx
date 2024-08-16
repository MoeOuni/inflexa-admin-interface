import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';

import MultiUpload from '../app/multiple-upload';

import { Textarea } from '../ui/textarea';

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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneInput } from '../app/phone-input';
import { useState } from 'react';
import { FileFromApi } from '@/lib/interfaces';
import XformerlyTwitter from '@/icons/x-formerly-twitter';
import { Space } from 'antd';
import Facebook from '@/icons/facebook';
import Instagram from '@/icons/instagram';
import LinkedIn from '@/icons/linked-in';
import TikTok from '@/icons/tiktok';
import YouTube from '@/icons/youtube';

import {
  GeneralStoreFormDefaultValues,
  GeneralStoreFormSchema,
} from '@/lib/schemas';
import { Button } from '../ui/button';
import { ClipboardX, Save } from 'lucide-react';

type IStore = z.infer<typeof GeneralStoreFormSchema>;

const GeneralSettings = () => {
  const [fileList, setFileList] = useState<FileFromApi[]>([]);

  const form = useForm<IStore>({
    resolver: zodResolver(GeneralStoreFormSchema),
    defaultValues: GeneralStoreFormDefaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: IStore) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 items-start gap-4"
      >
        <div className="flex items-center gap-4 lg:col-span-3">
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            General Settings
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
            <Button type="submit" size="sm" className="h-8 gap-1">
              <Save className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Save Changes
              </span>
            </Button>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 grid gap-4">
          {/* Store Informations */}
          <Card x-chunk="storeform-04-chunk-1">
            <CardHeader>
              <CardTitle>Store Informations</CardTitle>
              <CardDescription>
                Used to identify your store in the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="storeName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Inflexa" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="currency"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary currency</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="TND" />
                        </FormControl>
                        <FormDescription>
                          The currency used to display prices in your store. as
                          well as to enable the price conversion feature.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="storeDescription"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="taxNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="TX-7891011" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="taxValue"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Value</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            step="0.01" // Set the step value to allow decimal numbers with two decimal places
                            min={0}
                            max={100}
                            onChange={(event) => {
                              const value = parseFloat(event.target.value);
                              field.onChange(
                                typeof value === 'number' && value
                              );
                            }}
                            type="number"
                            placeholder="Tax Value"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="storeLogo"
                  control={form.control}
                  render={() => (
                    <FormItem className="grid gap-1">
                      <FormLabel>Store Logo</FormLabel>
                      <FormControl>
                        <MultiUpload
                          fileList={fileList}
                          maxCount={1}
                          setFileList={setFileList}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          {/* Social Media Links */}
          <Card x-chunk="storeform-04-chunk-3">
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  name="socialMediaLinks.facebook"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Space>
                          <Facebook /> Facebook
                        </Space>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://facebook.com/inflexa"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="socialMediaLinks.x"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Space>
                          <XformerlyTwitter stroke="black" /> (formerly Twitter)
                        </Space>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://x.com/inflexa" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="socialMediaLinks.instagram"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Space>
                          <Instagram stroke="black" /> Instagram
                        </Space>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://instagram.com/inflexa"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="socialMediaLinks.linkedin"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Space>
                          <LinkedIn /> LinkedIn
                        </Space>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://linkedin.com/inflexa"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="socialMediaLinks.tiktok"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Space>
                          <TikTok /> TikTok
                        </Space>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://tiktok.com/inflexa"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="socialMediaLinks.youtube"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Space>
                          <YouTube /> Youtube
                        </Space>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://youtube.com/inflexa"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          {/* Alerts */}
        </div>
        <div className="grid gap-4">
          {/* Store Contacts */}
          <Card x-chunk="storeform-04-chunk-2">
            <CardHeader>
              <CardTitle>Store Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  name="contactEmail"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phoneNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
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
                  name="extraPhoneNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Extra Phone Number</FormLabel>
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
                  name="fax"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fax</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          {/* Repports */}
          {/* <Card x-chunk="storeform-04-chunk-4">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  name="reports.sales"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Sales Reports
                        </FormLabel>
                        <FormDescription>
                          Analyze sales trends, revenue, and customer purchasing
                          behaviors.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="reports.purchases"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Purchases Reports
                        </FormLabel>
                        <FormDescription>
                          Track purchasing activities, inventory levels, and
                          procurement costs.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="reports.products"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Products Reports
                        </FormLabel>
                        <FormDescription>
                          Monitor stock levels, product performance, and
                          profitability.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="reports.customers"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Customers Reports
                        </FormLabel>
                        <FormDescription>
                          Understand customer behavior, segmentation, and
                          lifetime value.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="reports.suppliers"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Suppliers Reports
                        </FormLabel>
                        <FormDescription>
                          Evaluate supplier performance, order tracking, and
                          relationships.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="reports.suppliers"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Employees Reports
                        </FormLabel>
                        <FormDescription>
                          Track employee performance, attendance, and
                          productivity.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card> */}
          {/* Bank Account */}
          <Card x-chunk="storeform-04-chunk-5">
            <CardHeader>
              <CardTitle>Main Bank Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  name="bankAccount.rib"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RIB</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="RIB" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="bankAccount.bankName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Bank Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="bankAccount.accountNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Account Number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          {/* Address */}
          <Card x-chunk="storeform-04-chunk-6">
            <CardHeader>
              <CardTitle>Store Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  name="address.country"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Country" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address.state"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="State" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address.city"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="City" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address.postalCode"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Postal Code" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address.street"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Street" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 lg:col-span-3 flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm" type="submit" className="h-8 gap-1">
            Save Product
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GeneralSettings;
