import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi ";
import { Field, ErrorMessage, useFormikContext } from "formik";
import Label from "../UI/Label/Label";
import Button from "../UI/Button/Button";
import { Skeleton, Box } from "@mui/material";
import Select from "react-select";

const InKindDonationForm = ({ process, buttonTitle }) => {
  const { values } = useFormikContext();

  const { makeRequest } = useApi();

  const [loading, setLoading] = useState(false);

  const [donorData, setDonorData] = useState(null);

  const [filteredDonorName, setFilteredDonorName] = useState([]);

  // Select'tekı secılen degerı yakalamak ıcın yazılan degısken
  const [donorInfo, setDonorInfo] = useState(null);

  const [categoryData, setCategoryData] = useState(null);

  const [filteredItem, setFilteredİtem] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);

  const [filteredUnit, setFilteredUnit] = useState(null);

  const [selectedUnit, setSelectedUnit] = useState(null);

  const [firstSelected, setFirstSelected] = useState("");

  const updatedValues = () => {
    const donorData = {
      value: `${values.donorFirstName} ${values.donorLastName}`,
      label: `${values.donorFirstName} ${values.donorLastName}`,
    };

    const itemData = {
      value: values.category.itemName,
      label: values.category.itemName,
    };

    const unitData = {
      value: values.category.unit,
      label: values.category.unit,
    };
    setDonorInfo(donorData);
    setSelectedItem(itemData);
    setSelectedUnit(unitData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorData = await makeRequest(
          "get",
          "getDonorNameAndSurnameList"
        );
        setDonorData(donorData);

        const categoryData = await makeRequest(
          "get",
          "getCategoryItemNameAndUnitList"
        );
        setCategoryData(categoryData);
        setLoading(true);
      } catch (error) {
        console.error("Veri alınırken hata oluştu", error);
      }
    };
    fetchData();
  }, []);

  // gelen veriyi select 2'ye uygun hala getırıyorum.ve filteredDonorName'e aktarıyorum
  useEffect(() => {
    if (loading) {
      const donorNames = donorData.map((item) => ({
        value: `${item.donorFirstName} ${item.donorLastName}`,
        label: `${item.donorFirstName} ${item.donorLastName}`, // React Select için uygun formatta düzenleme
      }));

      const itemNames = [
        ...new Map(
          categoryData.map((item) => [
            item.itemName,
            { value: item.itemName, label: item.itemName },
          ])
        ).values(),
      ];

      const unitNames = [
        ...new Map(
          categoryData.map((item) => [
            item.unit,
            { value: item.unit, label: item.unit },
          ])
        ).values(),
      ];

      setFilteredDonorName(donorNames);
      setFilteredİtem(itemNames);
      setFilteredUnit(unitNames);

      // eüer işlem update ise başlangıcta kaydedılen degerı goster guncelleme ekranında
      if (process === "update") {
        updatedValues();
      }
    }
  }, [loading]);

  // donorInfo secildiğinde select kısmında formik'teki yapıyı aktarıyorum,değerleri ayırıp
  useEffect(() => {
    // veriler gelmeden çalışmaması ıcın loading kontrolu yapıyorum
    if (loading && donorInfo) {
      values.donorFirstName = donorInfo.value.split(" ")[0];
      values.donorLastName = donorInfo.value.split(" ")[1];
    }
  }, [donorInfo]);

  useEffect(() => {
    if (loading && selectedItem) {
      if (firstSelected === "item") {
        setSelectedUnit(null);
        const filteredUnit = categoryData
          .filter((item) => selectedItem.value === item.itemName)
          .map((item) => ({ value: item.unit, label: item.unit }));

        setFilteredUnit(filteredUnit);
      }

      values.category.itemName = selectedItem.value;
    }
  }, [selectedItem]);

  useEffect(() => {
    if (loading && selectedUnit) {
      if (firstSelected === "unit") {
        setSelectedItem(null);
        const filteredUnit = categoryData
          .filter((item) => selectedUnit.value === item.unit)
          .map((item) => ({ value: item.itemName, label: item.itemName }));

        setFilteredUnit(filteredUnit);
      }

      values.category.unit = selectedUnit.value;
    }
  }, [selectedUnit]);

  const handleDonorNames = (selectedOption) => {
    setDonorInfo(selectedOption);
    console.log(donorInfo);
  };

  const handleItem = (selectedOption) => {
    setSelectedItem(selectedOption);
    if (!firstSelected) setFirstSelected("item");
  };

  const handleUnit = (selectedOption) => {
    setSelectedUnit(selectedOption);
    if (!firstSelected) setFirstSelected("unit");
  };

  return (
    <>
      {!loading ? (
        <Box className="loading_screen">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      ) : (
        <>
          <div className="form-container__content">
            <Label text="Bağışçı Bilgileri:" />
            <div className="form-container__content__input-group">
              <Select
                className="form__select"
                value={donorInfo}
                onChange={handleDonorNames}
                options={filteredDonorName}
                isSearchable={true}
                placeholder="Bağışçı seçiniz"
              />
              <ErrorMessage
                name="donorFirstName"
                component="p"
                className="input-error"
              />
            </div>
          </div>

          <div className="form-container__content">
            <Label text="Ürün:" />
            <div className="form-container__content__input-group">
              <Select
                className="form__select"
                value={selectedItem}
                onChange={handleItem}
                options={filteredItem}
                isSearchable={true}
                placeholder="Ürün seçiniz"
              />
              <ErrorMessage
                name="category.itemName"
                component="p"
                className="input-error"
              />
            </div>
          </div>

          {/* İlçe */}
          <div className="form-container__content">
            <Label text="Birim:" />
            <div className="form-container__content__input-group">
              <Select
                className="form__select"
                value={selectedUnit}
                onChange={handleUnit}
                options={filteredUnit}
                isSearchable={true}
                placeholder="Birim seçiniz"
              />
              <ErrorMessage
                name="category.unit"
                component="p"
                className="input-error"
              />
            </div>
          </div>

          <div className="form-container__content">
            <Label text="Miktar:" />
            <div className="form-container__content__input-group">
              <Field type="text" name="quantity" className="form__input" />
              <ErrorMessage
                name="quantity"
                component="p"
                className="input-error"
              />
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
              <ErrorMessage
                name="currency"
                component="p"
                className="input-error"
              />
            </div>
          </div> */}

          <Button type="submit" title={buttonTitle}></Button>
        </>
      )}
    </>
  );
};

export default InKindDonationForm;
