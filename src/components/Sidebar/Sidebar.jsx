import React, { useState } from "react";
import "./sidebar.css";
import yardimLogo from "../../assets/images/yardimLogo.png";
import menuItems from "../../constants/menuItem";
import SidebarItem from "../SidebarItem/SidebarItem";
import { useDispatch, useSelector } from "react-redux";
import { activeSidebar } from "../../redux/sidebarSlice";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const { collapsed } = useSelector((store) => store.sidebar);
  const dispatch = useDispatch();

  const hoverSidebar = () => {
    dispatch(activeSidebar());
  };

  return (
    <div
      className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}
      onMouseEnter={hoverSidebar}
    >
      <div
        className={`sidebar__logo ${
          collapsed ? "sidebar__logo--collapsed" : ""
        }`}
      >
        <img src={yardimLogo} alt="logo" />
        <p className="sidebar__logo__title">Temur Yardım Derneği</p>
        <hr className="sidebar__logo__underline" />
      </div>
      <nav className="navbar">
        <ul className="navbar__list">
          {menuItems.map((menuItem, index) => (
            <SidebarItem
              key={index}
              menuItem={menuItem}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              index={index}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
