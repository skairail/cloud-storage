import React from "react";
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../../reducers/uploadReducer";
import styles from "./Uploader.module.css";

interface UploadFileProps {
  file: {
    id: string;
    name: string;
    progress: number;
  };
}

const UploadFile: React.FC<UploadFileProps> = ({ file }: any) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.uploadFile}>
      <div className={styles.uploadFileHeader}>
        <div className={styles.uploadFileName}>{file.name}</div>
        <button
          className={styles.uploadFileRemove}
          onClick={() => dispatch(removeUploadFile(file.id))}
        >
          X
        </button>
      </div>
      <div className={styles.uploadFileProgressBar}>
        <div
          className={styles.uploadFileUploadBar}
          style={{ width: `${file.progress}%` }}
        />
        <div className={styles.uploadFilePercent}>{file.progress}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
