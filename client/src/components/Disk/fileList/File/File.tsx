import React from "react";
import dirLogo from "../../../../assets/img/dir.svg";
import fileLogo from "../../../../assets/img/file.svg";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";
import styles from "./File.module.css";
interface FileProps {
  file: {
    _id: string;
    name: string;
    type: string;
    date: string;
    size: number;
  };
}

const File: React.FC<FileProps> = ({ file }) => {
  const dispatch: any = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const fileView = useSelector((state: any) => state.files.view);

  function openDirHandler(file: { _id: string; type: string }) {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  function downloadClickHandler(e: React.MouseEvent) {
    e.stopPropagation();
    downloadFile(file);
  }

  function deleteClickHandler(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(deleteFile(file));
  }

  if (fileView === "list") {
    return (
      <div className={styles.file} onClick={() => openDirHandler(file)}>
        <img
          src={file.type === "dir" ? dirLogo : fileLogo}
          alt=""
          className={styles.fileImg}
        />
        <div className={styles.fileName}>{file.name}</div>
        <div className={styles.fileDate}>{file.date.slice(0, 10)}</div>
        <div className={styles.fileSize}>{sizeFormat(file.size)}</div>
        {file.type !== "dir" && (
          <button
            onClick={(e) => downloadClickHandler(e)}
            className={`${styles.fileBtn} ${styles.fileDownload}`}
          >
            download
          </button>
        )}
        <button
          onClick={(e) => deleteClickHandler(e)}
          className={`${styles.fileBtn} ${styles.fileDelete}`}
        >
          delete
        </button>
      </div>
    );
  }

  if (fileView === "plate") {
    return (
      <div className={styles.filePlate} onClick={() => openDirHandler(file)}>
        <img
          src={file.type === "dir" ? dirLogo : fileLogo}
          alt=""
          className={styles.filePlateImg}
        />
        <div className={styles.filePlateName}>{file.name}</div>
        <div className={styles.filePlateBtns}>
          {file.type !== "dir" && (
            <button
              onClick={(e) => downloadClickHandler(e)}
              className={`${styles.filePlateBtn} ${styles.filePlateDownload}`}
            >
              download
            </button>
          )}
          <button
            onClick={(e) => deleteClickHandler(e)}
            className={`${styles.filePlateBtn} ${styles.filePlateDelete}`}
          >
            delete
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default File;
