import React from "react";
import Table from "../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const StudentList = () => {
  const datas = [
    {
      id: 1,
      firstName: "Semih",
      lastName: "Temur",
      yaş: 22,
      Tc: "29660134450",
      telefon: "05414137662",
      email: "daasddas@gmail.com",
      genderType: "Erkek",
      eğitimseviyesi: "Lisans",
    },
  ];

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Öğrenciler Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
            <TableCell>Öğrenci Adı</TableCell>
            <TableCell>Öğrenci Soyadı</TableCell>
            <TableCell>Yaş</TableCell>
            <TableCell>T.C</TableCell>
            <TableCell>Telefon Numarası</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Cinsiyet</TableCell>
            <TableCell>Eğitim Seviyesi</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {datas.map((data, index) => (
            <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.firstName}</TableCell>
              <TableCell>{data.lastName}</TableCell>
              <TableCell>{data.yaş}</TableCell>
              <TableCell>{data.Tc}</TableCell>
              <TableCell>{data.telefon}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.genderType}</TableCell>
              <TableCell>{data.eğitimseviyesi}</TableCell>
              <TableCell>
                <div className="button-container">
                  <Button variant="contained" color="error">
                    Sil
                  </Button>
                  <Button variant="contained">Güncelle</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentList;
