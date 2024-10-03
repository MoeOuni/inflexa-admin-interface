// @ts-ignore
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { File, ListFilter } from 'lucide-react';
import { ProductsTable } from '../data-tables/products-table';
import { useProductsPagination } from '@/api';

const ListProducts = () => {
  const [params, setParams] = useState<{
    filters?: string;
    search?: string;
    preset?: string;
  }>({
    filters: '',
    search: '',
    preset: 'ALL',
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const products = useProductsPagination({
    pagination,
    ...params,
  });

  const handleFilter = (filter: string, checked: boolean) => {
    if (checked === true) {
      setParams({
        filters: `&status.${filter}=true`,
        search: params.search,
      });
    } else {
      setParams({
        filters: '',
        search: params.search,
      });
    }
  };

  return (
    <div>
      <Tabs
        onValueChange={(e) =>
          setParams({
            ...params,
            preset: e,
          })
        }
        value={params.preset}
      >
        <div className="flex items-center gap-2 flex-col md:flex-row">
          <TabsList defaultValue={'ALL'}>
            <TabsTrigger value="ALL">All</TabsTrigger>
            <TabsTrigger value="AVAILABLE">In Stock</TabsTrigger>
            <TabsTrigger value="OUT_OF_STOCK">Out of Stock</TabsTrigger>
            <TabsTrigger value="ARCHIVED">Archived</TabsTrigger>
          </TabsList>
          <div className="md:ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={params?.filters === '&status.isActive=true'}
                  onCheckedChange={(e) => handleFilter('isActive', e)}
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={params?.filters === '&status.isAvailable=true'}
                  onCheckedChange={(e) => handleFilter('isAvailable', e)}
                >
                  Available
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={params?.filters === '&status.isFeatured=true'}
                  onCheckedChange={(e) => handleFilter('isFeatured', e)}
                >
                  Featured
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={params?.filters === '&status.needsReview=true'}
                  onCheckedChange={(e) => handleFilter('needsReview', e)}
                >
                  Needs Review
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
          </div>
        </div>

        <Card className="my-3" x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductsTable
              loading={products.isPending}
              data={products?.data?.data?.data ?? []}
              pageCount={parseInt(products?.data?.headers['x-total-pages'])}
              pagination={pagination}
              setPagination={setPagination}
            />
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default ListProducts;
