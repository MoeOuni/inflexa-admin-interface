// @ts-ignore
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

const OrderReviewSkeleton = () => {
  return (
    <div className="flex flex-col p-7 min-h-[600px]">
      <Loader2 className="mr-2 h-5 w-5 animate-spin mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-[60%]" />
        <Skeleton className="h-5 w-[25%]" />
      </div>
      <Skeleton className="h-5 w-[50%] my-2" />
      <Separator />
      <div className="grid gap-2 my-4">
        <Skeleton className="h-8 w-[50%]" />
        <Skeleton className="h-5 w-[100%]" />
        <Skeleton className="h-5 w-[100%]" />
        <Skeleton className="h-5 w-[100%]" />
      </div>
      <Separator />
      <div className="grid gap-2 my-4">
        <Skeleton className="h-5 w-[100%]" />
        <Skeleton className="h-5 w-[100%]" />
        <Skeleton className="h-5 w-[100%]" />
        <Skeleton className="h-5 w-[100%]" />
      </div>
      <Separator />
      <div className="grid gap-2 my-4 grid-cols-2">
        <Skeleton className="h-6 w-[70%]" />
        <Skeleton className="h-6 w-[70%]" />
        <Skeleton className="h-20 w-[100%]" />
        <Skeleton className="h-20 w-[100%]" />
      </div>
      <Separator />
      <div className="grid gap-2 my-4 ">
        <Skeleton className="h-8 w-[50%]" />
        <Skeleton className="h-5 w-[100%]" />
        <Skeleton className="h-5 w-[100%]" />
        <Skeleton className="h-5 w-[100%]" />
      </div>
    </div>
  );
};

export default OrderReviewSkeleton;
