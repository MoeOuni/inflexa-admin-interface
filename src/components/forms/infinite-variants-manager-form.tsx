import { useState, useCallback, useEffect } from 'react';
import {
  PlusCircle,
  Trash2,
  ChevronRight,
  ChevronDown,
  GitPullRequestCreate,
  Save,
  FolderGit2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useProductDetails } from '@/api';
import ProductDetailsCard from '@/components/products/product-details-card.tsx';
import { Label } from '@/components/ui/label.tsx';
import ProductDetailsCardSkeleton from '@/components/skeletons/product-details-card-skeleton.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import VariantItemSkeleton from '@/components/skeletons/variant-item-skeleton.tsx';

interface Variant {
  id: string;
  name: string;
  additionalPrice?: number;
  discountPrice?: number;
  stock?: number;
  children: Variant[];
}

// Utility function to generate unique IDs (optional but recommended)
const generateId = () => Math.random().toString(36).substr(2, 9);

// Memoized VariantItem Component
const VariantItem: React.FC<{
  variant: Variant;
  level?: number;
  addVariant: (parentId: string) => void;
  updateVariant: (
    id: string,
    field: keyof Variant,
    value: string | number,
  ) => void;
  removeVariant: (id: string) => void;
}> = React.memo(
  ({ variant, level = 0, addVariant, updateVariant, removeVariant }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div style={{ marginLeft: `${level * 16}px` }} className="mb-3">
        <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,auto,auto] gap-2 items-end mb-2">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            size="icon"
            variant="ghost"
            type="button"
            className="p-0 w-6 h-6 self-end"
            disabled={!variant.children || variant.children.length === 0}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>

          <div>
            <Label htmlFor={`variant-name-${variant.id}`} className="text-xs">
              Name
            </Label>
            <Input
              id={`variant-name-${variant.id}`}
              type="text"
              value={variant.name}
              onChange={(e) =>
                updateVariant(variant.id, 'name', e.target.value)
              }
              placeholder="Variant name"
              className="w-full"
            />
          </div>

          <div>
            <Label
              htmlFor={`variant-additionalPrice-${variant.id}`}
              className="text-xs"
            >
              Additional Price
            </Label>
            <Input
              id={`variant-additionalPrice-${variant.id}`}
              type="number"
              value={variant.additionalPrice}
              onChange={(e) =>
                updateVariant(
                  variant.id,
                  'additionalPrice',
                  parseFloat(e.target.value) || 0,
                )
              }
              placeholder="List Price"
              className="w-full"
            />
          </div>

          <div>
            <Label
              htmlFor={`variant-discountPrice-${variant.id}`}
              className="text-xs"
            >
              Discount Price
            </Label>
            <Input
              id={`variant-discountPrice-${variant.id}`}
              type="number"
              value={variant.discountPrice}
              onChange={(e) =>
                updateVariant(
                  variant.id,
                  'discountPrice',
                  parseFloat(e.target.value) || 0,
                )
              }
              placeholder="Discount Price"
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor={`variant-stock-${variant.id}`} className="text-xs">
              Stock
            </Label>
            <Input
              id={`variant-stock-${variant.id}`}
              type="number"
              value={variant.stock}
              onChange={(e) =>
                updateVariant(
                  variant.id,
                  'stock',
                  parseFloat(e.target.value) || 0,
                )
              }
              placeholder="Stock"
              className="w-full"
            />
          </div>

          <Button
            onClick={() => addVariant(variant.id)}
            size="icon"
            type="button"
            variant="outline"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => removeVariant(variant.id)}
            size="icon"
            type="button"
            variant="outline"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {isExpanded && variant.children && variant.children.length > 0 && (
          <div>
            {variant.children.map((child) => (
              <VariantItem
                key={child.id}
                variant={child}
                level={level + 1}
                addVariant={addVariant}
                updateVariant={updateVariant}
                removeVariant={removeVariant}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

export default function InfiniteVariantManagerForm() {
  const [variants, setVariants] = useState<Variant[]>([]);

  const productDetails = useProductDetails();

  useEffect(() => {
    console.log(productDetails.data);
  }, [productDetails.data]);

  const addVariant = useCallback((parentId: string | null = null) => {
    const newVariant: Variant = {
      id: generateId(),
      name: '',
      additionalPrice: undefined,
      discountPrice: undefined,
      stock: undefined,
      children: [],
    };

    if (parentId === null) {
      setVariants((prevVariants) => [...prevVariants, newVariant]);
    } else {
      const updateVariantsRecursive = (variants: Variant[]): Variant[] => {
        return variants.map((v) => {
          if (v.id === parentId) {
            return { ...v, children: [...v.children, newVariant] };
          }
          if (v.children.length > 0) {
            return { ...v, children: updateVariantsRecursive(v.children) };
          }
          return v;
        });
      };
      setVariants((prevVariants) => updateVariantsRecursive(prevVariants));
    }
  }, []);

  const updateVariant = useCallback(
    (id: string, field: keyof Variant, value: string | number) => {
      const updateVariantRecursive = (variants: Variant[]): Variant[] => {
        return variants.map((v) => {
          if (v.id === id) {
            return { ...v, [field]: value };
          }
          if (v.children.length > 0) {
            return { ...v, children: updateVariantRecursive(v.children) };
          }
          return v;
        });
      };

      setVariants((prevVariants) => updateVariantRecursive(prevVariants));
    },
    [],
  );

  const removeVariant = useCallback((id: string) => {
    const removeVariantRecursive = (variants: Variant[]): Variant[] => {
      return variants
        .filter((v) => v.id !== id)
        .map((v) => ({
          ...v,
          children: removeVariantRecursive(v.children),
        }));
    };

    setVariants((prevVariants) => removeVariantRecursive(prevVariants));
  }, []);

  const handleFinish = () => {
    console.log(variants);
  };

  return (
    <div className="space-y-3">
      {productDetails.isLoading ? (
        <>
          <ProductDetailsCardSkeleton />
          <Card>
            <CardContent className="p-4">
              <VariantItemSkeleton />
              <div className="ml-5">
                <VariantItemSkeleton />
                <VariantItemSkeleton />
              </div>
              <VariantItemSkeleton />
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <ProductDetailsCard
            name={productDetails?.data?.data?.name}
            category={productDetails?.data?.data?.category.categoryName}
            totalStock={productDetails?.data?.data?.stock?.currentStock}
            basePrice={productDetails?.data?.data?.price?.listPrice ?? 0}
            description={productDetails?.data?.data?.description}
            imageUrl={
              productDetails?.data?.data?.images[0]?.url &&
              import.meta.env.VITE_API_URL +
                '/' +
                productDetails?.data?.data?.images[0]?.url
            }
          />

          <form className="border bg-muted/40 p-3 rounded-md shadow">
            {variants?.length > 0 ? (
              variants.map((variant) => (
                <VariantItem
                  key={variant.id}
                  variant={variant}
                  addVariant={addVariant}
                  updateVariant={updateVariant}
                  removeVariant={removeVariant}
                />
              ))
            ) : (
              <div className="flex items-center flex-col py-4 gap-1">
                <FolderGit2 className="stroke-1 w-10 h-10" />
                <span className="font-bold">No variants</span>
                <span>Get started by creating a new root variant.</span>
                <Button
                  onClick={() => addVariant()}
                  type="button"
                  size="sm"
                  className="mt-2 h-8 gap-1"
                >
                  <GitPullRequestCreate className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Root Variant
                  </span>
                </Button>
              </div>
            )}
          </form>
        </>
      )}
      <div className="flex justify-between mt-4">
        <Button
          disabled={productDetails.isLoading}
          onClick={() => addVariant()}
          type="button"
          variant="outline"
          size="sm"
          className="h-8 gap-1"
        >
          <GitPullRequestCreate className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Root Variant
          </span>
        </Button>
        <Button
          disabled={productDetails.isLoading}
          type="button"
          size="sm"
          className="h-8 gap-1"
          onClick={handleFinish}
        >
          <Save className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Save Variants
          </span>
        </Button>
      </div>
    </div>
  );
}
