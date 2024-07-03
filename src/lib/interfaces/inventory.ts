export interface Tax {
    taxType: string;
    taxRate: number;
    taxAmount: number;
}

export interface PurchaseInvoice {
    purchaseId?: string;
    reference?: string;
    purchasePrice?: number;
    taxes?: Tax;
    purchaseDate?: Date;
    purchaseAmount?: number;
}

export interface Stock {
    initialStock: number;
    currentStock: number;
    soldStock: number;
    damagedStock: number;
    returnedStock: number;
    warehouseLocation: string;
    unit: string;
}

export interface Price {
    listPrice: number;
    discountPrice: number;
    currency: string;
}

export interface Image {
    url: string;
    altText: string;
}

// Define the Status interface
export interface Status {
    isAvailable?: boolean;
    isActive?: boolean;
    isFeatured?: boolean;
    featureId?: string;
    needsReview?: boolean;
}

// Define the Category interface
export interface Category {
    categoryId: string;
    categoryName: string;
    subCategoryId: string;
    subCategoryName: string;
}

// Define the Inventory interface extending the Document interface from Mongoose
export interface Product {
    _id?: string;
    reference: string;
    supplier: string;
    name: string;
    description?: string;
    createdBy?: string;
    category?: Category;
    purchaseInvoice?: PurchaseInvoice[];
    stock?: Stock;
    price?: Price;
    images?: Image[];
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
}
