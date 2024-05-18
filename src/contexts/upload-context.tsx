import React, { createContext } from "react";
import { useLocalStorageState } from "ahooks";
import type { UploadContextType, FileList, SingleFile } from "@/lib/types";

const UploadContext = createContext<UploadContextType>({
  filesList: { original: [], uploaded: [] },
  setFilesList: () => {},
  singleFile: {
    original: {},
    uploaded: {
      originalName: "",
      path: "",
      size: 0,
    },
  },
  setSingleFile: () => {},
  handleResetFilesList: () => {},
  handleResetSingleFile: () => {},
});

const UploadContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filesList, setFilesList] = useLocalStorageState<FileList | undefined>(
    "x-temp-upload-persisting-files-list-x",
    {
      defaultValue: { original: [], uploaded: [] },
    }
  );
  const [singleFile, setSingleFile] = useLocalStorageState<
    SingleFile | undefined
  >("x-temp-upload-persisting-single-file-x", {
    defaultValue: {
      original: {},
      uploaded: {
        originalName: "",
        path: "",
        size: 0,
      },
    },
  });

  const handleResetFilesList = () => {
    setFilesList({ original: [], uploaded: [] });
  };

  const handleResetSingleFile = () => {
    setSingleFile({
      original: {},
      uploaded: {
        originalName: "",
        path: "",
        size: 0,
      },
    });
  };

  const contextValue: UploadContextType = {
    filesList,
    setFilesList,
    singleFile,
    setSingleFile,
    handleResetSingleFile,
    handleResetFilesList,
  };

  return (
    <UploadContext.Provider value={contextValue}>
      {children}
    </UploadContext.Provider>
  );
};

export { UploadContext, UploadContextProvider };
