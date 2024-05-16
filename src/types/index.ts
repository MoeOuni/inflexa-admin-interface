export interface SubCategory {
    _id?: string;
    name: string;
    description?: string;
    image?: string;
    createdAt?: Date;
}

export interface Category {
    _id?: string;
    name: string;
    description?: string;
    image?: string;
    createdAt?: Date;
    subCategories?: SubCategory[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSFixMe = any;