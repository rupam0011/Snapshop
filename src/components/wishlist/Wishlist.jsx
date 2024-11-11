import React, { useEffect, useState } from "react";
import { end_points } from "../../api/Api";
import axiosInstance from "../../api/axiosInstance";
import "./Wishlist.css";
import Searchbar from "../../layout/searchbar/Searchbar";
import Bottombg from "../bottombg/Bottombg";
import Footer from "../../layout/Footer/Footer";
import Topbg from "../topbg/Topbg";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  let navigate = useNavigate();
  const api = end_points.wishlist;
  const cartApi = end_points.cart;

  const [wishState, setWishState] = useState([]);

  const getWish = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        console.log("axios get wish: ", res);
        const filteredData = res.data.filter(
          (item) => item.token === window.sessionStorage.getItem("token")
        );
        setWishState(filteredData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWish();
  }, [api]);

  const handleAddToCart = (items) => {
    navigate(`/products/${items.id}`)
  };

  const handleDelete = (itemId) => {
    axiosInstance
      .delete(`${api}/${itemId}`)
      .then((res) => {
        const updatedWish = wishState.filter((item) => item.id !== itemId);
        setWishState(updatedWish);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Searchbar />
      <Topbg />
      <div className="upper">
        <div className="page-title">
          <p>Wishlist</p>
        </div>
        <Breadcrumb>
          <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
          <Breadcrumb.Item active>Wishlist</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="wishlist-container">
        <h2 style={{ fontWeight: "bold" }}>
          Your Wishlist ({wishState.length})
        </h2>
        {wishState.length === 0 ? ( // Conditional rendering for empty cart
          <>
            <p style={{ fontSize: "18px", textDecoration: "underline" }}>
              Your Wishlist is currently empty.
            </p>
            <button
              className="cart-action"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </>
        ) : (
          <>
            {/* <h1 className="wishlist-title">My Wishlist </h1> */}
            {wishState.map((item) => (
              <div key={item.id} className="wishlist-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} className="" />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-rating">
                    <span className="rating-score">{item.rating}</span>
                    <span className="rating-count">
                      ({item.review}) reviews
                    </span>
                  </div>
                  <div className="item-price">
                    <span className="current-price">
                      <i className="bi bi-currency-dollar"></i>
                      {item.price}
                    </span>
                    {/* <span className="original-price">₹{item.originalPrice}</span> */}
                    {/* <span className="discount-percentage">{item.discountPercentage}% off</span> */}
                  </div>
                </div>
                <div className="wishlist-item-actions">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="add-to-cart-button"
                  >
                    <i class="bi bi-cart3"></i> Details
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="wishlist-delete-button"
                  >
                    <i class="bi bi-trash3-fill"></i> Remove
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Bottombg />
      <Footer />
      wishlist-
    </>
  );
};

export default Wishlist;
