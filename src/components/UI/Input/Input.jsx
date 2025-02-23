import React from "react";

export const Input = ({ type, name, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      className="form__input"
    />
  );
};

export default Input;
