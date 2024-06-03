import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import MultiUpload from "../app/multiple-upload"

export default function PurchaseForm() {
  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-8  mx-auto py-10 px-4 md:px-6">
      <div className="bg-muted/40 rounded-lg p-6 sticky top-6">
        <div className="grid gap-4">
          <div className="grid gap-2 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Acme Product</span>
              <span className="font-medium text-sm">120 (Unity)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Purchase Price</span>
              <span className="font-medium text-sm">$19.99 per unity</span>
            </div>
          </div>
          <div className="grid gap-2 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Acme Product</span>
              <span className="font-medium text-sm">120 (Unity)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Purchase Price</span>
              <span className="font-medium text-sm">$19.99 per unity</span>
            </div>
          </div>
          <div className="grid gap-2 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Acme Product</span>
              <span className="font-medium text-sm">120 (Unity)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Purchase Price</span>
              <span className="font-medium text-sm">$19.99 per unity</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-4">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" placeholder="Enter product name" />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter product description" />
        </div>
        <div className="grid gap-4">
         <MultiUpload />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-4">
            <Label htmlFor="purchase-price">Purchase Price</Label>
            <Input id="purchase-price" type="number" min="0"  />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="tax">Tax</Label>
            <Input id="tax" type="number" min="0" max='100' />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-4">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" min="0"  />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" min="0" step="1" />
          </div>
        </div>
        <div className="grid gap-4">
          <Label htmlFor="unity">Unity</Label>
          <Input id="unity" placeholder="Enter product unity" />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}  
