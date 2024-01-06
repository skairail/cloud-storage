import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./components/Authorization/Registration";
import Login from "./components/Authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../src/actions/user";

function App() {
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth && (
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
