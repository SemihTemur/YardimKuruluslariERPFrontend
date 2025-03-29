import React from "react";

const Button = ({ type = "submit", onClick, title }) => {
  return (
    <button className="form__button" type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
