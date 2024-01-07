import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { getFiles, searchFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import avatarLogo from "../../assets/img/avatar.svg";
import { API_URL } from "../../config";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const dispatch: any = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout]: any = useState(false);
  const avatar = currentUser.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;

  function searchChangeHandler(e: any) {
    setSearchName(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value !== "") {
      setSearchTimeout(
        setTimeout(
          (value: any) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbarHeader}>CLOUD STORAGE</div>
        {isAuth && (
          <input
            value={searchName}
            onChange={(e) => searchChangeHandler(e)}
            className={styles.navbarSearch}
            type="text"
            placeholder="File name..."
          />
        )}
        {!isAuth && (
          <div className={styles.navbarLogin}>
            <NavLink to="/login">Log In</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className={styles.navbarRegistration}>
            <NavLink to="/registration">Sign Up</NavLink>
          </div>
        )}
        {isAuth && (
          <div
            className={styles.navbarLogin}
            onClick={() => dispatch(logout())}
          >
            Log Out
          </div>
        )}
        {isAuth && (
          <NavLink to="/profile">
            <img className={styles.navbarAvatar} src={avatar} alt="" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
