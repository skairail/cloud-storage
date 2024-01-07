import axios from "axios";
import { Dispatch } from "redux";
import { setUser } from "../reducers/userReducer";
import { API_URL } from "../config";

interface AuthResponse {
  user: any;
  token: string;
}

export const registration = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/auth/registration`,
      {
        email,
        password,
      }
    );
    alert(response.data.message);
  } catch (e: any) {
    alert(e.response.data.message);
  }
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<AuthResponse>(
        `http://localhost:5000/api/auth/login`,
        {
          email,
          password,
        }
      );
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };
};

export const auth = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<AuthResponse>(
        `http://localhost:5000/api/auth/auth`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e: any) {
      alert(e.response.data.message);
      localStorage.removeItem("token");
    }
  };
};

export const uploadAvatar = (file: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `${API_URL}api/files/avatar`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}api/files/avatar`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
