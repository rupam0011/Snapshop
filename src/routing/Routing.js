import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from '../layout/header/Header';
import Registration from '../components/registration/Registration';
import Login from '../components/login/Login';
import Home from '../components/home/Home';
import Products from '../components/products/Products';
import Productdetails from '../components/products/Productdetails/Productdetails';
import Cart from '../components/cart/Cart';
import Wishlist from '../components/wishlist/Wishlist';

const Routing = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="products" element={<Products />} />
          <Route path="products/category/:category" element={<Products />} />
          <Route path="products/color/:color" element={<Products />} />
          <Route path="products/material/:material" element={<Products />} />
          <Route path="products/gender/:gender" element={<Products />} />
          <Route path="products/occasion/:occasion" element={<Products />} />
          <Route path="products/:id" element={<Productdetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;
