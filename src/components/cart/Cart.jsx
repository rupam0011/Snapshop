import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // Make sure you have your axios instance set up
import { end_points } from "../../api/Api"; // Import your API endpoints
import "./Cart.css"; // Import the CSS file
import Searchbar from "../../layout/searchbar/Searchbar";
import Topbg from "../topbg/Topbg";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";
import Bottombg from "../bottombg/Bottombg";
import Footer from "../../layout/Footer/Footer";
import Wishlist from "../wishlist/Wishlist";

const Cart = () => {
  const navigate = useNavigate();
  const api = end_points.cart;
  const [cartState, setCartState] = useState([]);
  const [total, setTotal] = useState(0);

  const getCart = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        console.log("axios res for cart get:", res);
        const filteredData = res.data.filter(
          (item) => item.token === window.sessionStorage.getItem("token")
        );

        setCartState(filteredData);
        calculateTotal(filteredData);
      })
      .catch((err) => console.log("Error fetching cart data:", err));
  };

  const calculateTotal = (cart) => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cartState];
    const updatedItem = updatedCart[index];
    updatedItem.quantity += delta;

    if (updatedItem.quantity < 1) {
      handleDelete(updatedItem.id);
    } else {
      axiosInstance
        .put(`${api}/${updatedItem.id}`, updatedItem)
        .then((res) => {
          console.log(res)
          const fd=cartState.map((item)=>{
          if(item.id===updatedItem.id){
          return res.data;
          }else{
            return item;
          }
          })
          setCartState(fd);
          calculateTotal(fd);
        })
        .catch((err) => console.log("Error updating quantity:", err));
    }
  };

  const handleDelete = (itemId) => {
    axiosInstance
      .delete(`${api}/${itemId}`)
      .then((res) => {
        const updatedCart = cartState.filter((item) => item.id !== itemId);
        setCartState(updatedCart);
        calculateTotal(updatedCart);
      })
      .catch((err) => console.log("Error deleting item:", err));
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Searchbar />
      <Topbg />
      <div className="upper">
        <div className="page-title">
          <p>Cart</p>
        </div>
        <Breadcrumb>
          <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
          <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="cart-container">
        <h2 style={{ fontWeight: "bold" }}>
          Your Shopping Cart ({cartState.length})
        </h2>
        {cartState.length === 0 ? (
          <>
            {/* <h2 style={{fontWeight:"bold", textAlign:"center"}}>Your Shopping Cart ({cartState.length}) </h2> */}
            <p style={{ fontSize: "18px", textDecoration: "underline" }}>
              Your cart is currently empty.
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
            <div className="cart-header">
              <h2>PRODUCT</h2>
              <h2>QUANTITY</h2>
              <h2>SUBTOTAL</h2>
            </div>
            <div className="cart-items">
              {cartState &&  cartState.map((item, index) => (
                <div key={item.id} className="cart-item">
                  <div className="product-info">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                    />
                    <div>
                      <p className="product-name">{item.name}</p>
                      <p className="product-size">Size: {item.size}</p>
                    </div>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(index, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, 1)}>
                      +
                    </button>
                  </div>
                  <div className="subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="delete-button"
                    >
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Cart Total</h3>
              <div className="summary-row">
                {/* <span>SUBTOTAL</span>
              <span>${total.toFixed(2)}</span> */}
              </div>
              <div className="summary-row">
                <span>TOTAL</span>
                <span style={{ fontWeight: "bold" }}>${total.toFixed(2)}</span>
              </div>
              <button
                className="cart-action"
                onClick={() => navigate("/products")}
              >
                CONTINUE SHOP
              </button>
              <button className="cart-action-checkout">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
      <Bottombg />
      <Footer />
    </>
  );
};

export default Cart;
