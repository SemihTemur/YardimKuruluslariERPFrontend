import React from "react";
import Label from "../UI/Label/Label";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";
import cities from "../../constants/cityItem";

const FamilyForm = ({ formik }) => {
  return (
    <>
      {/* Aile Adı */}
      <div className="form-container__content">
        <Label text="Aile Adı:" />
        <div className="form-container__content__input-group">
          <Input
            type="text"
            name="familyName"
            value={formik.values.familyName || ""}
            onChange={formik.handleChange}
          />
          {formik.errors.familyName && (
            <p className="input-error">{formik.errors.familyName}</p>
          )}
        </div>
      </div>

      {/* Aile Üye Sayısı */}
      <div className="form-container__content">
        <Label text="Aile Üye Sayısı:" />
        <div className="form-container__content__input-group">
          <Input
            type="number"
            name="familyMemberCount"
            value={formik.values.familyMemberCount || ""}
            onChange={(e) =>
              formik.setFieldValue("familyMemberCount", Number(e.target.value))
            }
          />
          {formik.errors.familyMemberCount && (
            <p className="input-error">{formik.errors.familyMemberCount}</p>
          )}
        </div>
      </div>

      {/* Telefon Numarası */}
      <div className="form-container__content">
        <Label text="Telefon Numarası:" />
        <div className="form-container__content__input-group">
          <Input
            type="text"
            name="phoneNumber"
            value={formik.values.phoneNumber || ""}
            onChange={formik.handleChange}
          />
          {formik.errors.phoneNumber && (
            <p className="input-error">{formik.errors.phoneNumber}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="form-container__content">
        <Label text="Email:" />
        <div className="form-container__content__input-group">
          <Input
            type="email"
            name="email"
            value={formik.values.email || ""}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className="input-error">{formik.errors.email}</p>
          )}
        </div>
      </div>

      {/* İl */}
      <div className="form-container__content">
        <Label text="İl:" />
        <div className="form-container__content__input-group">
          <Select
            name="address.city"
            values={cities}
            value={formik.values.address.city || "Adana"}
            onChange={formik.handleChange}
          />
          {formik.errors.address?.city && (
            <p className="input-error">{formik.errors.address.city}</p>
          )}
        </div>
      </div>

      {/* İlçe */}
      <div className="form-container__content">
        <Label text="İlçe:" />
        <div className="form-container__content__input-group">
          <Input
            type="text"
            name="address.district"
            value={formik.values.address.district || ""}
            onChange={formik.handleChange}
          />
          {formik.errors.address?.district && (
            <p className="input-error">{formik.errors.address.district}</p>
          )}
        </div>
      </div>

      {/* Mahalle */}
      <div className="form-container__content">
        <Label text="Mahalle:" />
        <div className="form-container__content__input-group">
          <Input
            type="text"
            name="address.neighborhood"
            value={formik.values.address.neighborhood || ""}
            onChange={formik.handleChange}
          />
          {formik.errors.address?.neighborhood && (
            <p className="input-error">{formik.errors.address.neighborhood}</p>
          )}
        </div>
      </div>

      {/* Sokak */}
      <div className="form-container__content">
        <Label text="Sokak:" />
        <div className="form-container__content__input-group">
          <Input
            type="text"
            name="address.street"
            value={formik.values.address.street || ""}
            onChange={formik.handleChange}
          />
          {formik.errors.address?.street && (
            <p className="input-error">{formik.errors.address.street}</p>
          )}
        </div>
      </div>

      <Button type="submit">Ekle</Button>
    </>
  );
};

export default FamilyForm;
