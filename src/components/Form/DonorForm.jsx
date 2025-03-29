import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import cityDistricts from "../../constants/cityDistricts";
import genders from "../../constants/genders";
import Label from "../UI/Label/Label";
import Button from "../UI/Button/Button";
import Select from "react-select";

const DonorForm = ({ process, buttonTitle }) => {
  const { values } = useFormikContext();
  const [filteredCity, setFilteredCity] = useState([]);
  const [filteredDistrict, setFilteredDistrict] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

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

    setSelectedCity(updateSelectCity);
    setSelectedDistrict(updateSelectDistrict);
    setSelectedGender(updateSelectGender);
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
          <Select
            className="form__select"
            value={selectedGender}
            onChange={handleGender}
            options={genders}
            isSearchable={true}
            filterOption={(option, input) =>
              option.label
                .toLocaleLowerCase("tr")
                .includes(input.toLocaleLowerCase("tr"))
            }
            placeholder="Cinsiyet seçin"
          />
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
            placeholder="İl seçin"
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
            filterOption={(option, input) =>
              option.label
                .toLocaleLowerCase("tr")
                .includes(input.toLocaleLowerCase("tr"))
            }
            isSearchable={true}
            placeholder="İlçe seçin"
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

export default DonorForm;
