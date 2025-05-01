import React, { useState } from "react";
import "../Login/login.css";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/home");
  };

  return (
    <>
      <h1 className="title">Temur Yardım Derneği</h1>
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h2 className="admin-login-title">Admin Panel Girişi</h2>
          <div className="admin-input-group">
            <EmailIcon className="admin-input-icon" />
            <input type="email" placeholder="Email adresiniz" />
          </div>
          <div className="admin-input-group">
            <KeyIcon className="admin-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Şifreniz"
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityOff
                className="visible"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <Visibility
                className="visible"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>
          <div className="admin-forgot-password">
            <Link to="/forgot-password">Şifremi unuttum?</Link>
          </div>
          <button className="admin-login-button" onClick={goToHomePage}>
            Giriş Yap
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
