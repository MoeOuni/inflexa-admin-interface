import { useSuppliers } from "@/api";
import { ComboBox } from "../app/combo-box";
import { Purchase, Supplier } from "@/lib/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import PurchaseDetailsList from "../purchases/purchase-details-list";
import { useStore } from "@/contexts/store-context";

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
    <div className="grid md:grid-cols-[350px_1fr] gap-8  mx-auto ">
      <PurchaseDetailsList purchase={purchase} currency={currency} />
      <div className="w-full max-w-md flex flex-col gap-4 pb-4">
        <div className="space-y-2">
          <Label>Supplier</Label>
          <ComboBox
            value={purchase?.supplierId}
            onChange={handlePurchaseSupplierChange}
            placeholder="supplier"
            items={
              suppliers?.status !== "success"
                ? []
                : suppliers?.data?.suppliers?.map((supplier: Supplier) => {
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
      </div>
    </div>
  );
};

export default PurchaseForm;
