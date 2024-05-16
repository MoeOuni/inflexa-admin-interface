import ProvidersTable from "../data-tables/suppliers-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {};

const SuppliersList = (props: Props) => {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Suppliers</CardTitle>
        <CardDescription>
          Manage your suppliers and view your sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProvidersTable data={[]} />
      </CardContent>
    </Card>
  );
};

export default SuppliersList;
