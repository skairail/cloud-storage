import React from "react";
import { useSelector } from "react-redux";
import File from "./File/File";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./FileList.module.css";

interface FileListProps {}

const FileList: React.FC<FileListProps> = () => {
  const files = useSelector((state: any) => state.files.files);
  const fileView = useSelector((state: any) => state.files.view);

  if (files.length === 0) {
    return <div className={styles.loader}>Files not found</div>;
  }

  if (fileView === "plate") {
    return (
      <div className={styles.filePlate}>
        {files.map((file: any) => (
          <File key={file._id} file={file} />
        ))}
      </div>
    );
  }

  if (fileView === "list") {
    return (
      <div className={styles.fileList}>
        <div className={styles.fileListHeader}>
          <div className={styles.fileListName}>Name</div>
          <div className={styles.fileListDate}>Date</div>
          <div className={styles.fileListSize}>Size</div>
        </div>
        <TransitionGroup>
          {files.map((file: any) => (
            <CSSTransition
              key={file._id}
              timeout={500}
              classNames={styles.file}
              exit={false}
            >
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }

  return null;
};

export default FileList;
