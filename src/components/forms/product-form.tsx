// import { PlusCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
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
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
// import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import MultiUpload from '../app/multiple-upload';

import { ProductSchema } from '@/lib/schemas';
import { useStore } from '@/contexts/store-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import BackButton from '../app/back-button';
import { Product } from '@/lib/interfaces';

type ProductFormType = z.infer<typeof ProductSchema>;

type ProductFormProps = {
  product?: Product;
};

const ProductForm = ({product}: ProductFormProps) => {
  const navigate = useNavigate();
  // const updateProduct = useUpdateProduct();
  const { currency } = useStore();

  const form = useForm<ProductFormType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      reference: '',
      category: {
        categoryId: '',
        categoryName: '',
        subCategoryId: '',
        subCategoryName: '',
      },
      name: '',
      description: '',
      stock: {
        initialStock: 0,
        currentStock: 0,
        soldStock: 0,
        damagedStock: 0,
        returnedStock: 0,
        warehouseLocation: '',
        unit: '',
      },
      variants: [
        {
          title: '',
          reference: '',
          otherAttributes: '',
          stock: {
            initialStock: 0,
            currentStock: 0,
            soldStock: 0,
            damagedStock: 0,
            returnedStock: 0,
          },
          price: {
            currency: currency.symbol,
            listPrice: 0,
            discountPrice: 0,
          },
        },
      ],
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: ProductFormType) => {
    // await updateProduct.mutateAsync(data);

    console.log(data);
  };

  const handleReturnNavigate = () => {
    navigate(`/inventory`);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid flex-1 auto-rows-max gap-4"
      >
        {/* Top Side Menu */}
        <div className="flex items-center gap-4">
          <BackButton onClick={handleReturnNavigate} />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {product?.name || 'New Product'}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            [Product STATUS]
          </Badge>
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
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
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
                  <div className="grid gap-3">
                    <Label htmlFor="initial-stock">Initial Stock</Label>
                    <Input
                      id="initial-stock"
                      type="number"
                      defaultValue={200}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="current-stock">Current Stock</Label>
                    <Input
                      id="current-stock"
                      type="number"
                      defaultValue={200}
                    />
                  </div>
                  <div className="grid gap-3">
                  <Label htmlFor="sold-stock">Sold Stock</Label>
                    <Input
                      id="sold-stock"
                      type="number"
                      defaultValue={200}
                    />
                  </div>
                  <div className="grid gap-3">
                  <Label htmlFor="damaged-stock">Damaged Stock</Label>
                    <Input
                      id="damaged-stock"
                      type="number"
                      defaultValue={200}
                    />
                  </div>
                  <div className="grid gap-3">
                  <Label htmlFor="warehouse-location">Warehouse Location</Label>
                    <Input
                      id="warehouse-location"
                    />
                  </div>
                  <div className="grid gap-3">
                  <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Price</CardTitle>
                <CardDescription>
                  Manage pricing and discounds.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 grid-cols-2">
                <div className="grid gap-3">
                    <Label>Selling Price ({currency.symbol})</Label>
                    <Input type="number" defaultValue={99.99} />
                  </div>
                  <div className="grid gap-3">
                    <Label>Discount Price ({currency.symbol})</Label>
                    <Input type="number" defaultValue={89.99} />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* <Card x-chunk="dashboard-07-chunk-6">
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>
                  Variants are different versions of the same product. For
                  example a T-shirt in different sizes or colors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">REF</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="w-[100px]">Variant</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">GGPC-001</TableCell>
                      <TableCell>
                        <Label htmlFor="stock-1" className="sr-only">
                          Stock
                        </Label>
                        <Input id="stock-1" type="number" defaultValue="100" />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor="price-1" className="sr-only">
                          Price
                        </Label>
                        <Input
                          id="price-1"
                          type="number"
                          defaultValue="99.99"
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup
                          type="single"
                          defaultValue="s"
                          variant="outline"
                        >
                          <ToggleGroupItem value="s">S</ToggleGroupItem>
                          <ToggleGroupItem value="m">M</ToggleGroupItem>
                          <ToggleGroupItem value="l">L</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">GGPC-002</TableCell>
                      <TableCell>
                        <Label htmlFor="stock-2" className="sr-only">
                          Stock
                        </Label>
                        <Input id="stock-2" type="number" defaultValue="143" />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor="price-2" className="sr-only">
                          Price
                        </Label>
                        <Input
                          id="price-2"
                          type="number"
                          defaultValue="99.99"
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup
                          type="single"
                          defaultValue="m"
                          variant="outline"
                        >
                          <ToggleGroupItem value="s">S</ToggleGroupItem>
                          <ToggleGroupItem value="m">M</ToggleGroupItem>
                          <ToggleGroupItem value="l">L</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">GGPC-003</TableCell>
                      <TableCell>
                        <Label htmlFor="stock-3" className="sr-only">
                          Stock
                        </Label>
                        <Input id="stock-3" type="number" defaultValue="32" />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor="price-3" className="sr-only">
                          Stock
                        </Label>
                        <Input
                          id="price-3"
                          type="number"
                          defaultValue="99.99"
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup
                          type="single"
                          defaultValue="s"
                          variant="outline"
                        >
                          <ToggleGroupItem value="s">S</ToggleGroupItem>
                          <ToggleGroupItem value="m">M</ToggleGroupItem>
                          <ToggleGroupItem value="l">L</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button size="sm" variant="ghost" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Variant
                </Button>
              </CardFooter>
            </Card> */}
              <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category" aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">Subcategory (optional)</Label>
                    <Select>
                      <SelectTrigger
                        id="subcategory"
                        aria-label="Select subcategory"
                      >
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t-shirts">T-Shirts</SelectItem>
                        <SelectItem value="hoodies">Hoodies</SelectItem>
                        <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
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
                <MultiUpload />
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
          <Button size="sm">Save Product</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
