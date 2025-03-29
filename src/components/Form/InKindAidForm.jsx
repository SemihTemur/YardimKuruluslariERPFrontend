import React, { useState, useEffect } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import useApi from "../../hooks/useApi ";
import periodType from "../../constants/periodTypes";
import { Skeleton, Box } from "@mui/material";
import Label from "../UI/Label/Label";
import Button from "../UI/Button/Button";
import Select from "react-select";

const InKindAidForm = ({ process, buttonTitle }) => {
  const { values } = useFormikContext();

  const { makeRequest } = useApi();

  const [loading, setLoading] = useState(false);

  const [familyData, setFamilyData] = useState(null);

  const [filteredFamilyName, setFilteredFamilyName] = useState([]);

  // Select'tekı secılen degerı yakalamak ıcın yazılan degısken
  const [familyInfo, setFamilyInfo] = useState(null);

  const [period, setPeriod] = useState(null);

  const [categoryData, setCategoryData] = useState(null);

  const [filteredItem, setFilteredİtem] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);

  const [filteredUnit, setFilteredUnit] = useState(null);

  const [selectedUnit, setSelectedUnit] = useState(null);

  const [firstSelected, setFirstSelected] = useState("");

  const updatedValues = () => {
    const donorData = {
      value: `${values.familyName}`,
      label: `${values.familyName}`,
    };

    const itemData = {
      value: values.category.itemName,
      label: values.category.itemName,
    };

    const unitData = {
      value: values.category.unit,
      label: values.category.unit,
    };

    const periodData = {
      value: values.period,
      label: values.period,
    };

    setFamilyInfo(donorData);

    setSelectedItem(itemData);
    setSelectedUnit(unitData);

    setPeriod(periodData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familyData = await makeRequest("get", "getFamilyNamesList");
        setFamilyData(familyData);

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
      const familyName = familyData.map((item) => ({
        value: `${item.familyName}`,
        label: `${item.familyName}`, // React Select için uygun formatta düzenleme
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

      setFilteredFamilyName(familyName);
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
    if (loading && familyInfo) {
      values.familyName = familyInfo.value;
    }
  }, [familyInfo]);

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

  useEffect(() => {
    if (loading && period) {
      values.period = period.value;
    }
  }, [period]);

  const handleFamilyName = (selectedOption) => {
    setFamilyInfo(selectedOption);
  };

  const handleItem = (selectedOption) => {
    setSelectedItem(selectedOption);
    if (!firstSelected) setFirstSelected("item");
  };

  const handleUnit = (selectedOption) => {
    setSelectedUnit(selectedOption);
    if (!firstSelected) setFirstSelected("unit");
  };

  const handlePeriod = (selectedOption) => {
    setPeriod(selectedOption);
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
            <Label text="Aile Bilgileri:" />
            <div className="form-container__content__input-group">
              <Select
                className="form__select"
                value={familyInfo}
                onChange={handleFamilyName}
                options={filteredFamilyName}
                isSearchable={true}
                placeholder="Aile seçiniz"
              />
              <ErrorMessage
                name="familyName"
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
            <Label text="Yardım Miktarı:" />
            <div className="form-container__content__input-group">
              <Field type="text" name="quantity" className="form__input" />
              <ErrorMessage
                name="quantity"
                component="p"
                className="input-error"
              />
            </div>
          </div>

          <div className="form-container__content">
            <Label text="Süre:" />
            <div className="form-container__content__input-group">
              <Field type="text" name="duration" className="form__input" />
              <ErrorMessage
                name="duration"
                component="p"
                className="input-error"
              />
            </div>
          </div>

          <div className="form-container__content">
            <Label text="Dönem:" />
            <div className="form-container__content__input-group">
              <Select
                className="form__select"
                value={period}
                onChange={handlePeriod}
                options={periodType}
                isSearchable={true}
                filterOption={(option, input) =>
                  option.label
                    .toLocaleLowerCase("tr")
                    .includes(input.toLocaleLowerCase("tr"))
                }
                placeholder="Dönem seçiniz"
              />
              <ErrorMessage
                name="period"
                component="p"
                className="input-error"
              />
            </div>
          </div>

          <Button type="submit" title={buttonTitle}></Button>
        </>
      )}
    </>
  );
};

export default InKindAidForm;
