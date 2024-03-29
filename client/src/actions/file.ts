import axios from "axios";
import { addFile, deleteFileAction, setFiles } from "../reducers/fileReducer";
import {
  addUploadFile,
  changeUploadFile,
  showUploader,
} from "../reducers/uploadReducer";
import { hideLoader, showLoader } from "../reducers/appReducer";
import { API_URL } from "../config";

export const getFiles = (dirId?: string, sort?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(showLoader());
      let url = `${API_URL}api/files`;

      if (dirId) {
        url = `${API_URL}api/files?parent=${dirId}`;
      }
      if (sort) {
        url = `${API_URL}api/files?sort=${sort}`;
      }
      if (dirId && sort) {
        url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setFiles(response.data));
    } catch (e: any) {
      alert(e.response?.data?.message);
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const createDir = (dirId: string, name: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(
        `${API_URL}api/files`,
        {
          name,
          parent: dirId,
          type: "dir",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(addFile(response.data));
    } catch (e: any) {
      alert(e.response?.data?.message);
    }
  };
};

export const uploadFile = (file: File, dirId: string | null) => {
  return async (dispatch: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      if (dirId) {
        formData.append("parent", dirId);
      }

      const uploadFile = { name: file.name, progress: 0, id: Date.now() };
      dispatch(showUploader());
      dispatch(addUploadFile(uploadFile));

      const response = await axios.post(
        `${API_URL}api/files/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          onUploadProgress: (progressEvent: any) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader("content-length") ||
                progressEvent.target.getResponseHeader(
                  "x-decompressed-content-length"
                );

            if (totalLength) {
              uploadFile.progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
              dispatch(changeUploadFile(uploadFile));
            }
          },
        }
      );

      dispatch(addFile(response.data));
    } catch (e: any) {
      alert(e?.response?.data?.message);
    }
  };
};

export const downloadFile = (file: { _id: string; name: string }): void => {
  fetch(`${API_URL}api/files/download?id=${file._id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.blob();
      } else {
        throw new Error(`Download failed with status ${response.status}`);
      }
    })
    .then((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const deleteFile = (file: { _id: string }) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.delete(
        `${API_URL}api/files?id=${file._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(deleteFileAction(file._id));
      alert(response.data.message);
    } catch (e: any) {
      alert(e?.response?.data?.message);
    }
  };
};

export const searchFiles = (search: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(
        `${API_URL}api/files/search?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(setFiles(response.data));
    } catch (e: any) {
      alert(e?.response?.data?.message);
    } finally {
      dispatch(hideLoader());
    }
  };
};
