import SupplierForm from "../forms/supplier-form";
import { useSupplierById } from "@/api";
import { useParams } from "react-router-dom";

const SaveSupplier = () => {
  const supplierById = useSupplierById();
  const { id } = useParams();

  console.log(supplierById.data);
  return (
    <>
      {supplierById.isLoading && <div>Loading...</div>}
      {supplierById.isSuccess && (
        <SupplierForm
          editValues={supplierById?.data ? supplierById?.data?.data : undefined}
        />
      )}
      {!id && <SupplierForm editValues={undefined} />}
    </>
  );
};

export default SaveSupplier;
