import React, { useState } from "react";
import Input from "../../utils/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { setPopupDisplay } from "../../reducers/fileReducer";
import { createDir } from "../../actions/file";
import styles from "./Disk.module.css";

const Popup = () => {
  const [dirName, setDirName] = useState("");
  const popupDisplay = useSelector((state: any) => state.files.popupDisplay);
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const dispatch: any = useDispatch();

  function createHandler() {
    dispatch(createDir(currentDir, dirName));
  }

  return (
    <div
      className={styles.popup}
      onClick={() => dispatch(setPopupDisplay("none"))}
      style={{ display: popupDisplay }}
    >
      <div
        className={styles.popupContent}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.popupHeader}>
          <div className={styles.popupTitle}>Create a new folder</div>
          <button
            className={styles.popupClose}
            onClick={() => dispatch(setPopupDisplay("none"))}
          >
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder="Enter folder name..."
          value={dirName}
          setValue={setDirName}
        />
        <button className={styles.popupCreate} onClick={() => createHandler()}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Popup;
