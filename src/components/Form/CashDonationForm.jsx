import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import Label from "../UI/Label/Label";
import Button from "../UI/Button/Button";
import useApi from "../../hooks/useApi ";
import { toast } from "react-hot-toast";
import { Skeleton, Box } from "@mui/material";
import Select from "react-select";

const CashDonationForm = ({ process, buttonTitle }) => {
  const { values } = useFormikContext();

  const [filteredDonorName, setFilteredDonorName] = useState([]);

  const { makeRequest } = useApi();

  const [donorData, setDonorData] = useState(null);

  const [loading, setLoading] = useState(false);

  // Select'tekı secılen degerı yakalamak ıcın yazılan degısken
  const [donorInfo, setDonorInfo] = useState(null);

  // veriyi sunucudan çekiyorum.
  useEffect(() => {
    // kayıtlı bagıscı ısım ve soyısımlerı al

    const getDonorNames = async () => {
      try {
        const data = await makeRequest("get", "getDonorNameAndSurnameList");
        setDonorData(data);
        setLoading(true);
      } catch (error) {
        toast.error("Veri alınırken hata oluştu", error);
      }
    };

    getDonorNames();
  }, []);

  // gelen veriyi select 2'ye uygun hala getırıyorum.ve filteredDonorName'e aktarıyorum
  useEffect(() => {
    if (loading) {
      const donorNames = donorData.map((item) => ({
        value: `${item.donorFirstName} ${item.donorLastName}`,
        label: `${item.donorFirstName} ${item.donorLastName}`, // React Select için uygun formatta düzenleme
      }));

      setFilteredDonorName(donorNames);
      console.log(process);
      // eüer işlem update ise başlangıcta kaydedılen degerı goster guncelleme ekranında
      if (process === "update") {
        console.log(values.donorLastName);
        const data = {
          value: `${values.donorFirstName} ${values.donorLastName}`,
          label: `${values.donorFirstName} ${values.donorLastName}`,
        };
        setDonorInfo(data);
      }

      console.log(donorInfo);
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

  const handleChange = (selectedOption) => {
    setDonorInfo(selectedOption);
    console.log(donorInfo);
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
                onChange={handleChange}
                options={filteredDonorName}
                isSearchable={true}
                filterOption={(option, input) =>
                  option.label
                    .toLocaleLowerCase("tr")
                    .includes(input.toLocaleLowerCase("tr"))
                }
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
            <Label text="Yardım Miktarı:" />
            <div className="form-container__content__input-group">
              <Field type="text" name="amount" className="form__input" />
              <ErrorMessage
                name="amount"
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

export default CashDonationForm;
