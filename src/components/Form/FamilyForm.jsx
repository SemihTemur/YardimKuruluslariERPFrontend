import React from "react";
import Label from "../UI/Label/Label";
import Button from "../UI/Button/Button";
import cities from "../../constants/cityItem";
import { Field, ErrorMessage } from "formik";

const FamilyForm = () => {
  return (
    <>
      {/* Aile Adı */}
      <div className="form-container__content">
        <Label text="Aile Adı:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="familyName" className="form__input" />
          <ErrorMessage
            name="familyName"
            component="p"
            className="input-error"
          />
        </div>
      </div>

      {/* Aile Üye Sayısı */}
      <div className="form-container__content">
        <Label text="Aile Üye Sayısı:" />
        <div className="form-container__content__input-group">
          <Field
            type="number"
            name="familyMemberCount"
            className="form__input"
          />
          <ErrorMessage
            name="familyMemberCount"
            component="p"
            className="input-error"
          />
        </div>
      </div>

      {/* Telefon Numarası */}
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

      {/* Email */}
      <div className="form-container__content">
        <Label text="Email:" />
        <div className="form-container__content__input-group">
          <Field type="email" name="email" className="form__input" />
          <ErrorMessage name="email" component="p" className="input-error" />
        </div>
      </div>

      {/* İl */}
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

export default FamilyForm;
