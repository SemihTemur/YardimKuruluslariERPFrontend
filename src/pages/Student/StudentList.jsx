import React from "react";
import Table from "../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import useApi from "../../hooks/useApi ";
import FormikWrapper from "../../components/Form/FormikWrapper";
import { studentInitialValues } from "../../formik&yup/initalValues";
import { IoMdClose } from "react-icons/io";
import { studentYup } from "../../formik&yup/yup";
import StudentForm from "../../components/Form/StudentForm";
import { useState } from "react";

const StudentList = () => {
  const { loading, error, data, setData, makeRequest } = useApi();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([]);

  const openUpdateScreen = (student = null) => {
    setIsOpen(true);
    //güncelleme ekranı açıldığında formdaki initalValuesı guncellıyorum
    if (student == null) setSelectedStudent(studentInitialValues);
    else setSelectedStudent(student);
  };

  const closeUpdateScreen = () => {
    setIsOpen(false);
  };

  const deleteStudentById = async (id) => {
    await makeRequest("delete", "deleteStudentById", null, id);
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const updateStudentById = async (values) => {
    console.log(values.id);

    await makeRequest("put", "updateStudentById", values, values.id);

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

  const getStudentList = async () => {
    await makeRequest("get", "getStudentList");
  };

  // sayfa ilk yüklendiğinde
  useEffect(() => {
    getStudentList();
  }, []);

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Öğrenciler Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
            <TableCell>Kayıt Tarihi</TableCell>
            <TableCell>Güncelleme Tarihi</TableCell>
            <TableCell>Öğrenci Adı</TableCell>
            <TableCell>Öğrenci Soyadı</TableCell>
            <TableCell>Yaş</TableCell>
            <TableCell>T.C</TableCell>
            <TableCell>Telefon Numarası</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Cinsiyet</TableCell>
            <TableCell>Eğitim Seviyesi</TableCell>
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
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.surname}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.tckn}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.genderType}</TableCell>
                <TableCell>{item.educationLevel}</TableCell>
                <TableCell>{item.address.city}</TableCell>
                <TableCell>{item.address.district}</TableCell>
                <TableCell>{item.address.neighborhood}</TableCell>
                <TableCell>{item.address.street}</TableCell>
                <TableCell>
                  <div className="button-container">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => deleteStudentById(item.id)}
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
              process={updateStudentById}
              initialValues={selectedStudent}
              yup={studentYup}
            >
              <StudentForm />
            </FormikWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
