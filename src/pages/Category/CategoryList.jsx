import React from "react";
import Table from "../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { categoryInitialValues } from "../../formik&yup/initalValues";
import { categoryYup } from "../../formik&yup/yup";
import CategoryForm from "../../components/Form/CategoryForm";
import useApi from "../../hooks/useApi ";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import FormikWrapper from "../../components/Form/FormikWrapper";

const CategoryList = () => {
  const { loading, error, data, setData, makeRequest } = useApi();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const openUpdateScreen = (category = null) => {
    setIsOpen(true);
    //güncelleme ekranı açıldığında formdaki initalValuesı guncellıyorum
    if (category == null) setSelectedCategory(categoryInitialValues);
    else setSelectedCategory(category);
  };

  const closeUpdateScreen = () => {
    setIsOpen(false);
  };

  const deleteCategoryById = async (id) => {
    await makeRequest("delete", "deleteCategoryById", null, id);
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const updateCategoryById = async (values) => {
    console.log(values.id);

    await makeRequest("put", "updateCategoryById", values, values.id);

    const updatedData = data.map((item) => {
      if (item.id === values.id) {
        return { ...item, ...values };
      }
      return item;
    });

    setData(updatedData);
  };

  const getCategoryList = async () => {
    await makeRequest("get", "getCategoryList");
  };

  // sayfa ilk yüklendiğinde
  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Tür Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
            <TableCell>Kayıt Tarihi</TableCell>
            <TableCell>Güncelleme Tarihi</TableCell>
            <TableCell>Ürün</TableCell>
            <TableCell>Birim</TableCell>
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
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>
                  <div className="button-container">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteCategoryById(item.id)}
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
              process={updateCategoryById}
              initialValues={selectedCategory}
              yup={categoryYup}
            >
              {(formik) => <CategoryForm formik={formik} />}
            </FormikWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
