import React from "react";
import styles from "./Input.module.css";

const Input = ({
  name,
  text,
  type,
  value,
  onChange,
  onBlur,
  error,
  readOnly,
  disabled,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {text}
      </label>
      <input
        className={styles.input}
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        disabled={disabled}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
