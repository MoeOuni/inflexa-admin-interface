import {
  Box,
  MoreHorizontal,
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
import { ISale } from '@/lib/interfaces';
import { toast } from 'sonner';

type Props = {
  sale: ISale;
};

export function SaleActionMenu({ sale }: Props) {
  const { t } = useTranslation();

  const handleViewDetails = () => {
    // Implement view details logic here
    if (sale?.invoicePdf) {
      window.open(
        `${import.meta.env.VITE_API_URL}/${sale?.invoicePdf}`,
        '_blank'
      );
    } else {
      // Implement error handling logic here
      toast.info('Invoice is not available');
    }
  };

  const handleArchive = () => {
    // Implement archive logic here
  };

  const handleRefund = () => {
    // Implement refund logic here
  };

  const handleExport = async () => {
    // Implement export logic here
    if (sale?.invoicePdf) {
      const url = `${import.meta.env.VITE_API_URL}/${sale?.invoicePdf}`;
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = sale?.invoicePdf?.split('uploads/')[1];
      link.click();
    } else {
      // Implement error handling logic here
      toast.info('Invoice is not available.');
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
        <DropdownMenuLabel>Sale Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleViewDetails}>
          <Box className="mr-2 h-4 w-4" />
          <span>View Invoice Details</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleRefund}>
          <RefreshCw className="mr-2 h-4 w-4" />
          <span>Issue Refund</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleArchive}>
          <Archive className="mr-2 h-4 w-4" />
          <span>Archive Sale</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleExport}>
          <FileDown className="mr-2 h-4 w-4" />
          <span>Export Invoice</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
