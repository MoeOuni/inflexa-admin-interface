import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ProductDetailsCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden p-2">
    <div className="md:flex">
      <div className="md:w-1/4">
        <Skeleton className="h-[200px] w-[200px] rounded-md" />
      </div>
      <div className="md:w-3/4 p-4">
        <CardHeader className="p-0 mb-2">
          <Skeleton className="h-7 w-full" />
        </CardHeader>
        <CardContent className="p-0 space-y-2">
          <div className="flex items-center justify-between w-100 gap-4">
            <Skeleton className="h-4 w-1/5" />
            <Skeleton className="h-4 w-1/5" />
          </div>
          <Skeleton className="h-6 w-1/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </div>
    </div>
  </Card>
);

export default ProductDetailsCardSkeleton;
