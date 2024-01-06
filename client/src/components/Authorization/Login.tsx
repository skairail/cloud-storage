import React, { useState } from "react";
import Input from "../../utils/Input";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import styles from "./Authorization.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: any = useDispatch();

  return (
    <div className={styles.authorization}>
      <div className={styles.authorizationHeader}>Authorization</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Enter email..."
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Enter password..."
      />
      <button
        className={styles.authorizationBtn}
        onClick={() => dispatch(login(email, password))}
      >
        Log in
      </button>
    </div>
  );
};

export default Login;
