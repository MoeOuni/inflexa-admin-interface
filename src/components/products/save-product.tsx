import { useProductDetails } from "@/api";
import ProductForm from "../forms/product-form";
import Spin from "../app/spin";

const SaveProduct = () => {
  const { data, isLoading } = useProductDetails();

  if (isLoading) {
    return <Spin />;
  }


  return (
      <ProductForm product={data?.data}/>
  );
};

export default SaveProduct;
