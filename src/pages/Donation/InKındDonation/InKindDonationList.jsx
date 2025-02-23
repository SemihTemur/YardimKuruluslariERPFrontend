import React from "react";
import Table from "../../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const InKindDonationList = () => {
  const datas = [
    {
      id: 1,
      adi: "Mervan",
      soyadi: "Aykut",
      ürün: "Pantolon",
      birim: "Adet",
      miktar: 5000.0,
    },
    {
      id: 1,
      adi: "Mervan",
      soyadi: "Aykut",
      ürün: "Pantolon",
      birim: "Adet",
      miktar: 5000.0,
    },
  ];

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Ayni Bağış Yapanlar Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
            <TableCell>Bağışçı Adı</TableCell>
            <TableCell>Bağışçı Soyadı</TableCell>
            <TableCell>Ürün</TableCell>
            <TableCell>Birim</TableCell>
            <TableCell>Miktar</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {datas.map((data, index) => (
            <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.adi}</TableCell>
              <TableCell>{data.soyadi}</TableCell>
              <TableCell>{data.ürün}</TableCell>
              <TableCell>{data.birim}</TableCell>
              <TableCell>{data.miktar}</TableCell>
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

export default InKindDonationList;
