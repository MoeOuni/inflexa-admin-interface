export type Bank = {
    _id?: string,
    _rib?: string;
    _iban?: string;
    _bic?: string;
    _representative?: string;
    _agency?: string;
};

export interface Supplier {
    _id?: string,
    supplierCode: string;
    userRef?: string
    email?: string;
    companyName: string;
    taxNumber: string;
    representative?: string;
    phoneNumber?: string;
    address: string;
    description?: string;
    banks?: Bank[];
    profilePic?: string;
    logo?: string;
    status?: string;
    archivedAt?: Date;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}