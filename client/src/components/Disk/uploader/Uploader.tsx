import React from "react";
import UploadFile from "./UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { hideUploader } from "../../../reducers/uploadReducer";
import styles from "./Uploader.module.css";

interface UploaderProps {}

const Uploader: React.FC<UploaderProps> = () => {
  const files = useSelector((state: any) => state.upload.files);
  const isVisible = useSelector((state: any) => state.upload.isVisible);
  const dispatch = useDispatch();

  return (
    isVisible && (
      <div className={styles.uploader}>
        <div className={styles.uploaderHeader}>
          <div className={styles.uploaderTitle}>Загрузки</div>
          <button
            className={styles.uploaderClose}
            onClick={() => dispatch(hideUploader())}
          >
            X
          </button>
        </div>
        {files.map((file: any) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  );
};

export default Uploader;
