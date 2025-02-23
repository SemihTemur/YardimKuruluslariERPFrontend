import React from "react";
import Table from "../../components/UI/Table/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const InventoryList = () => {
  const datas = [
    {
      id: 1,
      ürün: "Pantolon",
      adet: 3,
      birim: "Adet",
    },
  ];

  return (
    <div className="main-container">
      <h1 style={{ color: "black" }}>Envanter Listesi</h1>
      <Table>
        <TableHead>
          <TableRow className="row">
            <TableCell>Id</TableCell>
            <TableCell>Ürün</TableCell>
            <TableCell>Miktar</TableCell>
            <TableCell>Birim</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {datas.map((data, index) => (
            <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.ürün}</TableCell>
              <TableCell>{data.adet}</TableCell>
              <TableCell>{data.birim}</TableCell>
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

export default InventoryList;
