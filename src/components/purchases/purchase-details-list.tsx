import { Currency, Purchase } from "@/lib/types";
import {
  calculateTotalPrice,
  calculateTotalTax,
  calculateTotalWithoutTax,
} from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  purchase: Purchase;
  currency: Currency;
};

export default function PurchaseDetailsList({ purchase, currency }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Details </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Reference</span>
            <span>{purchase?.reference}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Supplier</span>
            <span>{purchase?.supplierLabel}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Date</span>
            <span>{purchase.createdAt}</span>
          </div>
          {purchase?.purchaseDetails?.length ? (
            <>
              <ul className="grid gap-3 ">
                {purchase.purchaseDetails?.map((product, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {product.name} x <span>{product.quantity}</span>
                    </span>
                    <span>
                      {(product.price * product.quantity).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}{" "}
                      {currency?.symbol}
                    </span>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3 ">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total ET</span>
                  <span>
                    {calculateTotalWithoutTax(
                      purchase.purchaseDetails
                    )?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) ?? 0}{" "}
                    {currency?.symbol}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Taxes</span>
                  <span>
                    {calculateTotalTax(
                      purchase.purchaseDetails
                    )?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) ?? 0}{" "}
                    {currency?.symbol}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Price</span>
                  <span>
                    {calculateTotalPrice(
                      purchase.purchaseDetails
                    )?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) ?? 0}{" "}
                    {currency?.symbol}
                  </span>
                </li>
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
