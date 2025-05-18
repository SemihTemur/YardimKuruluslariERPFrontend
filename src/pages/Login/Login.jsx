import React, { useState } from "react";
import "../Login/login.css";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi ";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice";

const Login = () => {
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState();

  const [error, setError] = useState(true);

  const navigate = useNavigate();

  const { makeRequest } = useApi();

  const dispatch = useDispatch();

  const goToHomePage = () => {
    login();
  };

  const login = async () => {
    const loginRequest = {
      email: email,
      password: password,
    };
    try {
      const response = await makeRequest("post", "login", loginRequest);
      dispatch(setToken(response.data));
      navigate("/home");
    } catch (error) {
      console.log(error);
      setError(false);
    }
  };

  return (
    <>
      <h1 className="title">Temur Yardım Derneği</h1>
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h2 className="admin-login-title">Admin Panel Girişi</h2>
          <div className="admin-input-group">
            <EmailIcon className="admin-input-icon" />
            <input
              type="email"
              placeholder="Email adresiniz"
              onChange={(e) => setEmail(e.target.value)}
            />
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
          {!error && <p className="errorMessage">Yanlış e-posta veya şifre</p>}
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
