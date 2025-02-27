import React from "react";
import { Field, ErrorMessage } from "formik";
import genders from "../../constants/genders";
import educationLevel from "../../constants/educationLevel";
import cities from "../../constants/cityItem";
import Label from "../UI/Label/Label";
import Button from "../UI/Button/Button";

const StudentForm = () => {
  return (
    <>
      <div className="form-container__content">
        <Label text="Öğrenci Adı:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="name" className="form__input" />
          <ErrorMessage name="name" component="p" className="input-error" />
        </div>
      </div>
      <div className="form-container__content">
        <Label text="Öğrenci Soyadı:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="surname" className="form__input" />
          <ErrorMessage name="surname" component="p" className="input-error" />
        </div>
      </div>
      <div className="form-container__content">
        <Label text="Yaşı:" />
        <div className="form-container__content__input-group">
          <Field type="number" name="age" className="form__input" />
          <ErrorMessage name="age" component="p" className="input-error" />
        </div>
      </div>
      <div className="form-container__content">
        <Label text="T.C.Kimlik Numarası:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="tckn" className="form__input" />
          <ErrorMessage name="tckn" component="p" className="input-error" />
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
        <Label text="Eğitim Seviyesi:" />
        <div className="form-container__content__input-group">
          <Field as="select" name="educationLevel" className="form__select">
            {educationLevel.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="educationLevel"
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

export default StudentForm;
