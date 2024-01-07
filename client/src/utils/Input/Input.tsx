import React from "react";
import styles from "./Input.module.css";

const Input = (props: any) => {
  return (
    <input
      className={styles.input}
      onChange={(event) => props.setValue(event.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
