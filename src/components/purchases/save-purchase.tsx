import { useLocalStorageState } from "ahooks";
import PurchaseFormList from "../forms/purchase-form-list";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import PurchaseForm from "../forms/purchase-form";
import { Purchase } from "@/lib/types";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useCreatePurchase } from "@/api";
import { useEffect } from "react";
import { ArrowRight, ClipboardX, Loader2 } from "lucide-react";
import { APIPurchase } from "@/lib/interfaces";
import BackButton from "../app/back-button";

const SavePurchase = () => {
  const createPurchase = useCreatePurchase();

  const { t } = useTranslation();
  const navigate = useNavigate();

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
      debugger;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return setPurchase({
        ...purchase,
        _id: createPurchase?.data?.data?.data?._id,
      });
    }
  }, [createPurchase?.isSuccess]);
  return (
    <>
      {!id && (
        <div>
          {steps === 0 ? (
            <div>
              <div className="flex items-center gap-4">
                <BackButton
                  onClick={() => {
                    navigate("/purchases");
                  }}
                />
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  New Purchase
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => {
                      navigate("/purchases");
                    }}
                  >
                    <ClipboardX className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Discard
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNext}
                    disabled={createPurchase.isPending}
                    className="h-8 gap-1"
                  >
                    {createPurchase.isPending ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Next
                    </span>
                  </Button>
                </div>
              </div>
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
