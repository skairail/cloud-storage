import React from "react";
import { useSelector } from "react-redux";
import File from "./File/File";
import { CSSTransition, TransitionGroup } from "react-transition-group";

interface FileListProps {}

const FileList: React.FC<FileListProps> = () => {
  const files = useSelector((state: any) => state.files.files);
  const fileView = useSelector((state: any) => state.files.view);

  if (files.length === 0) {
    return <div className="loader">Files not found</div>;
  }

  if (fileView === "plate") {
    return (
      <div className="fileplate">
        {files.map((file: any) => (
          <File key={file._id} file={file} />
        ))}
      </div>
    );
  }

  if (fileView === "list") {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">Name</div>
          <div className="filelist__date">Date</div>
          <div className="filelist__size">Size</div>
        </div>
        <TransitionGroup>
          {files.map((file: any) => (
            <CSSTransition
              key={file._id}
              timeout={500}
              classNames={"file"}
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
