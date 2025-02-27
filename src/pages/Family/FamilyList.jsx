import React, { useState } from "react";
import Table from "../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import useApi from "../../hooks/useApi ";
import FormikWrapper from "../../components/Form/FormikWrapper";
import { familyInitialValues } from "../../formik&yup/initalValues";
import { IoMdClose } from "react-icons/io";
import FamilyForm from "../../components/Form/FamilyForm";
import { familyYup } from "../../formik&yup/yup";

export const FamilyList = () => {
  const { loading, error, data, setData, makeRequest } = useApi();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState([]);

  const openUpdateScreen = (family = null) => {
    setIsOpen(true);
    //güncelleme ekranı açıldığında formdaki initalValuesı guncellıyorum
    if (family == null) setSelectedFamily(familyInitialValues);
    else setSelectedFamily(family);
  };

  const closeUpdateScreen = () => {
    setIsOpen(false);
  };

  const deleteFamilyById = async (id) => {
    await makeRequest("delete", "deleteFamilyById", null, id);
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const updateFamilyById = async (values) => {
    console.log(values.id);

    await makeRequest("put", "updateFamilyById", values, values.id);

    const updatedData = data.map((item) => {
      if (item.id === values.id) {
        // elimle tarihi güncelliyorum.
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        values.modifiedDate = formattedDate;

        return { ...item, ...values };
      }
      return item;
    });

    setData(updatedData);
  };

  const getFamilyList = async () => {
    await makeRequest("get", "getFamilyList");
  };

  // sayfa ilk yüklendiğinde
  useEffect(() => {
    getFamilyList();
  }, []);

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Aileler Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
            <TableCell>Kayıt Tarihi</TableCell>
            <TableCell>Güncelleme Tarihi</TableCell>
            <TableCell>Aile Adı</TableCell>
            <TableCell>Aile Üye Sayısı</TableCell>
            <TableCell>Telefon Numarası</TableCell>
            <TableCell>Email</TableCell>
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
                <TableCell>{item.familyName}</TableCell>
                <TableCell>{item.familyMemberCount}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address.city}</TableCell>
                <TableCell>{item.address.district}</TableCell>
                <TableCell>{item.address.neighborhood}</TableCell>
                <TableCell>{item.address.street}</TableCell>
                <TableCell>
                  <div className="button-container">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => deleteFamilyById(item.id)}
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
              process={updateFamilyById}
              initialValues={selectedFamily}
              yup={familyYup}
            >
              <FamilyForm />
            </FormikWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyList;
