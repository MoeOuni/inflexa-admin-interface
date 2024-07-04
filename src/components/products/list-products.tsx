import React from 'react';
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
import { useProducts } from '@/api';

const ListProducts = () => {
  const products = useProducts();

  const [filter, setFilter] = React.useState({
    isAvailable: true,
    isActive: true,
    isFeatured: true,
    needsReview: true,
  });

  return (
    <div>
      <Tabs onValueChange={(e) => console.log(e)}>
        <div className="flex items-center gap-2 flex-col md:flex-row">
          <TabsList defaultValue={'all'}>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">In Stock</TabsTrigger>
            <TabsTrigger value="draft">Out of Stock</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
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
                  checked={filter?.isActive}
                  onCheckedChange={(e) =>
                    setFilter({
                      ...filter,
                      isActive: e,
                    })
                  }
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter?.isAvailable}
                  onCheckedChange={(e) =>
                    setFilter({
                      ...filter,
                      isAvailable: e,
                    })
                  }
                >
                  Available
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter?.isFeatured}
                  onCheckedChange={(e) =>
                    setFilter({
                      ...filter,
                      isFeatured: e,
                    })
                  }
                >
                  Featured
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter?.needsReview}
                  onCheckedChange={(e) =>
                    setFilter({
                      ...filter,
                      needsReview: e,
                    })
                  }
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
            <ProductsTable loading={true} data={products?.data?.data ?? []} />
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default ListProducts;
