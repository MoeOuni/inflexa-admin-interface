/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILog {
  _id: string;
  userId: string;
  action: {
    en: string;
    fr: string;
    ar?: string;
  };
  userFirstName: string;
  userLastName: string;
  userAvatar: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}
