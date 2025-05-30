import React, { useState, useEffect } from "react";
import "./cards.css";
import useApi from "../../../hooks/useApi ";

const Cards = ({ title, icon, description, url }) => {
  const [count, setCount] = useState(0);

  const { makeRequest } = useApi();

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await makeRequest("get", url);
        setCount(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setCount(0);
      }
    };
    getCount();
  }, []);

  return (
    <div className="card">
      <div className="stat-header">
        {icon}
        <h5 className="stat-title">{title}</h5>
      </div>
      <p className="stat-value">
        {!title.includes("Nakdi") ? `${count}+` : `${count}₺`}
      </p>
      <p className="stat-description">{description}</p>
    </div>
  );
};

export default Cards;
