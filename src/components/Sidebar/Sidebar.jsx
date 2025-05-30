import React, { useState } from "react";
import "./sidebar.css";
import yardimLogo from "../../assets/images/yardimLogo.png";
import menuItems from "../../constants/menuItem";
import SidebarItem from "../SidebarItem/SidebarItem";
import { MdArrowForwardIos } from "react-icons/md";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const closeSidebar = () => {
    setCollapsed(true);
  };

  console.log(collapsed);

  return (
    <div className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
      <MdArrowForwardIos
        className={`closeMenu ${collapsed ? "closeMenu--collapsed" : ""}`}
        onClick={closeSidebar}
      />
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
              name={menuItem?.name ?? null}
              menuItem={menuItem}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              index={index}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
