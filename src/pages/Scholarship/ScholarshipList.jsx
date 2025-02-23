import React from "react";
import Table from "../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const ScholarshipList = () => {
  const datas = [
    {
      id: 1,
      adi: "Semih",
      soyadi: "Temur",
      miktar: 20.0,
      currency: "TRY",
      periyot: "Aylık",
      süre: 5,
      baslangicTarihi: "2025-01-01",
      bitisTarihi: "2025-06-01",
      toplamBagisMiktari: 100.0,
    },
  ];

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Burs Alan Öğrenciler Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
            <TableCell>Öğrenci Adı</TableCell>
            <TableCell>Öğrenci Soyadı</TableCell>
            <TableCell>Burs Miktarı</TableCell>
            <TableCell>Para Birimi</TableCell>
            <TableCell>Süre</TableCell>
            <TableCell>Dönem</TableCell>
            <TableCell>Toplam Miktar</TableCell>
            <TableCell>Başlama Tarihi</TableCell>
            <TableCell>Bitiş Tarihi</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {datas.map((data, index) => (
            <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.adi}</TableCell>
              <TableCell>{data.soyadi}</TableCell>
              <TableCell>{data.miktar}</TableCell>
              <TableCell>{data.currency}</TableCell>
              <TableCell>{data.süre}</TableCell>
              <TableCell>{data.periyot}</TableCell>
              <TableCell>{data.toplamBagisMiktari}</TableCell>
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

export default ScholarshipList;
