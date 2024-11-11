import React from "react";
import banner from "../../assets/banner.mp4";
import Button from "react-bootstrap/Button";
import Marquee from "../marquee/Marquee";
import tshirt from "../../assets/tshirt.jpg";
import sweatshirt from "../../assets/sweatshirt.jpg";
import hoodies from "../../assets/hoodies.jpg";
import shirt from "../../assets/shirt.jpg";
import dress from "../../assets/dress.jpg";
import clothing from "../../assets/clothing.jpg";
import inventory from "../../assets/inventory.jpg";
import delivery from "../../assets/delivery.jpg";
import globe from "../../assets/globe.mp4";
import onlineshopping from "../../assets/onlineshopping.png";

import "./Home.css";
import { Container } from "react-bootstrap";
import Faq from "../faq/Faq";
import Footer from "../../layout/Footer/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div className="body">
      <main>
        <section className="banner-body">
          <div className="banner">
            <video src={banner} autoPlay loop muted></video>
          </div>

          <div className="banner-text">
            <p>Be the next</p>
            <div class="animation">
              <div class="first">
                <div>Trendsetter</div>
              </div>
              <div class="second">
                <div>Showstopper</div>
              </div>
              <div class="third">
                <div>Snapstar</div>
              </div>
            </div>
          </div>

          <div className="banner-description">
            <div className="text">
              <span>
                Where Style Meets Convenience,<p> One Snap at a Time.</p>
              </span>
              <Button
                className="btn"
                variant="outline-light"
                onClick={() => navigate("/products")}
              >
                Step Into Style
              </Button>{" "}
            </div>
          </div>
        </section>
        <section className="marquee-body">
          <Marquee />
        </section>

        <Container fluid className="collection-section">
          <p>Find Your Style</p>
          <section className="collection">
            <div className="all-clothes">
              <div className="t-shirt">
                <img src={tshirt} alt="T-shirt" />
                <h3>
                  Tees <i className="bi bi-arrow-up-right"></i>
                </h3>
              </div>

              <div className="winter">
                <div className="hoodies">
                  <img src={hoodies} alt="Hoodies" />
                  <h3>
                    Hoodies <i className="bi bi-arrow-up-right"></i>
                  </h3>
                </div>
                <div className="sweatshirt">
                  <img src={sweatshirt} alt="Sweatshirt" />
                  <h3>
                    Sweatshirts <i className="bi bi-arrow-up-right"></i>
                  </h3>
                </div>
              </div>

              <div className="summer">
                <div className="dress">
                  <img src={dress} alt="Accessories" />
                  <h3>
                    Dress <i className="bi bi-arrow-up-right"></i>
                  </h3>
                </div>
                <div className="shirt">
                  <img src={shirt} alt="Customize" />
                  <h3>
                    Shirt <i className="bi bi-arrow-up-right"></i>
                  </h3>
                </div>
              </div>
            </div>
          </section>
        </Container>

        <Container fluid className="services-container">
          <section className="services-section">
            <p className="services-heading">Solutions That Matter</p>
            <div className="services">
              <div className="first-layout">
                <img src={clothing} alt="" srcset="" />
                <div className="services-text">
                  <p>Wear the Finest</p>
                  <p className="description">
                    Indulge in a collection crafted from the highest quality
                    materials, designed for those who value excellence in every
                    stitch. From luxurious fabrics to impeccable detailing, each
                    piece is a testament to our commitment to providing the very
                    best in fashion. Elevate your look and exude confidence with
                    garments that offer both style and substance, ensuring you
                    feel as good as you look, every time you step out.
                  </p>
                </div>
              </div>
              <div className="second-layout">
                <img src={inventory} alt="" srcset="" />
                <div className="services-text">
                  <p>Your Ultimate Style Destination</p>
                  <p className="description">
                    Welcome to the fashion hub where innovation meets timeless
                    elegance. Whether you're seeking bold, trend-setting pieces
                    or classic wardrobe essentials, we bring you a thoughtfully
                    curated selection of attire that caters to every mood,
                    season, and occasion. Here, fashion isn’t just about wearing
                    clothes it’s about expressing your individuality. Explore
                    our vast array of collections and discover the perfect blend
                    of sophistication and edge, tailored just for you.
                  </p>
                </div>
              </div>
              <div className="third-layout">
                <img src={delivery} alt="" srcset="" />
                <div className="services-text">
                  <p>Get It Fast, Get It Right</p>
                  <p className="description">
                    We understand that when it comes to shopping, time is of the
                    essence, and precision is key. That’s why our delivery
                    process is designed to be both rapid and reliable, ensuring
                    that your carefully chosen items reach your doorstep
                    swiftly, without compromising on accuracy. With us, there’s
                    no need to worry about delays or mistakes our top priority
                    is getting your order to you, exactly as you expect, in
                    record time. Convenience, speed, and perfection are all part
                    of the experience.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Container>

        <Container fluid className="about-container">
          <section className="about-section">
            <div className="about">
              <div className="video-container">
                <video src={globe} autoPlay muted loop></video>
              </div>
              <div className="about-text">
                <p className="about-heading">Meet Snapshop</p>
                <p className="about-description">
                  At Snapshop, we believe that fashion knows no borders.
                  Inspired by the world around us, we are more than just a
                  clothing brand we're a global community of fashion lovers
                  dedicated to bringing you styles that resonate with your
                  unique identity. Our journey began with a simple idea: to
                  create a space where everyone can express themselves through
                  fashion, regardless of where they come from. The globe
                  featured in our branding represents our commitment to
                  inclusivity and our passion for sourcing styles from around
                  the world. Each collection reflects a fusion of cultures,
                  trends, and inspirations, allowing you to wear your story with
                  pride.
                </p>
              </div>
            </div>
          </section>
        </Container>

        <Container fluid className="faq-container">
          <section className="faq-body">
            <div className="faq-img">
              <img src={onlineshopping} alt="" srcset="" />
            </div>
            <div className="full-faq">
              <h3 className="faq-heading">Ask Us Anything</h3>
              <Faq />
            </div>
          </section>
        </Container>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
