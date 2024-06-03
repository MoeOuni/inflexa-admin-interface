import SupplierForm from "../forms/supplier-form";
import { useSupplierById } from "@/api";
import { useParams } from "react-router-dom";



const SaveSupplier = () => {
  const supplierById = useSupplierById();
  const {id} = useParams();
  return (
    <>
      {supplierById.isLoading && <div>Loading...</div>}
      {supplierById.isSuccess && (
        <SupplierForm
          editValues={
            supplierById?.data ? supplierById?.data?.supplier : undefined
          }
        />
      )}
      {!id && <SupplierForm editValues={undefined} />}
    </>
  );
};

export default SaveSupplier;
