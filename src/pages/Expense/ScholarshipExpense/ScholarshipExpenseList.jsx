import React from "react";
import Table from "../../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ScholarshipExpenseList = () => {
  const datas = [
    {
      adi: "Semih",
      soyadi: "Temur",
      miktar: 100.0,
      currency: "TRY",
    },
  ];

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Burs Giderleri Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Öğrenci Adı</TableCell>
            <TableCell>Öğrenci Soyadı</TableCell>
            <TableCell>Verilen Toplam Burs Miktarı</TableCell>
            <TableCell>Para Birimi</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {datas.map((data, index) => (
            <TableRow>
              <TableCell>{data.adi}</TableCell>
              <TableCell>{data.soyadi}</TableCell>
              <TableCell>{data.miktar}</TableCell>
              <TableCell>{data.currency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScholarshipExpenseList;
