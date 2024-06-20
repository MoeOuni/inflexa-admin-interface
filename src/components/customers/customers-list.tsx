import { useCustomers } from "@/api";
import { CustomersTable } from "../data-tables/customers-table";

const CustomersList = () => {
  const customersData = useCustomers();

  return (
    <div>
      <CustomersTable
        data={customersData.data ? customersData.data?.data : []}
        loading={customersData.isLoading}
      />
    </div>
  );
};

export default CustomersList;
