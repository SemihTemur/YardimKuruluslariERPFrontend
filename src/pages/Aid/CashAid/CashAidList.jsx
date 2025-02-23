import React from "react";
import Table from "../../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const CashAidList = () => {
  const datas = [
    {
      id: 1,
      soyadi: "Öztürk",
      miktar: 400.0,
      currency: "TRY",
      periyot: "Aylık",
      süre: 3,
      toplamMiktar: 1200,
      baslangicTarihi: "2025-02-18",
      bitisTarihi: "2025-05-18",
    },
  ];

  console.log(datas);

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Nakdi Bağış Alan Aileler Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
            <TableCell>Aile Adı</TableCell>
            <TableCell>Yardım Miktarı</TableCell>
            <TableCell>Para Birimi</TableCell>
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
              <TableCell>{data.miktar}</TableCell>
              <TableCell>{data.currency}</TableCell>
              <TableCell>{data.süre}</TableCell>
              <TableCell>{data.periyot}</TableCell>
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

export default CashAidList;
