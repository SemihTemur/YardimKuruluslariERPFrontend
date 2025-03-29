import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import FormikWrapper from "../../Form/FormikWrapper";
import "./formDialog.css";

const FormDialog = ({
  Component,
  title,
  buttonTitle,
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  validationSchema,
  process,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      className="update-dialog"
    >
      <DialogTitle className="dialog-title">
        <span>{title}</span>
        <IconButton onClick={onClose} className="close-btn">
          <IoMdClose />
        </IconButton>
      </DialogTitle>

      <DialogContent className="dialog-content">
        <FormikWrapper
          process={onSubmit}
          initialValues={initialValues}
          yup={validationSchema}
        >
          <Component process={process} buttonTitle={buttonTitle} />
        </FormikWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
