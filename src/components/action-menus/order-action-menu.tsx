import {
  Edit,
  Trash,
  Box,
  MoreHorizontal,
  Tag,
  Archive,
  RefreshCw,
  FileDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useTranslation } from 'react-i18next';
import { Order } from '@/lib/interfaces';
import { message } from 'antd';

type Props = {
  order: Order;
};

export function OrderActionMenu({ order }: Props) {
  const { t } = useTranslation();

  const handleDelete = () => {
    // Implement deletion logic here
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
      message.info('Order PDF not available');
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">{t('open_menu')}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit Order</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleDelete}>
          <Trash className="mr-2 h-4 w-4" />
          <span>Cancel Order</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleViewDetails}>
          <Box className="mr-2 h-4 w-4" />
          <span>View Order Details</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleApplyDiscount}>
          <Tag className="mr-2 h-4 w-4" />
          <span>Apply Discount</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleRefund}>
          <RefreshCw className="mr-2 h-4 w-4" />
          <span>Issue Refund</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleArchive}>
          <Archive className="mr-2 h-4 w-4" />
          <span>Archive Order</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleArchive}>
          <FileDown className="mr-2 h-4 w-4" />
          <span>Export Order</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
