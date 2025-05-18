import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteScreenDialog = ({
  openDeleteDialog,
  closeDeleteDialog,
  deleteCashDonationById,
}) => {
  return (
    <Dialog
      open={openDeleteDialog}
      onClose={closeDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ color: "black" }}>
        {"Bu kaydı silmek istediğinize emin misiniz?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bu işlem geri alınamaz!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteDialog} color="primary">
          İptal
        </Button>
        <Button onClick={deleteCashDonationById} color="error" autoFocus>
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteScreenDialog;
