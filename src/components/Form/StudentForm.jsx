import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import cityDistricts from "../../constants/cityDistricts";
import genders from "../../constants/genders";
import educationLevel from "../../constants/educationLevel";
import Label from "../UI/Label/Label";
import Button from "../UI/Button/Button";
import Select from "react-select";

const StudentForm = ({ process, buttonTitle }) => {
  const { values } = useFormikContext();
  const [filteredCity, setFilteredCity] = useState([]);
  const [filteredDistrict, setFilteredDistrict] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectEducationLevel, setEducationLevel] = useState(null);

  // Şehiri alma
  const cityOptions = cityDistricts.map((city) => ({
    label: city.city,
    value: city.city,
  }));

  const updateValues = () => {
    const updateSelectCity = {
      value: values.address.city,
      label: values.address.city,
    };

    const updateSelectDistrict = {
      value: values.address.district,
      label: values.address.district,
    };

    const updateSelectGender = {
      value: values.genderType,
      label: values.genderType,
    };

    const updateSelectEducationLevel = {
      value: values.educationLevel,
      label: values.educationLevel,
    };

    setSelectedCity(updateSelectCity);
    setSelectedDistrict(updateSelectDistrict);
    setSelectedGender(updateSelectGender);
    setEducationLevel(updateSelectEducationLevel);
  };

  useEffect(() => {
    setFilteredCity(cityOptions);

    if (process == "update") {
      updateValues();
    }
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const cityData = cityDistricts.find(
        (city) => city.city === selectedCity.value
      );
      const districtOptions = cityData
        ? cityData.districts.map((district) => ({
            label: district,
            value: district,
          }))
        : [];
      setFilteredDistrict(districtOptions);
    }
  }, [selectedCity]);

  const handleCity = (selectedOption) => {
    setSelectedDistrict(null);
    setSelectedCity(selectedOption);
    values.address.city = selectedOption.value;
  };

  const handleDistrict = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    values.address.district = selectedOption.value;
  };

  const handleGender = (selectedOption) => {
    setSelectedGender(selectedOption);
    values.genderType = selectedOption.value;
  };

  const handleEducationLevel = (selectedOption) => {
    setEducationLevel(selectedOption);
    values.educationLevel = selectedOption.value;
  };

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
          <Select
            className="form__select"
            value={selectedGender}
            onChange={handleGender}
            options={genders}
            isSearchable={true}
            placeholder="Cinsiyet seçiniz"
          />
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
          <Select
            className="form__select"
            value={selectEducationLevel}
            onChange={handleEducationLevel}
            options={educationLevel}
            isSearchable={true}
            filterOption={(option, input) =>
              option.label
                .toLocaleLowerCase("tr")
                .includes(input.toLocaleLowerCase("tr"))
            }
            placeholder="Eğitim seviyesi seçiniz"
          />
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
          <Select
            className="form__select"
            value={selectedCity}
            onChange={handleCity}
            options={filteredCity}
            isSearchable={true}
            filterOption={(option, input) =>
              option.label
                .toLocaleLowerCase("tr")
                .includes(input.toLocaleLowerCase("tr"))
            }
            placeholder="İl seçiniz"
          />
          <ErrorMessage
            name="address.city"
            component="p"
            className="input-error"
          />
        </div>
      </div>

      <div className="form-container__content">
        <Label text="İlçe:" />
        <div className="form-container__content__input-group">
          <Select
            className="form__select"
            value={selectedDistrict}
            onChange={handleDistrict}
            options={filteredDistrict}
            isSearchable={true}
            filterOption={(option, input) =>
              option.label
                .toLocaleLowerCase("tr")
                .includes(input.toLocaleLowerCase("tr"))
            }
            placeholder="İlçe seçiniz"
          />
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

      <Button type="submit" title={buttonTitle}></Button>
    </>
  );
};

export default StudentForm;
