import { Image } from 'antd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductDetailsProps {
  name: string;
  category: string;
  totalStock: number;
  basePrice: number;
  description: string;
  imageUrl?: string;
}

export default function ProductDetailsCard(
  {
    name,
    category,
    totalStock,
    basePrice,
    description,
    imageUrl,
  }: ProductDetailsProps = {
    name: 'Product Name',
    category: 'Category',
    totalStock: 0,
    basePrice: 0,
    description: 'Product description',
  },
) {
  return (
    <Card className="overflow-hidden p-2">
      <div className="md:flex">
        <div className="md:w-1/4">
          <Image
            src={imageUrl || '/placeholder.svg?height=200&width=200'}
            alt={name}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-3/4 p-4">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{category || 'N/A'}</Badge>
              <span className="text-sm font-medium">
                Current Stock: {totalStock}
              </span>
            </div>
            <p className="text-lg font-semibold">
              ${basePrice.toFixed(2) || 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {description ?? 'N/A'}
            </p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
