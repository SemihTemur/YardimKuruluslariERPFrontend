import React, { useState } from "react";
import "../Login/forgotPassword.css";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi ";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // gondere bastı mı basmadı mı onun ıcın
  const [submitted, setSubmitted] = useState(false);

  // gelecek olan mesajı gostermek ıcın
  const [message, setMessage] = useState();
  // css için success error kısmı ıcın
  const [state, setState] = useState(false);

  // yukleme ekranı
  const [loading, setLoading] = useState(null);

  const { makeRequest } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    const emailRequest = {
      email: email,
    };
    try {
      const response = await makeRequest(
        "post",
        "password-reset",
        emailRequest
      );
      setMessage(response.data);
      setState(true);
      setLoading(false);
    } catch (error) {
      setState(false);
      setMessage(error.response.data.data);
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Şifremi Unuttum</h2>

        <form onSubmit={handleSubmit}>
          <div className="forgot-input-group">
            <EmailIcon className="forgot-input-icon" />
            <input
              type="email"
              placeholder="Kayıtlı email adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {setSubmitted && (
            <p className={state ? "success-message" : "error-message"}>
              {message}
            </p>
          )}
          <button className="forgot-button" type="submit">
            Gönder
          </button>
        </form>

        <div className="back-to-login">
          <Link to="/">Giriş Ekranına Dön</Link>
        </div>
      </div>
      {loading && (
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
          BackdropProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // İsteğe bağlı: ekranı hafif karartır
            },
          }}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <h1 style={{ textAlign: "center", margin: "0px", color: "#fff" }}>
                Gönderiliyor...
              </h1>
            </DialogContentText>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <CircularProgress />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ForgotPassword;
