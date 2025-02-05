import React from 'react';
import SalesDataTable from '@/components/data-tables/sales/sales-data-table';

type Props = { setSaleId: React.Dispatch<React.SetStateAction<string>> };

const SalesList = ({ setSaleId }: Props) => {
  return <SalesDataTable setSaleId={setSaleId} />;
};

export default SalesList;
