import {
  Edit,
  Trash,
  Box,
  MoreHorizontal,
  Tag,
  BarChart,
  Layers,
  ShoppingCart,
  FileText,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useTranslation } from 'react-i18next';
import { Product } from '@/lib/interfaces';

type Props = {
  product: Product;
};

export function ProductActionMenu({ product }: Props) {
  const { t } = useTranslation();

// const navigate = useNavigate();

const handleEdit = () => {
    window.open(`/inventory/product/${product?._id}`, '_blank');
};
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">{t('open_menu')}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Product Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit Product</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete Product</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Box className="mr-2 h-4 w-4" />
          <span>View Product Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Tag className="mr-2 h-4 w-4" />
          <span>Apply Discount</span>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Layers className="mr-2 h-4 w-4" />
            <span>Variant Management</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Layers className="mr-2 h-4 w-4" />
                <span>Add Variant</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Layers className="mr-2 h-4 w-4" />
                <span>Edit Variants</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Layers className="mr-2 h-4 w-4" />
                <span>Delete Variant</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Box className="mr-2 h-4 w-4" />
            <span>Stock Management</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Box className="mr-2 h-4 w-4" />
                <span>View Stock Levels</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Box className="mr-2 h-4 w-4" />
                <span>Reorder Stock</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Box className="mr-2 h-4 w-4" />
                <span>Stock Adjustment</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Tag className="mr-2 h-4 w-4" />
            <span>Pricing Actions</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Tag className="mr-2 h-4 w-4" />
                <span>Update Pricing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Tag className="mr-2 h-4 w-4" />
                <span>View Price History</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <BarChart className="mr-2 h-4 w-4" />
            <span>Analytics and Reports</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <BarChart className="mr-2 h-4 w-4" />
                <span>Sales Report</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart className="mr-2 h-4 w-4" />
                <span>Inventory Report</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart className="mr-2 h-4 w-4" />
                <span>Revenue Analysis</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Purchase History</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>View Purchase History</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Order Again</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FileText className="mr-2 h-4 w-4" />
            <span>Orders History</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>View Orders History</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Export Orders</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
