import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/sidebarSlice";
import { IoMdHome } from "react-icons/io";
import "./header.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export const Header = () => {
  const dispatch = useDispatch();

  const clickMenu = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="header">
      <div className="header__icon-container">
        <MenuIcon onClick={clickMenu} className="menu-icon" />
      </div>

      <div className="header__content">
        <IoMdHome className="home-icon" />
        <Tooltip title="Kasadaki Para Miktarı : 5000₺">
          <IconButton>
            <AttachMoneyIcon className="saving-icon" />
          </IconButton>
        </Tooltip>

        <div className="person-content">
          <PersonIcon className="person-icon" />
          <p>Mervan Aykut</p>
        </div>
        <LogoutIcon className="logout-icon" />
      </div>
    </div>
  );
};

export default Header;
