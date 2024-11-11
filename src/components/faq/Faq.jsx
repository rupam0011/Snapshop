import React, { useState } from 'react';
import './faq.css';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null); // State to track active accordion index

    // Function to toggle the accordion item
    const toggleAccordion = (index) => {
        // If the clicked accordion is already active, close it; otherwise, open it
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="accordion-container">

                    {/* Accordion Item 1 */}
                    <div
                        className={`accordion-item ${activeIndex === 1 ? 'active' : ''}`}
                        onClick={() => toggleAccordion(1)}
                    >
                        <a className="accordion-link">
                            <h3>What types of products do you offer?</h3>
                            <i className="bi bi-arrow-right-short"></i>
                            <i className="bi bi-arrow-down-short"></i>
                        </a>
                        <div className="answer">
                            <p>
                                At Snapshop, we offer a diverse range of products, including clothing, accessories, home decor, and lifestyle items. Our collections are curated to provide something for everyone, ensuring you find the perfect addition to your wardrobe or home.
                            </p>
                        </div>
                        <hr />
                    </div>

                    {/* Accordion Item 2 */}
                    <div
                        className={`accordion-item ${activeIndex === 2 ? 'active' : ''}`}
                        onClick={() => toggleAccordion(2)}
                    >
                        <a className="accordion-link">
                            <h3>How can I track my order?</h3>
                            <i className="bi bi-arrow-right-short"></i>
                            <i className="bi bi-arrow-down-short"></i>
                        </a>
                        <div className="answer">
                            <p>
                                Once your order has been shipped, you will receive a confirmation email containing a tracking number. You can use this number on our website or the shipping carrier's website to monitor your order's status and estimated delivery date.
                            </p>
                        </div>
                        <hr />
                    </div>

                    {/* Accordion Item 3 */}
                    <div
                        className={`accordion-item ${activeIndex === 3 ? 'active' : ''}`}
                        onClick={() => toggleAccordion(3)}
                    >
                        <a className="accordion-link">
                            <h3>What is your return policy?</h3>
                            <i className="bi bi-arrow-right-short"></i>
                            <i className="bi bi-arrow-down-short"></i>
                        </a>
                        <div className="answer">
                            <p>
                                We want you to love your purchase! If you are not completely satisfied, you can return unused items within 30 days of receipt for a full refund or exchange. Please ensure the items are in their original packaging and condition. For detailed return instructions, please visit our Returns page.
                            </p>
                        </div>
                        <hr />
                    </div>

                    {/* Accordion Item 4 */}
                    <div
                        className={`accordion-item ${activeIndex === 4 ? 'active' : ''}`}
                        onClick={() => toggleAccordion(4)}
                    >
                        <a className="accordion-link">
                            <h3>Do you offer international shipping?</h3>
                            <i className="bi bi-arrow-right-short"></i>
                            <i className="bi bi-arrow-down-short"></i>
                        </a>
                        <div className="answer">
                            <p>
                                Yes, we offer international shipping to select countries. Shipping fees and delivery times may vary depending on the destination. Please check our Shipping Policy for detailed information on international shipping rates and times.
                            </p>
                        </div>
                        <hr />
                    </div>

                    {/* Accordion Item 5 */}
                    <div
                        className={`accordion-item ${activeIndex === 5 ? 'active' : ''}`}
                        onClick={() => toggleAccordion(5)}
                    >
                        <a className="accordion-link">
                            <h3>What payment methods do you accept?</h3>
                            <i className="bi bi-arrow-right-short"></i>
                            <i className="bi bi-arrow-down-short"></i>
                        </a>
                        <div className="answer">
                            <p>
                                We accept various payment methods, including credit/debit cards, PayPal, and other online payment systems. You can view the full list of available payment options at checkout.
                            </p>
                        </div>
                        <hr />
                    </div>

                    {/* Accordion Item 6 */}
                    <div
                        className={`accordion-item ${activeIndex === 6 ? 'active' : ''}`}
                        onClick={() => toggleAccordion(6)}
                    >
                        <a className="accordion-link">
                            <h3>How can I contact customer support?</h3>
                            <i className="bi bi-arrow-right-short"></i>
                            <i className="bi bi-arrow-down-short"></i>
                        </a>
                        <div className="answer">
                            <p>
                            Our customer support team is here to help! You can reach us via the contact form on our website, email us at support@snapshop.com, or call us at [+91 1234 5678 90]. We aim to respond to all inquiries within 24 hours.
                            </p>
            
                        </div>
                    </div>

                

        </div>
    );
};

export default Faq;
