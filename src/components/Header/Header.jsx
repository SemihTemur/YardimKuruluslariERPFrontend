import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCashBalance } from "../../redux/cashSlice";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { IoMdHome } from "react-icons/io";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "./header.css";

export const Header = ({ setCollapsed }) => {
  const cashBalance = useSelector((state) => state.cash);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const clickMenu = () => {
    console.log("semih");
    setCollapsed((prev) => !prev);
  };

  const goToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getCashBalance());
  }, []);

  return (
    <div className="header">
      <div className="header__icon-container">
        <MenuIcon onClick={clickMenu} id="menu-icon" />
      </div>

      <div className="header__content">
        <IoMdHome className="home-icon" onClick={goToHome} />
        <Tooltip title={`Kasadaki para miktarı:${cashBalance.amount}₺`}>
          <IconButton>
            <AttachMoneyIcon id="saving-icon" />
          </IconButton>
        </Tooltip>

        <div className="person-content">
          <PersonIcon id="person-icon" />
          <p>Mervan Aykut</p>
        </div>
        <LogoutIcon id="logout-icon" />
      </div>
    </div>
  );
};

export default Header;
