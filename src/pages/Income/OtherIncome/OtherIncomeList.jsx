import React from "react";
import Table from "../../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const OtherIncomeList = () => {
  const datas = [
    {
      id: 1,
      açıklama: "Sponsor Gelirleri",
      miktar: 5000.0,
      currency: "TRY",
      gelirTarihi: "2025-01-01",
    },
  ];

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Diğer Gelirler Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
            <TableCell>Açıklama</TableCell>
            <TableCell>Miktar</TableCell>
            <TableCell>Para Birimi</TableCell>
            <TableCell>Gelir Tarihi</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {datas.map((data, index) => (
            <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.açıklama}</TableCell>
              <TableCell>{data.miktar}</TableCell>
              <TableCell>{data.currency}</TableCell>
              <TableCell>{data.gelirTarihi}</TableCell>
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

export default OtherIncomeList;
