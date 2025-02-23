import React from "react";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import "./sidebar-sub-item.css";
import { Link } from "react-router-dom";

const SidebarSubItem = ({
  subItem,
  subIndex,
  subActiveIndex,
  setSubActiveIndex,
  changeColor,
  setChangeColor,
}) => {
  const [activeChildIndex, setActiveChildIndex] = useState(null);

  const toggleSubAccordian = () => {
    setSubActiveIndex((prev) => (prev === subIndex ? null : subIndex));
    setActiveChildIndex(null);
  };

  //If child children have children, if there is no div, link
  const Wrapper = subItem.subItems ? "div" : Link;

  return (
    <Wrapper
      to={subItem.subItems ? undefined : subItem.url}
      className="navbar__sub-item "
    >
      <div
        className={
          subItem.subItems
            ? `navbar__item__sub-container navbar__item__sub-hover ${
                subIndex === subActiveIndex ? "navbar__item--gray" : ""
              }`
            : "navbar__item__sub-container"
        }
        onClick={() => toggleSubAccordian()}
      >
        <div className="navbar__item__sub-container-icon-text">
          {subItem.icon}
          <p
            className={`navbar__sub-text ${
              subItem.subItems
                ? ""
                : changeColor === subIndex
                ? "navbar__sub__child-text--orange"
                : "navbar__sub-text--hover"
            }`}
            onClick={() => setChangeColor(subIndex)}
          >
            {subItem.menu}
          </p>
        </div>
        <div className="navbar__item__sub-container-arrow-icon">
          {" "}
          {subItem.subItems ? (
            <MdArrowForwardIos
              className={
                subActiveIndex === subIndex
                  ? "navbar__button navbar__button--transform"
                  : "navbar__button"
              }
            />
          ) : (
            <MdArrowForwardIos className="navbar__button navbar__button--hidden" />
          )}{" "}
        </div>
      </div>
      {subItem.subItems && (
        <ul
          className={`navbar__sub__child ${
            subIndex === subActiveIndex
              ? "navbar__sub__child--open"
              : "navbar__sub__child--close"
          } `}
        >
          {subItem.subItems.map((childItem, childIndex) => (
            <Link
              to={childItem.url}
              key={childIndex}
              className="navbar__sub__child-item"
            >
              <div>
                <p
                  className={`navbar__sub__child-text ${
                    activeChildIndex === childIndex
                      ? "navbar__sub__child-text--orange"
                      : ""
                  } `}
                  onClick={() => setActiveChildIndex(childIndex)}
                >
                  {childItem.menu}
                </p>
                {childItem.length > 0 ? (
                  <MdArrowForwardIos />
                ) : (
                  <MdArrowForwardIos className="navbar__button--none" />
                )}
              </div>
            </Link>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

export default SidebarSubItem;
