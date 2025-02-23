import React from "react";
import Table from "../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const DonorList = () => {
  const datas = [
    {
      id: 1,
      firstName: "Mervan",
      lastName: "Aykut",
      phoneNumber: "05447898448",
      email: "aykutmervan05@gmail.com",
      genderType: "Erkek",
      city: "Hakkari",
      district: "YüksekOva",
      neighborhood: "Aykut Mahallesi",
      street: "Kral Caddesi No: 55",
    },
  ];

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Bağışçılar Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
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
          {datas.map((data, index) => (
            <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.firstName}</TableCell>
              <TableCell>{data.lastName}</TableCell>
              <TableCell>{data.phoneNumber}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.genderType}</TableCell>
              <TableCell>{data.city}</TableCell>
              <TableCell>{data.district}</TableCell>
              <TableCell>{data.neighborhood}</TableCell>
              <TableCell>{data.street}</TableCell>
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

export default DonorList;
