import InfiniteVariantManagerForm from '@/components/forms/infinite-variants-manager-form';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BackButton from '@/components/app/back-button';

const ProductVariants = () => {
  return (
    <>
      <BackButton />
      <Card className="my-3" x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle>Variants</CardTitle>
          <CardDescription>Create and manage product variants.</CardDescription>
        </CardHeader>
        <CardContent>
          <InfiniteVariantManagerForm />
        </CardContent>
      </Card>
    </>
  );
};

export default ProductVariants;
