import React, { useState } from "react";
import "../Login/forgotPassword.css";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gerçek uygulamada backend'e gönderilir.
    // Örneğin: axios.post('/api/forgot-password', { email })

    setSubmitted(true); // Simülasyon için
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Şifremi Unuttum</h2>
        {submitted ? (
          <div className="success-message">
            Yeni şifreniz e-posta adresinize gönderildi.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="forgot-input-group">
              <EmailIcon className="forgot-input-icon" />
              <input
                type="email"
                placeholder="Kayıtlı email adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="forgot-button" type="submit">
              Gönder
            </button>
          </form>
        )}
        <div className="back-to-login">
          <Link to="/">Giriş Ekranına Dön</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
