export interface ICronTask {
  _id: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  code: string;
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  type: string;
  frequency: string;
  status: 'success' | 'pending' | 'failed';
  logs: string;
  developerLogs: string;
  createdAt: Date;
  updatedAt: Date;
}
