import { usePurchases } from "@/api";
import PurchasesTable from "../data-tables/purchases-table";

const PurchasesList = () => {
  const { data, isLoading } = usePurchases();

  return (
    <div>
      <PurchasesTable data={data ? data?.data : []} loading={isLoading} />
    </div>
  );
};

export default PurchasesList;
