import React from "react";
import Label from "../../components/UI/Label/Label";
import currencyType from "../../constants/currencyType";
import Button from "../../components/UI/Button/Button";
import { Field, ErrorMessage } from "formik";

const OtherIncomeForm = ({ buttonTitle }) => {
  return (
    <>
      <div className="form-container__content">
        <Label text="Açıklama:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="description" className="form__input" />
          <ErrorMessage
            name="description"
            component="p"
            className="input-error"
          />
        </div>
      </div>
      <div className="form-container__content">
        <Label text="Gelir Miktarı:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="amount" className="form__input" />
          <ErrorMessage name="amount" component="p" className="input-error" />
        </div>
      </div>

      {/* <div className="form-container__content">
        <Label text="Para Birimi:" />
        <div className="form-container__content__input-group">
          <Field as="select" name="currency" className="form__select">
            {currencyType.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </Field>
          <ErrorMessage name="currency" component="p" className="input-error" />
        </div>
      </div> */}
      <Button type="submit" title={buttonTitle}></Button>
    </>
  );
};

export default OtherIncomeForm;
