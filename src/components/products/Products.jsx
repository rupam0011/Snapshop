import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar/Sidebar";
import { end_points } from "../../api/Api";
import axiosInstance from "../../api/axiosInstance";
import {Button,ButtonGroup,ButtonToolbar,Card,Container,Row,Col,Breadcrumb,Offcanvas,} from "react-bootstrap";
import "./Products.css";
import Searchbar from "../../layout/searchbar/Searchbar";
import Topbg from "../topbg/Topbg";
import Bottombg from "../bottombg/Bottombg";
import Footer from "../../layout/Footer/Footer";
import { useParams, Link } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Products = () => {
  let api = end_points.products;
  let cartApi = end_points.cart;
  let wishApi = end_points.wishlist;

  let [inputState, setInputState] = useState([]);
  let [wishlist, setWishlist] = useState([]);
  let [pageTitle, setPageTitle] = useState("Shop");
  let [searchQuery, setSearchQuery] = useState("");

  let [showToast, setShowToast] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  let getProducts = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        console.log("products res: ", res);
        setInputState(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, [api]);

  const handleSearch = (query) => {
    setSearchQuery(query); // Set the search query when typing
  };

  let handleCart = (product) => {
    axiosInstance
      .get(cartApi)
      .then((res) => {
        let cartItems = res.data;
        let existingCart = cartItems.find((items) => items.id === product.id);

        if (existingCart && existingCart.quantity >= 3) {
          console.log("the cart limit is 3 times");
        } else {
          let newCartQuantity = existingCart ? existingCart.quantity + 1 : 1;

          let cartObj = {
            id: product.id,
            name: product.description,
            price: product.price,
            quantity: newCartQuantity,
            image: product.imgid,
          };

          if (existingCart) {
            axiosInstance
              .put(`${cartApi}/${existingCart.id}`, cartObj)
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
      .catch((err) => console.log("axios error for cart", err));
  };

  let handleWishToggle = (product) => {
    const isInWishlist = wishlist.includes(product.id);

    if (isInWishlist) {
      axiosInstance
        .delete(`${wishApi}/${product.id}`)
        .then((res) => {
          console.log("Removed from wishlist", res);
          const updatedWish = wishlist.filter((id) => id !== product.id);
          setWishlist(updatedWish);
        })
        .catch((err) => console.log(err));
    } else {
      let wishObj = {
        id: product.id,
        name: product.description,
        price: product.price,
        image: product.imgid,
        rating: product.rating,
        review: product.reviewCount,
        token: product.token
      };

      axiosInstance
        .post(wishApi, wishObj)
        .then((res) => {
          console.log("Added to wishlist", res);
          setWishlist([...wishlist, product.id]);
        })
        .catch((err) => console.log(err));
    }
  };

  const { category, color, material, gender, occasion } = useParams();

  useEffect(() => {
    if (category) {
      setPageTitle(category);
    } else {
      setPageTitle("Shop");
    }
  }, [category]);

  const breadcrumbItems = [
    <Breadcrumb.Item
      key="products"
      href="/products"
      active={!category && !color && !material && !gender && !occasion}
    >
      Products
    </Breadcrumb.Item>,
  ];

  if (category) {
    breadcrumbItems.push(
      <Breadcrumb.Item key="category" active>
        {" "}
        {category}
      </Breadcrumb.Item>
    );
  }
  if (color) {
    breadcrumbItems.push(
      <Breadcrumb.Item key="color" active>
        {" "}
        {color}
      </Breadcrumb.Item>
    );
  }
  if (material) {
    breadcrumbItems.push(
      <Breadcrumb.Item key="material" active>
        {" "}
        {material}
      </Breadcrumb.Item>
    );
  }
  if (gender) {
    breadcrumbItems.push(
      <Breadcrumb.Item key="gender" active>
        {gender}
      </Breadcrumb.Item>
    );
  }
  if (occasion) {
    breadcrumbItems.push(
      <Breadcrumb.Item key="occasion" active>
        {occasion}
      </Breadcrumb.Item>
    );
  }

  // Filter products based on search query and other filters
  const filteredProducts = inputState.filter((product) => {
    if (category && product.category !== category) return false;
    if (color && product.color !== color) return false;
    if (material && product.material !== material) return false;
    if (gender && product.gender !== gender) return false;
    if (occasion && product.occasion !== occasion) return false;

    // Check if product matches the search query (case-insensitive)
    const searchMatch =
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.occasion.toLowerCase().includes(searchQuery.toLowerCase());

    return searchMatch;
  });

  return (
    <>
      <Searchbar onSearch={handleSearch} />
      <Topbg />
      <div className="upper">
        <div className="page-title">
          <p>{pageTitle}</p>
        </div>
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      </div>
      <Container fluid className="product-container">
        <Row className="product-layout">
          <Col md={3} lg={2} className="sidebar-col d-none d-md-block">
            <Sidebar />
          </Col>

          <Col xs={12} className="d-md-none mb-3 small-filter-button">
            <Button onClick={handleShowSidebar} className="w-100 ">
              Filter By
            </Button>
          </Col>

          <Col xs={12} md={9} lg={10}>
            <Row className="product-row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={6}
                    lg={3}
                    key={product.id}
                    className="mb-4 product-col"
                  >
                    <Card>
                      <div className="card-img-container">
                        <Link
                          to={`/products/${product.id}`}
                          className="img-link"
                        >
                          <Card.Img variant="top" src={product.imgid} />
                        </Link>
                        <div className="heart">
                          <i
                            className={
                              wishlist.includes(product.id)
                                ? "bi bi-heart-fill"
                                : "bi bi-heart"
                            }
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              const modifiedProduct = { ...product, token: window.sessionStorage.getItem("token") }
                              handleWishToggle(modifiedProduct)
                            }}
                          />
                        </div>
                      </div>

                      <Card.Body>
                        <Card.Title>{product.brand}</Card.Title>
                        <Link
                          to={`/products/${product.id}`}
                          className="text-decoration-none "
                          style={{ color: "inherit" }}
                        >
                          <Card.Text className="product-description">
                            {product.description}
                          </Card.Text>
                        </Link>
                        <Card.Text className="product-price">
                          <i className="bi bi-currency-dollar"></i>
                          {product.price}
                        </Card.Text>
                        <Card.Text className="product-rating">
                          {product.rating} <i className="bi bi-star-fill"></i>{" "}
                          <i className="bi bi-star-fill"></i>{" "}
                          <i className="bi bi-star-fill"></i>{" "}
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-half"></i>
                        </Card.Text>


                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col xs={12} className="text-center">
                  <p>No products found matching your search.</p>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      <Offcanvas
        show={showSidebar}
        onHide={handleCloseSidebar}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter By</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar />
        </Offcanvas.Body>
      </Offcanvas>

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

      <Bottombg />
      <Footer />
    </>
  );
};

export default Products;
