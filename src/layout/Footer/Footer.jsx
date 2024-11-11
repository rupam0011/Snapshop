import React from 'react'
import './Footer.css'
const Footer = () => {
    return (
        <div className='full_footer'>
            <section id="footer">
                <div className="footer_main">
                    <div className="footer_tag">
                        <div className="footer_logo">
                            <span className="logo_footer">
                                SnapShop
                            </span>
                            <div className="social_footer">
                                <i className="bi bi-facebook" />
                                <i className="bi bi-instagram" />
                                <i className="bi bi-twitter" />
                                <i class="bi bi-twitch" />
                                <i class="bi bi-pinterest" />
                            </div>
                        </div>
                    </div>
                    <div className="footer_tag">
                        <h4>Quick Links</h4>
                        <p>Home</p>
                        <p>About Us</p>
                        <p>Shop</p>
                        <p>FAQs</p>
                    </div>
                    <div className="footer_tag">
                        <h4>Contact Us</h4>
                        <p>+91 23 4567 8901</p>
                        <p>+91 24 4967 8951</p>
                        <p>support@snapshop.com</p>
                        <p>info@snapshop.com</p>
                    </div>

                    <div className="footer_tag">
                        <h4>Products</h4>
                        <p>Tees</p>
                        <p>Hoodie</p>
                        <p>Sweatshirt</p>
                        <p>Dress</p>
                        <p>Shirt</p>
                    </div>
                </div>
            </section>
            <hr />
                <div className="copyright_footer">
                    <p>© 2024 SnapShop. All rights reserved.</p>
                </div>
        </div>
    )
}

export default Footer