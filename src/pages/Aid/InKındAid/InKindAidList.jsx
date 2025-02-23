import React from "react";
import Table from "../../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const InKindAidList = () => {
  const datas = [
    {
      id: 1,
      soyadi: "Öztürk",
      ürün: "Pantolon",
      miktar: 3,
      süre: 3,
      dönem: "Aylık",
      toplamMiktar: 9,
      baslangicTarihi: "2025-02-18",
      bitisTarihi: "2025-05-18",
    },
  ];

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Ayni Bağış Alan Aileler Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
            <TableCell>Aile Adı</TableCell>
            <TableCell>Ürün</TableCell>
            <TableCell>Miktar</TableCell>
            <TableCell>Süre</TableCell>
            <TableCell>Dönem</TableCell>
            <TableCell>Toplam Miktar</TableCell>
            <TableCell>Başlangıç Tarihi</TableCell>
            <TableCell>Bitiş Tarihi</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {datas.map((data, index) => (
            <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.soyadi}</TableCell>
              <TableCell>{data.ürün}</TableCell>
              <TableCell>{data.miktar}</TableCell>
              <TableCell>{data.süre}</TableCell>
              <TableCell>{data.dönem}</TableCell>
              <TableCell>{data.toplamMiktar}</TableCell>
              <TableCell>{data.baslangicTarihi}</TableCell>
              <TableCell>{data.bitisTarihi}</TableCell>
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

export default InKindAidList;
