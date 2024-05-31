
// Define the type for the context
export type AuthContextType = {
  token: string | undefined;
  user: UserState | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUser: React.Dispatch<React.SetStateAction<UserState | undefined>>;
  setDummyAuth: () => void | undefined;
  clearDummyAuth: () => void | undefined;
};

export type UploadContextType = {
  filesList?: FileList;
  setFilesList: React.Dispatch<React.SetStateAction<FileList | undefined>>;
  singleFile?: SingleFile;
  setSingleFile: React.Dispatch<React.SetStateAction<SingleFile | undefined>>;
  handleResetSingleFile: () => void;
  handleResetFilesList: () => void;
}

export type PermissionContextType = {
  permissions?: Permission[];
  setPermissions: React.Dispatch<React.SetStateAction<Permission[] | undefined>>;
}

// Define the type for the user state
export type UserState = {
  id: string;
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
};

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

export interface File {
  originalName: string;
  path: string;
  size: number;
}

export interface SingleFile {
  original?: any;
  uploaded?: File;
}

export interface FileList {
  original: any[];
  uploaded: File[];
}

export interface Permission {
  _id?: string;
  name: string;
  description?: string;
  createdAt?: Date;
}

export interface Role {
  _id?: string;
  name: string;
  description?: string;
  permissions?: Permission[] | string[];
  createdAt?: Date;
}

export interface Banque {
  _id?: string;
  _rib?: string;
  _iban?: string;
  _bic?: string;
  _representative?: string;
  _agency?: string;
}

export interface Supplier {
  _id?: string;
  supplierCode: string;
  email?: string;
  companyName: string;
  taxNumber: string;
  representative?: string;
  phoneNumber?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  description?: string;
  banque?: Banque;
  profilePic?: string;
  logo?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSFixMe = any;
