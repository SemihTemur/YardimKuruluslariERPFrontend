import React from "react";

const Select = ({ name, value, onChange, values }) => {
  return (
    <select
      className="form__select"
      name={name}
      value={value}
      onChange={onChange}
    >
      {values.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Select;
