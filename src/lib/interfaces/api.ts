export interface APICreateInventory {
    reference: string;
    supplier: string;
    purchaseId: string;
    purchaseReference: string;
    tax: number;
    quantity: number;
    unit: string;
    name: string;
    price: number;
}

export interface APIPurchase {
    _id?: string;
    reference: string;
    supplier: string;
    createdBy?: string;
    broughtAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    totalPrice?: number;
    totalWithoutTax?: number;
    totalTax?: number;
}