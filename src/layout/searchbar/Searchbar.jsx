// Searchbar.js
import React, { useState } from "react";
import "./Searchbar.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { end_points } from "../../api/Api";

const Searchbar = ({ onSearch }) => {
  const [results, setResults] = useState(null);
  let navigate = useNavigate();

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    const getSuggetions = async (query) => {
      try {
        const res = await axiosInstance.get(end_points.products);
        console.log(res);
        const searchresult = res.data.filter(
          (item) =>
            item.category.includes(query) || item.description.includes(query)
        );
        console.log(searchresult);
        setResults(searchresult);
      } catch (error) {
        console.log(error);
      }
    };
    getSuggetions(e.target.value);
  };

  return (
    <nav className="searchbar">
      <div className="searchbar-search">
        <div className="position-relative">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          />
          {results && (
            <div className="search-result">
              {results.map((item) => {
                return (
                  <div className="result">
                    <Link
                      className="link"
                      onClick={() => {
                        setResults(null);
                      }}
                      to={`/products/${item.id}`}
                      key={item.id}
                    >
                      {item.brand}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button type="submit">Search</button>
      </div>
      <div className="searchbar-links">
        <div
          onClick={() => navigate("/cart")}
          className="nav-icon"
          style={{ fontSize: "22px" }}
        >
          <i className="bi bi-cart-fill"></i>
        </div>
        <div onClick={() => navigate("/wishlist")} className="nav-icon">
          <i className="bi bi-heart-fill"></i>
        </div>
      </div>
    </nav>
  );
};

export default Searchbar;
