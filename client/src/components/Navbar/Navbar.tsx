import React from "react";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { NavLink } from "react-router-dom";

function Navbar() {
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarHeader}>CLOUD STORAGE</div>

      {!isAuth && (
        <div className={styles.navbarLogin}>
          <NavLink to="/login">Login</NavLink>
        </div>
      )}
      {!isAuth && (
        <div className={styles.navbarRegistration}>
          <NavLink to="/registration">Sign up</NavLink>
        </div>
      )}
      {isAuth && (
        <div className={styles.navbarLogin} onClick={() => dispatch(logout())}>
          Log out
        </div>
      )}
    </div>
  );
}

export default Navbar;
