import React, { ChangeEvent } from "react";
import "./input.css";

interface InputProps {
  setValue: (value: string) => void;
  value: string;
  type: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        props.setValue(event.target.value)
      }
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
