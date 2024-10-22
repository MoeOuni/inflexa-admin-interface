import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';

import MultiUpload from '@/components/app/multiple-upload';

import { ProductSchema } from '@/lib/schemas';
import { useStore } from '@/contexts/store-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { APIUpdateProduct, FileFromApi, Product } from '@/lib/interfaces';
import { ProductStatus } from '@/components/app/status-views/product';
import { Tag } from 'antd';
import { useCategories, useUpdateProduct } from '@/api';
import { Category, SubCategory } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

type ProductFormType = z.infer<typeof ProductSchema>;

type ProductFormProps = {
  product?: Product;
};

const ProductForm = ({ product }: ProductFormProps) => {
  const [fileList, setFileList] = useState<FileFromApi[]>(
    product?.images
      ? product?.images.map((image) => {
          return {
            baseDir: image.url,
            fileName: image.altText,
            fileExtension: image.altText.split('.').pop() || '',
            originalName: image.altText,
          };
        })
      : [],
  );

  const { currency } = useStore();

  const updateProduct = useUpdateProduct();

  const categories = useCategories();

  const form = useForm<ProductFormType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      reference: product?.reference || '',
      category: {
        categoryId: product?.category?.categoryId || '',
        categoryName: product?.category?.categoryName || '',
        subCategoryId: product?.category?.subCategoryId || '',
        subCategoryName: product?.category?.subCategoryName || '',
      },
      name: product?.name || '',
      description: product?.description || '',
      stock: {
        initialStock: product?.stock?.initialStock || 0,
        currentStock: product?.stock?.currentStock || 0,
        soldStock: product?.stock?.soldStock || 0,
        damagedStock: product?.stock?.damagedStock || 0,
        returnedStock: product?.stock?.returnedStock || 0,
        warehouseLocation: product?.stock?.warehouseLocation || '',
        unit: product?.stock?.unit || '',
      },
      price: {
        listPrice:
          product?.price?.listPrice ||
          Number(
            product?.purchaseInvoice?.[product?.purchaseInvoice?.length - 1]
              ?.purchasePrice,
          ) +
            Number(
              product?.purchaseInvoice?.[product?.purchaseInvoice?.length - 1]
                ?.taxes?.taxAmount,
            ) ||
          0,
        discountPrice:
          product?.price?.discountPrice ||
          Number(
            product?.purchaseInvoice?.[product?.purchaseInvoice?.length - 1]
              ?.purchasePrice,
          ) +
            Number(
              product?.purchaseInvoice?.[product?.purchaseInvoice?.length - 1]
                ?.taxes?.taxAmount,
            ) ||
          0,
        currency: product?.price?.currency || currency.symbol,
      },
      status: {
        isAvailable: product?.status?.isAvailable || false,
        isActive: product?.status?.isActive || false,
        isFeatured: product?.status?.isFeatured || false,
        featureId: product?.status?.featureId || '',
        needsReview: product?.status?.needsReview || false,
      },
    },
    mode: 'onChange',
  });

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const onSubmit = async (data: ProductFormType) => {
    const tempPayload: APIUpdateProduct = {
      ...data,
      images: fileList?.map((file) => {
        return {
          url: file.baseDir,
          altText: file.fileName,
        };
      }),
    };

    await updateProduct.mutateAsync({
      id: product?._id || '',
      product: tempPayload,
    });
  };

  useEffect(() => {
    if (categories?.isSuccess && product?.category?.categoryId) {
      setSubCategories(
        categories?.data?.data?.find(
          (elem: Category) => elem?._id === product?.category?.categoryId,
        )?.subCategories || [],
      );
    }
  }, [
    categories?.data?.data,
    categories?.isSuccess,
    product?.category?.categoryId,
  ]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid flex-1 auto-rows-max gap-4"
      >
        {/* Top Side Menu */}
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {product?.name || 'New Product'}
          </h1>
          <div className="ml-auto sm:ml-0">
            <ProductStatus status={product?.status} />
          </div>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button type="submit" size="sm" className="h-8 gap-1">
              Save Product
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid gap-4 md:grid-cols-[1fr_340px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Provide detailed information about the product, including its
                  features, specifications, and any relevant details that
                  customers should know.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <Label>
                    Reference: <Tag color="geekblue">{product?.reference}</Tag>
                  </Label>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="name"
                            type="text"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            id="description"
                            className="min-h-32"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                  Manage the stock levels and pricing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 grid-cols-2">
                  <FormField
                    control={form.control}
                    name="stock.initialStock"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel htmlFor="initial-stock">
                          Initial Stock
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="initial-stock"
                            type="number"
                            step="0.01"
                            onChange={(event) => {
                              const value = parseFloat(event.target.value);
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
                  <FormField
                    control={form.control}
                    name="stock.currentStock"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel htmlFor="current-stock">
                          Current Stock
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="current-stock"
                            type="number"
                            step="0.01"
                            onChange={(event) => {
                              const value = parseFloat(event.target.value);
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
                  <FormField
                    control={form.control}
                    name="stock.soldStock"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel htmlFor="sold-stock">Sold Stock</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="sold-stock"
                            type="number"
                            disabled
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock.damagedStock"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel htmlFor="damaged-stock">
                          Damaged Stock
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="damaged-stock"
                            type="number"
                            step="0.01"
                            onChange={(event) => {
                              const value = parseFloat(event.target.value);
                              field.onChange(
                                typeof value === 'number' && value,
                              );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock.returnedStock"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel htmlFor="returned-stock">
                          Returned Stock
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="returned-stock"
                            type="number"
                            step="0.01"
                            onChange={(event) => {
                              const value = parseFloat(event.target.value);
                              field.onChange(
                                typeof value === 'number' && value,
                              );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock.warehouseLocation"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel htmlFor="warehouse-location">
                          Warehouse Location
                        </FormLabel>
                        <FormControl>
                          <Input {...field} id="warehouse-location" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock.unit"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel htmlFor="unit">Unit</FormLabel>
                        <FormControl>
                          <Input {...field} id="unit" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Price</CardTitle>
                <CardDescription>Manage pricing and discounds.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 grid-cols-2">
                  <Label>
                    Purchase Price:{' '}
                    <Tag color="geekblue" className="font-semibold">
                      {
                        product?.purchaseInvoice?.[
                          product?.purchaseInvoice?.length - 1
                        ]?.purchasePrice
                      }{' '}
                      {currency.symbol}
                    </Tag>
                  </Label>
                  <Label>
                    Currency:{' '}
                    <Tag color="geekblue" className="font-semibold">
                      {currency.symbol}
                    </Tag>
                  </Label>
                  <Label>
                    {
                      product?.purchaseInvoice?.[
                        product?.purchaseInvoice?.length - 1
                      ]?.taxes?.taxType
                    }{' '}
                    (Percentage) :{' '}
                    <Tag color="geekblue" className="font-semibold">
                      {
                        product?.purchaseInvoice?.[
                          product?.purchaseInvoice?.length - 1
                        ]?.taxes?.taxRate
                      }{' '}
                      %
                    </Tag>
                  </Label>
                  <Label>
                    {
                      product?.purchaseInvoice?.[
                        product?.purchaseInvoice?.length - 1
                      ]?.taxes?.taxType
                    }{' '}
                    (Currency):{' '}
                    <Tag color="red" className="font-semibold">
                      {product?.purchaseInvoice?.[
                        product?.purchaseInvoice?.length - 1
                      ]?.taxes?.taxAmount?.toFixed(2) || 0}{' '}
                      {currency.symbol}
                    </Tag>
                  </Label>
                  <FormField
                    control={form.control}
                    name="price.listPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="selling-price">
                          Selling Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="selling-price"
                            type="number"
                            step="0.01"
                            onChange={(event) => {
                              const value = parseFloat(event.target.value);
                              field.onChange(
                                typeof value === 'number' && value,
                              );
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          The price at which you are selling the product. <br />
                          The minimum price is the purchase price plus the tax
                          which is{' '}
                          <Tag color="blue">
                            {(
                              Number(
                                product?.purchaseInvoice?.[
                                  product?.purchaseInvoice?.length - 1
                                ]?.purchasePrice,
                              ) +
                              Number(
                                product?.purchaseInvoice?.[
                                  product?.purchaseInvoice?.length - 1
                                ]?.taxes?.taxAmount,
                              )
                            )?.toFixed(2)}{' '}
                            {currency?.symbol}
                          </Tag>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price.discountPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="discount-price">
                          Discount Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="discount-price"
                            type="number"
                            step="0.01"
                            onChange={(event) => {
                              const value = parseFloat(event.target.value);
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
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="status.isAvailable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            className="mt-[2px]"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="leading-none">
                          <FormLabel>
                            <Tag className="mb-1" color="green">
                              Available
                            </Tag>
                          </FormLabel>
                          <FormDescription>
                            Indicates whether the item is currently available.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status.isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            className="mt-[2px]"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="leading-none">
                          <FormLabel>
                            <Tag className="mb-1" color="cyan">
                              Active
                            </Tag>
                          </FormLabel>
                          <FormDescription>
                            Determines if the item is being displayed on the
                            online store.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status.isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            className="mt-[2px]"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="leading-none">
                          <FormLabel>
                            <Tag className="mb-1" color="gold">
                              Featured
                            </Tag>
                          </FormLabel>
                          <FormDescription>
                            Marks the item as featured, highlighting it
                            prominently in the online store.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 ">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Parent Category</Label>
                    <Select
                      value={form.getValues('category.categoryId')}
                      onValueChange={(e) => {
                        const tempSelectCategory = categories.data?.data?.find(
                          (elem: Category) => elem?._id === e,
                        );
                        form.setValue('category.categoryId', e);
                        form.setValue(
                          'category.categoryName',
                          tempSelectCategory?.name || 'N/Q',
                        );
                        setSubCategories(
                          tempSelectCategory?.subCategories || [],
                        );
                      }}
                    >
                      <SelectTrigger id="category" aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.data?.data?.map((category: Category) => (
                          <SelectItem
                            key={category._id}
                            value={category?._id || 'N/Q'}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">Sub-Category (optional)</Label>
                    <Select
                      defaultValue={product?.category?.subCategoryId}
                      onValueChange={(e) => {
                        const tempSelectSubCategory = subCategories?.find(
                          (elem: SubCategory) => elem?._id === e,
                        );

                        form.setValue('category.subCategoryId', e);
                        form.setValue(
                          'category.subCategoryName',
                          tempSelectSubCategory?.name || 'N/Q',
                        );
                      }}
                    >
                      <SelectTrigger
                        id="subcategory"
                        aria-label="Select subcategory"
                      >
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {subCategories?.map((subCategory: SubCategory) => (
                          <SelectItem
                            key={subCategory._id}
                            value={subCategory._id || 'N/Q'}
                          >
                            {subCategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Upload clear, high-quality images from multiple angles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MultiUpload
                  fileList={fileList}
                  setFileList={setFileList}
                  maxCount={8}
                />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Mark this product as archived if it is no longer available.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button size="sm" variant="secondary">
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
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

export default ProductForm;
