
import React from 'react';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { Button } from '@/components/ui/button';

type SingleUploadProps = {
  files: any;
  setFiles: void;
};

// @ts-ignore
const SingleUpload: React.FC = ({ files, setFiles }: SingleUploadProps) => {
  const props: UploadProps = {
    name: 'file',
    action: import.meta.env.VITE_API_URL + '/upload-single',
    headers: {
      authorization: 'authorization-text',
    },
    listType: 'picture',
    maxCount: 1,
    onChange(info) {
      // if (info.file.status !== 'uploading') {
      console.log(info.file);
      // }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        console.log(info.file.response);
      } else if (info.file.status === 'error') {
        console.log(info.file.response);
        message.error(
          info.file.response?.message ?? `${info.file.name} file upload failed.`
        );
      }
    },
  };
  return (
    <Upload {...props}>
      <Button variant={'secondary'}>Click to Upload</Button>
    </Upload>
  );
};

export default SingleUpload;
