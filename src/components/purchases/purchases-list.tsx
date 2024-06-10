import { usePurchases } from "@/api";
import PurchasesTable from "../data-tables/purchases-table";

const PurchasesList = () => {
  const { data } = usePurchases();

  return (
    <div>
      <PurchasesTable data={data ? data?.purchases : []} />
    </div>
  );
};

export default PurchasesList;
