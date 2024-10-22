import { useSuppliers } from "@/api";
import { ComboBox } from "@/components/app/combo-box";
import { Purchase, Supplier } from "@/lib/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import PurchaseDetailsList from "@/components/modules/purchases/purchase-details-list";
import { useStore } from "@/contexts/store-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  purchase: Purchase;
  setPurchase: (purchase: Purchase) => void;
};

const PurchaseForm = ({ purchase, setPurchase }: Props) => {
  const { currency } = useStore();
  const suppliers = useSuppliers({ status: "ACTIVE" });

  const handlePurchaseSupplierChange = (value: string, label?: string) => {
    setPurchase({ ...purchase, supplierId: value, supplierLabel: label });
  };

  const handlePurchaseDateChange = (value: string) => {
    setPurchase({ ...purchase, createdAt: value });
  };

  return (
    <div className="grid md:grid-cols-[350px_1fr] gap-4  mx-auto py-3">
      <PurchaseDetailsList purchase={purchase} currency={currency} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>General Informations (Required)</CardTitle>
        </CardHeader>
        <CardContent className="grid xlg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label>Supplier</Label>
            <ComboBox
              value={purchase?.supplierId}
              onChange={handlePurchaseSupplierChange}
              placeholder="supplier"
              items={
                suppliers?.status !== "success"
                  ? []
                  : suppliers?.data?.data?.map((supplier: Supplier) => {
                      return {
                        label: supplier?.companyName,
                        value: supplier?._id,
                      };
                    })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              id="date"
              type="date"
              value={purchase?.createdAt}
              onChange={(e) => handlePurchaseDateChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Reference</Label>
            <Input
              id="reference"
              placeholder="Enter reference"
              value={purchase.reference}
              onChange={(e) =>
                setPurchase({ ...purchase, reference: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseForm;
