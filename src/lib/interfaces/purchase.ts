export interface Purchase {
    _id?: string;
    reference: string;
    supplier: string;
    supplierLabel?: string;
    broughtAt?: string;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
    totalPrice?: number;
    totalTax?: number;
    totalWithoutTax?: number;
}