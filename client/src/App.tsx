import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import styles from "./App.module.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./components/Authorization/Registration";
import Login from "./components/Authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../src/actions/user";
import Disk from "./components/Disk/Disk";
import Profile from "./components/Profile/Profile";

function App() {
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar />
        <div className={styles.wrap}>
          <Routes>
            {!isAuth ? (
              <>
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Disk />} />
                <Route path="/profile" element={<Profile />} />
              </>
            )}
          </Routes>
          {isAuth && <Navigate to="/" />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
