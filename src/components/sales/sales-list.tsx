import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { SalesTable } from '../data-tables/sales-table';
// import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/api';

type Props = { setSaleId: React.Dispatch<React.SetStateAction<string>> };

const SalesList = ({ setSaleId }: Props) => {
  // const navigate = useNavigate();

  const sales = useOrders({
    params: {
      status: "delivered"
    },
  });

  useEffect(() => {
    if (sales?.data?.data?.length > 0) {
      setSaleId(sales.data.data[0]._id);
    }
  }, [sales.status]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales List</CardTitle>
      </CardHeader>
      <CardContent>
        <SalesTable data={sales?.data?.data || []} setSaleId={setSaleId} />
      </CardContent>
    </Card>
  );
};

export default SalesList;
