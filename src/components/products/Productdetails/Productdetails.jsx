import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { end_points } from "../../../api/Api";
import Searchbar from "../../../layout/searchbar/Searchbar";
import Topbg from "../../topbg/Topbg";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import axiosInstance from "../../../api/axiosInstance";
import "./Productdetails.css";
import Bottombg from "../../bottombg/Bottombg";
import Footer from "../../../layout/Footer/Footer";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Productdetails = () => {
  const { id } = useParams();
  let api = end_points.products + `/${id}`;
  // console.log("api", api);

  let cartApi = end_points.cart;

  let wishApi = end_points.wishlist;

  let [details, setDetails] = useState({});

  let [selectedSize, setSelectedSize] = useState(null);

  let [showToast, setShowToast] = useState(false);
  let [wishToast, setWishToast] = useState(false);

  let getDetails = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        console.log("details res: ", res.data);

        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDetails();
  }, [api]);

  let handleCart = () => {
    // First, get the current items in the cart
    if (!selectedSize) {
      alert("please select a size");
      return
    }

    axiosInstance
      .get(cartApi)
      .then((res) => {
        let cartItems = res.data;
        console.log("cartitems get", cartItems);

        let existingItem = cartItems.find(
          (item) => item.id === details.id && item.size === selectedSize
        );
        console.log("existing item visit", existingItem);

        // Check if the product exists and the quantity is less than 3
        if (existingItem && existingItem.quantity >= 3) {
          console.log("Cannot add more than 3 of the same item to the cart.");
        } else {
          // If the product doesn't exist or the quantity is less than 3, add/update the item in the cart
          let newQuantity = existingItem ? existingItem.quantity + 1 : 1;

          let cartObj = {
            id: details.id,
            name: details.description,
            price: details.price,
            quantity: newQuantity, // Increment quantity
            image: details.imgid,
            size: selectedSize,
            token:window.sessionStorage.getItem('token'),
          };

          if (existingItem) {
            // If the item already exists, update the quantity
            axiosInstance
              .put(`${cartApi}/${existingItem.id}`, cartObj)
              .then((res) => {
                console.log("Item quantity updated in cart", res);
                setShowToast(true);
              })
              .catch((err) => console.log("Error updating item in cart", err));
          } else {
            // If the item is not in the cart, add it
            axiosInstance
              .post(cartApi, cartObj)
              .then((res) => {
                console.log("Item added to cart", res);
                setShowToast(true);
              })
              .catch((err) => console.log("Error adding item to cart", err));
          }
        }
      })
      .catch((err) => console.log("Error fetching cart items", err));
  };

  let handleWish = () => {
    axiosInstance
      .get(wishApi)
      .then((res) => {
        let wishItems = res.data;
        let existingWish = wishItems.find((item) => item.id === details.id);

        if (existingWish) {
          console.log("the item is in the wishlist");
          setWishToast(true);
        } else {
          let wishobj = {
            id: details.id,
            name: details.description,
            price: details.price,
            image: details.imgid,
            rating: details.rating,
            review: details.reviewCount,
          };

          axiosInstance
            .post(wishApi, wishobj)
            .then((res) => {
              console.log("axios wish res", res);
              setWishToast(true);
            })

            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log("Error fetching wishlist items", err));
  };

  return (
    <>
      <Searchbar />
      <Topbg />
      <div className="upper">
        <div className="page-title">
          <p>Apparel</p>
        </div>
        <Breadcrumb>
          <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
          <Breadcrumb.Item href="/products/category/T-shirt">
            {details.category}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Details</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Container className="product-detail-container">
        <Row>
          {/* Left Column for Image Thumbnails */}
          <Col md={2} className="image-thumbnails">
            <div className="thumbnail-wrapper">
              <img
                src={details.imgid}
                alt="Product Thumbnail 1"
                className=" thumbnail"
              />
              <img
                src={details.imgid}
                alt="Product Thumbnail 2"
                className=" thumbnail"
              />
              <img
                src={details.imgid}
                alt="Product Thumbnail 3"
                className=" thumbnail"
              />
            </div>
          </Col>

          {/* Right Column for Main Product Image and Details */}
          <Col md={10} className="rightside">
            <div className="main-image-wrapper">
              <img
                src={details.imgid}
                alt="Main Product"
                className=" main-image"
              />
            </div>
            <div className="details-content">
              <p className="brandName">{details.brand}</p>
              <h2>{details.description}</h2>
              <p className="rating">
                {details.rating} <i className="bi bi-star-fill"></i>{" "}
                <i className="bi bi-star-fill"></i>{" "}
                <i className="bi bi-star-fill"></i>{" "}
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
              </p>
              <p className="reviews">{details.reviewCount} reviews</p>

              <p className="real-price">
                <i className=" bi bi-currency-dollar"></i>
                {details.price}
                <span className="original-price">$240.00</span>
              </p>

              <p>
                amet consectetur adipisicing elit. Illum, aliquid at. Obcaecati
                cumque exercitationem, fugit minima aperiam quas vel, atque sed
                fuga, ratione eius repudiandae nobis! Sit sapiente nesciunt
                dicta molestiae consectetur dolorem enim quas nam, dolorum esse
                itaque labore similique consequuntur tempore asperiores eos.
              </p>

              {/* Color Options */}
              <div className="product-options">
                <h5>Color:</h5>
                <ButtonToolbar aria-label="Toolbar with button groups">
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant="outline-secondary">Gray</Button>
                  </ButtonGroup>

                  <ButtonGroup className="me-2" aria-label="Second group">
                    <Button variant="outline-secondary">Black</Button>
                  </ButtonGroup>

                  <ButtonGroup className="me-2" aria-label="Third group">
                    <Button variant="outline-secondary">Blue</Button>
                  </ButtonGroup>

                  <ButtonGroup className="me-2" aria-label="Third group">
                    <Button variant="outline-secondary">Red</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>

              {/* Size Options */}
              <div className="product-options">
                <h5>Size:</h5>
                {details.sizes?.map((size, index) => (
                  <Button
                    variant="outline-secondary me-2"
                    key={index}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>

              {/* Add to Cart Button */}
              <div className="cart-options">
                <Button
                  className="add-to-cart-btn"
                  style={{ border: "none" }}
                  onClick={() => handleCart()}
                >
                  Add To Cart
                </Button>
                <Button className="wishlist-btn" onClick={() => handleWish()}>
                  <i className="bi bi-heart"></i>
                </Button>
              </div>

              <p className="mt-3">
                <span className="fw-bold">Category:</span> {details.category},{" "}
                {details.occasion}
              </p>
              <p>
                <span className="fw-bold">Tags:</span> {details.material},{" "}
                {details.gender}
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <ToastContainer position="bottom-end" className="position-fixed p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={4000}
          autohide
          bg="dark"
          className="text-white"
        >
          <Toast.Header>
            <strong className="me-auto">
              <i className="bi bi-cart3"></i> Cart
            </strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>Item added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>

      <ToastContainer position="bottom-end" className="position-fixed p-3">
        <Toast
          onClose={() => setWishToast(false)}
          show={wishToast}
          delay={4000}
          autohide
          bg="dark"
          className="text-white"
        >
          <Toast.Header>
            <strong className="me-auto">
              <i className="bi bi-heart"></i> Wishlist
            </strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>Item added to wishlist!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Bottombg />
      <Footer />
    </>
  );
};

export default Productdetails;
