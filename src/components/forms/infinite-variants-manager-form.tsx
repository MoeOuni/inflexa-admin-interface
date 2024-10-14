import { useState, useCallback } from 'react';
import { PlusCircle, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

interface Variant {
  id: string;
  name: string;
  listPrice: number;
  discountPrice: number;
  stock: number;
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

    console.log('Rendering VariantItem', variant);

    return (
      <div style={{ marginLeft: `${level * 16}px` }} className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            size="icon"
            variant="ghost"
            type="button"
            className="p-0 w-6 h-6"
            disabled={variant.children.length === 0}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          <Input
            type="text"
            name={`variant-name-${variant.id}`}
            value={variant.name}
            onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
            placeholder="Variant name"
            className="w-1/3"
          />
          <Input
            type="number"
            name={`variant-listPrice-${variant.id}`}
            value={variant.listPrice}
            onChange={(e) =>
              updateVariant(
                variant.id,
                'listPrice',
                parseFloat(e.target.value) || 0,
              )
            }
            placeholder="List Price"
            className="w-1/3"
          />
          <Input
            type="number"
            name={`variant-discountPrice-${variant.id}`}
            value={variant.discountPrice}
            onChange={(e) =>
              updateVariant(
                variant.id,
                'discountPrice',
                parseFloat(e.target.value) || 0,
              )
            }
            placeholder="Discount Price"
            className="w-1/6"
          />
          <Input
            type="number"
            name={`variant-stock-${variant.id}`}
            value={variant.stock}
            onChange={(e) =>
              updateVariant(
                variant.id,
                'stock',
                parseFloat(e.target.value) || 0,
              )
            }
            placeholder="Stock"
            className="w-1/6"
          />
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
        {isExpanded && variant.children.length > 0 && (
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

  const addVariant = useCallback((parentId: string | null = null) => {
    const newVariant: Variant = {
      id: generateId(),
      name: '',
      listPrice: 0,
      discountPrice: 0,
      stock: 0,
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
    <div>
      <Button onClick={() => addVariant()} className="mb-4">
        Add Root Variant
      </Button>
      <form>
        {variants.map((variant) => (
          <VariantItem
            key={variant.id}
            variant={variant}
            addVariant={addVariant}
            updateVariant={updateVariant}
            removeVariant={removeVariant}
          />
        ))}
      </form>
      <Button onClick={handleFinish} className="mt-4">
        Finish
      </Button>
    </div>
  );
}
