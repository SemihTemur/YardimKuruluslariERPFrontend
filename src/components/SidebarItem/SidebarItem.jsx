import React, { useEffect } from "react";
import SidebarSubItem from "../SidebarSubItem/SidebarSubItem.jsx";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import "./sidebar-item.css";
import { Link } from "react-router-dom";

export const SidebarItem = ({
  menuItem,
  setActiveIndex,
  activeIndex,
  index,
  collapsed,
}) => {
  const [subActiveIndex, setSubActiveIndex] = useState(null);

  useEffect(() => {
    if (collapsed) {
      setActiveIndex(null);
      setSubActiveIndex(null);
      setChangeColor(null);
    }
  }, [collapsed]);

  // to change the color of the p element
  const [changeColor, setChangeColor] = useState(null);

  const toggleAccordian = () => {
    setActiveIndex((prev) => (prev === index ? null : index));
    // To close the child elements
    setSubActiveIndex(null);
    setChangeColor(null);
    console.log(subActiveIndex);
  };

  const Wrapper = menuItem.url ? Link : "li";

  return (
    <Wrapper to ={menuItem.subItems ? undefined : menuItem.url} className="navbar__list-item">
      <div
        className={`navbar__item-container ${
          menuItem.subItems && activeIndex === index ? "navbar__item--gray" : ""
        }`}
        onClick={() => toggleAccordian()}
      >
        <div className="navbar__item-container-icon-text">
          {menuItem.icon}
          <p
            className={`navbar__text ${
              collapsed ? "navbar__text--collapsed" : ""
            }`}
          >
            {menuItem.menu}
          </p>
        </div>
        <div
          className={`navbar__item-container-arrow-icon ${
            collapsed ? "navbar__item-container-arrow-icon--collapsed" : ""
          }`}
        >
          {menuItem.subItems && (
            <MdArrowForwardIos
              className={`${
                activeIndex === index
                  ? "navbar__button navbar__button--transform"
                  : "navbar__button"
              }`}
            />
          )}
        </div>
      </div>

      {menuItem.subItems && (
        <ul
          className={`navbar__sub ${
            activeIndex === index ? "navbar__sub--open" : "navbar__sub--close"
          }`}
        >
          {menuItem.subItems.map((subItem, subIndex) => (
            <SidebarSubItem
              key={subIndex}
              subItem={subItem}
              subIndex={subIndex}
              subActiveIndex={subActiveIndex}
              setSubActiveIndex={setSubActiveIndex}
              changeColor={changeColor}
              setChangeColor={setChangeColor}
            />
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

export default SidebarItem;
