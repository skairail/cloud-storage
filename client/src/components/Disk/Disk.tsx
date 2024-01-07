import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import FileList from "./fileList/FileList";
import styles from "./Disk.module.css";
import Popup from "./Popup";
import {
  setCurrentDir,
  setFileView,
  setPopupDisplay,
} from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";

const Disk = () => {
  const dispatch: any = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const loader = useSelector((state: any) => state.app.loader);
  const dirStack = useSelector((state: any) => state.files.dirStack);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, dispatch, sort]);

  function showPopupHandler() {
    dispatch(setPopupDisplay("flex"));
  }

  function backClickHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHandler(event: any) {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  }

  function dragEnterHandler(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function dropHandler(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  if (loader) {
    return (
      <div className={styles.loader}>
        <div className={styles.ldsDualRing}></div>
      </div>
    );
  }

  return !dragEnter ? (
    <div
      className={styles.disk}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className={styles.diskBtns}>
        <button className={styles.diskBack} onClick={backClickHandler}>
          Back
        </button>
        <button className={styles.diskCreate} onClick={showPopupHandler}>
          Create a folder
        </button>
        <div className={styles.diskUpload}>
          <label
            htmlFor={styles.diskUploadInput}
            className={styles.diskUploadLabel}
          >
            Upload file
          </label>
          <input
            multiple={true}
            onChange={fileUploadHandler}
            type="file"
            id={styles.diskUploadInput}
            className={styles.diskUploadInput}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={styles.diskSelect}
        >
          <option value="name">By name</option>
          <option value="type">By type</option>
          <option value="date">By date</option>
        </select>
        <button
          className={styles.diskPlate}
          onClick={() => dispatch(setFileView("plate"))}
        />
        <button
          className={styles.diskList}
          onClick={() => dispatch(setFileView("list"))}
        />
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className={styles.dropArea}
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Drag files here
    </div>
  );
};

export default Disk;
