import { useProductDetails } from "@/api";
import ProductForm from "@/components/forms/product-form";
import Spin from "@/components/app/spin";

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
