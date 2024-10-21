import { Skeleton } from '@/components/ui/skeleton.tsx';

const VariantItemSkeleton: React.FC = () => (
  <div className="mb-3">
    <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,auto,auto] gap-2 items-end mb-2">
      <Skeleton className="h-6 w-6" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-full" />
      </div>
      <Skeleton className="h-9 w-9" />
      <Skeleton className="h-9 w-9" />
    </div>
  </div>
);

export default VariantItemSkeleton;
