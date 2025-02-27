import React from "react";
import { Field, ErrorMessage } from "formik";
import cities from "../../constants/cityItem";
import genders from "../../constants/genders";
import Label from "../UI/Label/Label";
import Button from "../UI/Button/Button";

const DonorForm = ({ formik }) => {
  return (
    <>
      <div className="form-container__content">
        <Label text="Bağışçı Adı:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="firstName" className="form__input" />
          <ErrorMessage
            name="firstName"
            component="p"
            className="input-error"
          />
        </div>
      </div>
      <div className="form-container__content">
        <Label text="Bağışçı Soyadı:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="lastName" className="form__input" />
          <ErrorMessage name="lastName" component="p" className="input-error" />
        </div>
      </div>

      <div className="form-container__content">
        <Label text="Telefon Numarası:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="phoneNumber" className="form__input" />
          <ErrorMessage
            name="phoneNumber"
            component="p"
            className="input-error"
          />
        </div>
      </div>
      <div className="form-container__content">
        <Label text="Email:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="email" className="form__input" />
          <ErrorMessage name="email" component="p" className="input-error" />
        </div>
      </div>
      <div className="form-container__content">
        <Label text="Cinsiyet:" />
        <div className="form-container__content__input-group">
          <Field as="select" name="genderType" className="form__select">
            {genders.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="genderType"
            component="p"
            className="input-error"
          />
        </div>
      </div>
      <div className="form-container__content">
        <Label text="İl:" />
        <div className="form-container__content__input-group">
          <Field as="select" name="address.city" className="form__select">
            {cities.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="address.city"
            component="p"
            className="input-error"
          />
        </div>
      </div>

      {/* İlçe */}
      <div className="form-container__content">
        <Label text="İlçe:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="address.district" className="form__select" />
          <ErrorMessage
            name="address.district"
            component="p"
            className="input-error"
          />
        </div>
      </div>

      {/* Mahalle */}
      <div className="form-container__content">
        <Label text="Mahalle:" />
        <div className="form-container__content__input-group">
          <Field
            type="text"
            name="address.neighborhood"
            className="form__select"
          />
          <ErrorMessage
            name="address.neighborhood"
            component="p"
            className="input-error"
          />
        </div>
      </div>

      {/* Sokak */}
      <div className="form-container__content">
        <Label text="Sokak:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="address.street" className="form__select" />
          <ErrorMessage
            name="address.street"
            component="p"
            className="input-error"
          />
        </div>
      </div>

      <Button type="submit"></Button>
    </>
  );
};

export default DonorForm;
