import React, { useEffect, useState } from "react";
import "./profil.css";
import { useSelector } from "react-redux";
import useApi from "../../hooks/useApi ";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { makeRequest } = useApi();

  useEffect(() => {
    setName(user.displayUsername);
    setEmail(user.email);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  const updateUser = async () => {
    if (!name || !email || !password) {
      setErrorMessage("Tüm bilgilerin girilmesi zorunludur");
    } else {
      const values = {
        userName: name,
        email: email,
        password: password,
      };
      try {
        const { data } = await makeRequest(
          "putWithNoId",
          "updateProfile",
          values
        );
        toast.success(data);

        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/");
        }, 2000);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.data ||
          "Profil güncellenirken bir hata oluştu.";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <div className="profil-container">
        <h2>Profil Bilgileri</h2>
        <form className="profil-form" onSubmit={handleSubmit}>
          <div className="profil-item">
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Kullanıcı adınızı girin"
            />
          </div>
          <div className="profil-item">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email adresinizi girin"
            />
          </div>
          <div className="profil-item">
            <label>Şifre</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
            />
          </div>
          {setErrorMessage && <p className="errorMessage">{errorMessage}</p>}
          <button type="submit" className="save-button">
            Güncelle
          </button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Profil;
