import { useCustomers } from "@/api";
import { CustomersTable } from "../data-tables/customers-table";

const CustomersList = () => {
  const customersData = useCustomers();

  console.log(customersData.data);
  return (
    <div>
      <CustomersTable
        data={customersData.data ? customersData.data?.customers : []}
      />
    </div>
  );
};

export default CustomersList;
