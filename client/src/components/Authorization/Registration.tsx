import React, { useState } from "react";
import Input from "../../utils/Input";
import { registration } from "../../actions/user";
import styles from "./Authorization.module.css";
const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.authorization}>
      <div className={styles.authorizationHeader}>Registration</div>
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
        onClick={() => registration(email, password)}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Registration;
