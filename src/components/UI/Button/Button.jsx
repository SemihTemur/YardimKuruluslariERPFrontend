import React from "react";

const Button = ({ type = "submit" }) => {
  return (
    <button className="form__button" type={type}>
      Kaydet
    </button>
  );
};

export default Button;
