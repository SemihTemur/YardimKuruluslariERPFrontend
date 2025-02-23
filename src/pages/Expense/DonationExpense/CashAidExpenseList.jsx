import React from "react";
import Table from "../../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const CashAidExpenseList = () => {
  const datas = [
    {
      soyadi: "Öztürk",
      toplamMiktar: 1200,
      currency: "TRY",
    },
  ];

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Nakdi Yardım Giderleri Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Aile Adı</TableCell>
            <TableCell>Toplam Yapılan Yardım Miktarı</TableCell>
            <TableCell>Para Birimi</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {datas.map((data, index) => (
            <TableRow>
              <TableCell>{data.soyadi}</TableCell>
              <TableCell>{data.toplamMiktar}</TableCell>
              <TableCell>{data.currency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CashAidExpenseList;
