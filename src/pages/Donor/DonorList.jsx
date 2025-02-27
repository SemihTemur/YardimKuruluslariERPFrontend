import React from "react";
import Table from "../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { donorInitialValues } from "../../formik&yup/initalValues";
import { donorYup } from "../../formik&yup/yup";
import DonorForm from "../../components/Form/DonorForm";
import { IoMdClose } from "react-icons/io";
import useApi from "../../hooks/useApi ";
import FormikWrapper from "../../components/Form/FormikWrapper";
import { useState, useEffect } from "react";

const DonorList = () => {
  const { loading, error, data, setData, makeRequest } = useApi();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState([]);

  const openUpdateScreen = (donor = null) => {
    setIsOpen(true);
    //güncelleme ekranı açıldığında formdaki initalValuesı guncellıyorum
    if (donor == null) setSelectedDonor(donorInitialValues);
    else setSelectedDonor(donor);
  };

  const closeUpdateScreen = () => {
    setIsOpen(false);
  };

  const deleteDonorById = async (id) => {
    await makeRequest("delete", "deleteDonorById", null, id);
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const updateDonorById = async (values) => {
    console.log(values.id);

    await makeRequest("put", "updateDonorById", values, values.id);

    const updatedData = data.map((item) => {
      if (item.id === values.id) {
        return { ...item, ...values };
      }
      return item;
    });

    setData(updatedData);
  };

  const getDonorList = async () => {
    await makeRequest("get", "getDonorList");
  };

  // sayfa ilk yüklendiğinde
  useEffect(() => {
    getDonorList();
  }, []);

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Bağışçılar Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
            <TableCell>Kayıt Tarihi</TableCell>
            <TableCell>Güncelleme Tarihi</TableCell>
            <TableCell>Bağışçı Adı</TableCell>
            <TableCell>Bağışçı Soyadı</TableCell>
            <TableCell>Telefon Numarası</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Cinsiyet</TableCell>
            <TableCell>İl</TableCell>
            <TableCell>İlçe</TableCell>
            <TableCell>Mahalle</TableCell>
            <TableCell>Sokak</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data &&
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.createdDate}</TableCell>
                <TableCell>{item.modifiedDate}</TableCell>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.genderType}</TableCell>
                <TableCell>{item.address.city}</TableCell>
                <TableCell>{item.address.district}</TableCell>
                <TableCell>{item.address.neighborhood}</TableCell>
                <TableCell>{item.address.street}</TableCell>
                <TableCell>
                  <div className="button-container">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => deleteDonorById(item.id)}
                    >
                      Sil
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => openUpdateScreen(item)}
                    >
                      Güncelle
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {isOpen && (
        <div className="overlay">
          <div className="pop-up">
            <IoMdClose className="close" onClick={closeUpdateScreen} />
            <FormikWrapper
              process={updateDonorById}
              initialValues={selectedDonor}
              yup={donorYup}
            >
              {(formik) => <DonorForm formik={formik} />}
            </FormikWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorList;
