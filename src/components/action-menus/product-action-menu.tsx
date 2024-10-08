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
        <DropdownMenuLabel>{t("product_menu_actions.name")}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          <span>{t("product_menu_actions.edit")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4" />
          <span>{t("product_menu_actions.delete")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Box className="mr-2 h-4 w-4" />
          <span>{t("product_menu_actions.view_details")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Tag className="mr-2 h-4 w-4" />
          <span>{t("product_menu_actions.apply_discount")}</span>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Layers className="mr-2 h-4 w-4" />
            <span>{t("product_menu_actions.variants")}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Layers className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.add_variant")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Layers className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.edit_variant")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Layers className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.delete_variant")}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Box className="mr-2 h-4 w-4" />
            <span>{t("product_menu_actions.stock")}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Box className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.view_levels")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Box className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.reorder")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Box className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.adjust")}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Tag className="mr-2 h-4 w-4" />
            <span>{t("product_menu_actions.pricing")}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Tag className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.update")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Tag className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.view_pricing")}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <BarChart className="mr-2 h-4 w-4" />
            <span>{t("product_menu_actions.analytics_reports")}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <BarChart className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.sales_reports")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.inventory_reports")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.revenue_analysis")}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>{t("product_menu_actions.purchase_history")}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.view_purchase_history")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.order_again")}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FileText className="mr-2 h-4 w-4" />
            <span>{t("product_menu_actions.order_history")}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.view_orders_history")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>{t("product_menu_actions.export_orders")}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
