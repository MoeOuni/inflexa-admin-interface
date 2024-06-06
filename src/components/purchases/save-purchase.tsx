import { useLocalStorageState } from "ahooks";
import PurchaseFormList from "../forms/purchase-form-list";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import PurchaseForm from "../forms/purchase-form";
import { Purchase } from "@/lib/types";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useCreatePurchase } from "@/api";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { APIPurchase } from "@/lib/interfaces";

const SavePurchase = () => {
  const createPurchase = useCreatePurchase();
  const { t } = useTranslation();
  const [purchase, setPurchase] = useLocalStorageState<Purchase>(
    "__purchase_form",
    {
      defaultValue: {
        _id: "",
        reference: "",
        supplierId: "",
        supplierLabel: "",
        createdAt: "",
        purchaseDetails: [],
        total: 0, // Add the 'total' property with a default value
      },
    }
  );
  const [steps, setSteps] = useLocalStorageState<number>(
    "__supplier_form_step",
    {
      defaultValue: 0,
    }
  );
  const { id } = useParams();

  const handleNext = async () => {
    if (!purchase?.supplierId) {
      return toast.error(t("errors.error_required_id_supplier"));
    } else if (!purchase?.reference) {
      return toast.error(t("errors.error_required_reference"));
    }
    const payload: APIPurchase = {
      reference: purchase.reference,
      supplier: purchase.supplierId,
      totalPrice: 0,
      totalWithoutTax: 0,
      totalTax: 0,
      broughtAt: dayjs(purchase.createdAt).toDate(),
    };
    await createPurchase.mutateAsync(payload);

    setSteps(1);
  };

  useEffect(() => {
    if (createPurchase.isSuccess) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return setPurchase({
        ...purchase,
        _id: createPurchase?.data?.data?.purchase?._id,
      });
    }
  }, [createPurchase?.isSuccess]);
  return (
    <>
      {!id && (
        <div>
          {steps === 0 ? (
            <div>
              <PurchaseForm
                purchase={
                  purchase ?? {
                    reference: "",
                    supplierId: "",
                    supplierLabel: "",
                    createdAt: "",
                    purchaseDetails: [],
                    total: 0,
                    _id: "",
                  }
                }
                setPurchase={setPurchase}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={createPurchase.isPending}
                >
                  {createPurchase.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <PurchaseFormList
              purchase={
                purchase ?? {
                  reference: "",
                  supplierId: "",
                  supplierLabel: "",
                  createdAt: "",
                  purchaseDetails: [],
                  total: 0,
                  _id: "",
                }
              }
              setPurchase={setPurchase}
              setSteps={setSteps}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SavePurchase;
