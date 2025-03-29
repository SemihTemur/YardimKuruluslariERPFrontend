import React, { useState, useEffect } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import useApi from "../../hooks/useApi ";
import currencyType from "../../constants/currencyType";
import periodType from "../../constants/periodTypes";
import { Skeleton, Box } from "@mui/material";
import Label from "../UI/Label/Label";
import Button from "../UI/Button/Button";
import Select from "react-select";

const ScholarshipForm = ({ process, buttonTitle }) => {
  const { values } = useFormikContext();

  const [filteredFamilyames, setFilteredFamilyNames] = useState([]);

  const { makeRequest } = useApi();

  const [familyData, setFamilyData] = useState(null);

  const [loading, setLoading] = useState(false);

  // Select'tekı secılen degerı yakalamak ıcın yazılan degısken
  const [familyInfo, setFamilyInfo] = useState(null);

  const [period, setPeriod] = useState(null);

  const updatedValues = () => {
    const familyData = {
      value: `${values.familyName}`,
      label: `${values.familyName}`,
    };

    const periodData = {
      value: values.period,
      label: values.period,
    };

    setFamilyInfo(familyData);

    setPeriod(periodData);
  };

  // veriyi sunucudan çekiyorum.
  useEffect(() => {
    // kayıtlı bagıscı ısım ve soyısımlerı al
    const getDonorNames = async () => {
      try {
        const data = await makeRequest("get", "getFamilyNamesList");
        setFamilyData(data);
        setLoading(true);
      } catch (error) {
        console.error("Veri alınırken hata oluştu", error);
      }
    };

    getDonorNames();
  }, []);

  // gelen veriyi select 2'ye uygun hala getırıyorum.ve filteredDonorName'e aktarıyorum
  useEffect(() => {
    if (loading) {
      const familyNames = familyData.map((item) => ({
        value: `${item.familyName}`,
        label: `${item.familyName}`, // React Select için uygun formatta düzenleme
      }));

      setFilteredFamilyNames(familyNames);
      console.log(process);
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
    if (loading && period) {
      values.period = period.value;
    }
  }, [period]);

  const handleFamilyNames = (selectedOption) => {
    setFamilyInfo(selectedOption);
    console.log(familyInfo);
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
                onChange={handleFamilyNames}
                options={filteredFamilyames}
                isSearchable={true}
                filterOption={(option, input) =>
                  option.label
                    .toLocaleLowerCase("tr")
                    .includes(input.toLocaleLowerCase("tr"))
                }
                placeholder="Bağışçı seçiniz"
              />
              <ErrorMessage
                name="familyName"
                component="p"
                className="input-error"
              />
            </div>
          </div>

          <div className="form-container__content">
            <Label text="Yardım Miktarı:" />
            <div className="form-container__content__input-group">
              <Field type="text" name="aidAmount" className="form__input" />
              <ErrorMessage
                name="aidAmount"
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

          <Button type="submit" title={buttonTitle}></Button>
        </>
      )}
    </>
  );
};

export default ScholarshipForm;
