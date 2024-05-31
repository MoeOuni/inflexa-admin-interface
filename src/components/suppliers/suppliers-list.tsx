import { useSuppliers } from "@/api";
import ProvidersTable from "../data-tables/suppliers-table";

type Props = {};

const SuppliersList = (props: Props) => {
  const suppliers = useSuppliers();
  return (
  <ProvidersTable data={suppliers?.data?.suppliers ?? []} />
  );
};

export default SuppliersList;
