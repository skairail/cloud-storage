type File = {
  _id: string;
};

type FileState = {
  files: File[];
  currentDir: string | null;
  popupDisplay: string;
  dirStack: string[];
  view: string;
};

type ActionPayload = {
  type: string;
  payload: any;
};

const SET_FILES = "SET_FILES";
const SET_CURRENT_DIR = "SET_CURRENT_DIR";
const ADD_FILE = "ADD_FILE";
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY";
const PUSH_TO_STACK = "PUSH_TO_STACK";
const DELETE_FILE = "DELETE_FILE";
const SET_VIEW = "SET_VIEW";

const defaultState: FileState = {
  files: [],
  currentDir: null,
  popupDisplay: "none",
  dirStack: [],
  view: "list",
};

const fileReducer = (
  state: FileState = defaultState,
  action: ActionPayload
): FileState => {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case SET_CURRENT_DIR:
      return { ...state, currentDir: action.payload };
    case ADD_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case SET_POPUP_DISPLAY:
      return { ...state, popupDisplay: action.payload };
    case PUSH_TO_STACK:
      return { ...state, dirStack: [...state.dirStack, action.payload] };
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== action.payload)],
      };
    case SET_VIEW:
      return { ...state, view: action.payload };
    default:
      return state;
  }
};

export const setFiles = (files: File[]): ActionPayload => ({
  type: SET_FILES,
  payload: files,
});
export const setCurrentDir = (dir: string | null): ActionPayload => ({
  type: SET_CURRENT_DIR,
  payload: dir,
});
export const addFile = (file: File): ActionPayload => ({
  type: ADD_FILE,
  payload: file,
});
export const setPopupDisplay = (display: string): ActionPayload => ({
  type: SET_POPUP_DISPLAY,
  payload: display,
});
export const pushToStack = (dir: string): ActionPayload => ({
  type: PUSH_TO_STACK,
  payload: dir,
});
export const deleteFileAction = (dirId: string): ActionPayload => ({
  type: DELETE_FILE,
  payload: dirId,
});
export const setFileView = (payload: string): ActionPayload => ({
  type: SET_VIEW,
  payload,
});

export default fileReducer;
