import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { FileFromApi } from '@/lib/interfaces';
// import { v4 as uuidv4 } from 'uuid';


const { Dragger } = Upload;

type MultipleUploadProps = {
  fileList: FileFromApi[];
  setFileList: (fileList: FileFromApi[]) => void;
  maxCount?: number;
}

const MultiUpload  = ({fileList, setFileList, maxCount} : MultipleUploadProps) => {
  const props: UploadProps = {
    fileList: fileList?.map((file) => {
      return {
        uid: `upload-${file?.fileName}`,
        name: file?.fileName,
        status: "done",
        url: import.meta.env.VITE_API_URL + "/" + file?.baseDir,
      }
    }),
    name: 'file',
    multiple: true,
    maxCount: maxCount ?? 1,
    listType: 'picture',
    action: import.meta.env.VITE_API_URL + "/upload-single",
    onChange(info) {
      const { status } = info.file;
      // if (status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      if (status === 'done') {
        setFileList([...fileList, info.file.response]);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

export default MultiUpload;
