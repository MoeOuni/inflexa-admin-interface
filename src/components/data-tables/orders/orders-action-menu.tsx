import {
  Edit,
  Trash,
  Box,
  MoreHorizontal,
  Tag,
  Archive,
  RefreshCw,
  FileDown,
  Layers,
  Truck,
  CheckCircle,
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
import { Order } from '@/lib/interfaces';
import { useUpdateOrderStatus } from '@/api';
import { GearIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

type Props = {
  readonly order: Order;
};

export function OrdersActionMenu({ order }: Props) {
  const { t } = useTranslation();

  const orderStatus = useUpdateOrderStatus();

  const handleCancel = async () => {
    // Implement deletion logic here
    const params = {
      id: order._id,
      status: 'cancelled',
    };

    await orderStatus.mutateAsync(params);
  };

  const handleProcess = async () => {
    // Implement process logic here
    const params = {
      id: order._id,
      status: 'processed',
    };

    await orderStatus.mutateAsync(params);
  };

  const handleShip = async () => {
    // Implement ship logic here
    const params = {
      id: order._id,
      status: 'shipped',
    };

    await orderStatus.mutateAsync(params);
  };

  const handleDeliver = async () => {
    // Implement deliver logic here
    const params = {
      id: order._id,
      status: 'delivered',
    };

    await orderStatus.mutateAsync(params);
  };

  const handleViewDetails = () => {
    // Implement view details logic here
    if (order?.orderPdf) {
      window.open(
        `${import.meta.env.VITE_API_URL}/${order?.orderPdf}`,
        '_blank'
      );
    } else {
      // Implement error handling logic here
      toast.info('Order PDF not available');
    }
  };

  const handleApplyDiscount = () => {
    // Implement discount application logic here
  };

  const handleArchive = () => {
    // Implement archive logic here
  };

  const handleRefund = () => {
    // Implement refund logic here
  };

  const handleExport = async () => {
    // Implement export logic here
    if (order?.orderPdf) {
      const url = `${import.meta.env.VITE_API_URL}/${order?.orderPdf}`;
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = order?.orderPdf?.split('uploads/')[1];
      link.click();
    } else {
      // Implement error handling logic here
      toast.info('Order PDF not available');
    }
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
        <DropdownMenuLabel>{t("order_menu_actions.name")}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          <span>{t("order_menu_actions.edit")}r</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleViewDetails}>
          <Box className="mr-2 h-4 w-4" />
          <span>{t("order_menu_actions.view_details")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleApplyDiscount}>
          <Tag className="mr-2 h-4 w-4" />
          <span>{t("order_menu_actions.apply_discount")}t</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleRefund}>
          <RefreshCw className="mr-2 h-4 w-4" />
          <span>{t("order_menu_actions.issue_refund")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleArchive}>
          <Archive className="mr-2 h-4 w-4" />
          <span>{t("order_menu_actions.archive")}r</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleExport}>
          <FileDown className="mr-2 h-4 w-4" />
          <span>{t("order_menu_actions.export")}</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Layers className="mr-2 h-4 w-4" />
            <span>{t("order_menu_actions.status")}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={handleCancel}
                disabled={order.status === 'cancelled'}
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>{t("order_menu_actions.cancel")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleProcess}
                disabled={order.status === 'processed'}
              >
                <GearIcon className="mr-2 h-4 w-4" />
                <span>{t("order_menu_actions.process")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleShip}
                disabled={order.status === 'shipped'}
              >
                <Truck className="mr-2 h-4 w-4" />
                <span>{t("order_menu_actions.ship")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeliver}
                disabled={order.status === 'delivered'}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>{t("order_menu_actions.deliver")}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
