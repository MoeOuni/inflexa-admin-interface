import React from 'react';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import {Button} from '../ui/button'
const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const SingleUpload: React.FC = () => (
  <Upload {...props}>
    <Button variant={'secondary'}>Click to Upload</Button>
  </Upload>
);

export default SingleUpload;