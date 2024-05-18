
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

export type PrevilageContextType = {
  previlages?: Previlage[];
  setPrevilages: React.Dispatch<React.SetStateAction<Previlage[] | undefined>>;
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

export interface Previlage {
  _id?: string;
  name: string;
  description?: string;
  createdAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSFixMe = any;
