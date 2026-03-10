import React from 'react';
import './ShippingReturn.css';

export const ShippingReturn = () => {
    return (
        <div className="policy-container">
            <div className="policy-header">
                <h1 className="policy-title">Refund and Returns Policy</h1>
                <p className="policy-subtitle">Last updated: March 2026</p>
            </div>

            <div className="policy-content">
                <section className="policy-section">
                    <p className="intro-text">
                        At <strong>Astra by Ash</strong>, we aim to provide a seamless and trustworthy shopping experience.
                        Please review our return and refund policy below before placing your order.
                    </p>
                </section>

                <section className="policy-section">
                    <h2 className="section-heading">Conditions for Accepted Returns</h2>
                    <p>Returns are accepted under the following specific conditions:</p>
                    <ul className="policy-list">
                        <li>Item was damaged during shipping.</li>
                        <li>Size issues due to our error.</li>
                        <li>Defective items or incorrect color/products received.</li>
                    </ul>
                    <div className="policy-alert">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        <p><strong>Note:</strong> An unboxing video is <strong>mandatory</strong> to claim any damage, defect, or incorrect item.</p>
                    </div>
                </section>

                <section className="policy-section">
                    <h2 className="section-heading">Returns Not Accepted</h2>
                    <p>We cannot accept returns for:</p>
                    <ul className="policy-list error-list">
                        <li>Size issues resulting from incorrect selection by the customer.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2 className="section-heading">The Return Process</h2>
                    <div className="process-steps">
                        <div className="step">
                            <span className="step-number">01</span>
                            <p>Customers must fill out the <strong>Return Request Form</strong>.</p>
                        </div>
                        <div className="step">
                            <span className="step-number">02</span>
                            <p>Once your return is approved, the return parcel must be shipped to our address within <strong>4 business days</strong>.</p>
                        </div>
                        <div className="step">
                            <span className="step-number">03</span>
                            <p>Customers are responsible for sending the parcel. As we are a small business, we currently do not offer a dedicated pickup service.</p>
                        </div>
                    </div>
                </section>

                <section className="policy-section contact-box">
                    <h2 className="section-heading">Need Help?</h2>
                    <p>For any queries regarding your shipment or returns, feel free to reach out to us:</p>
                    <a href="mailto:aswathykab@gmail.com" className="email-link">
                        <i className="bi bi-envelope-fill"></i> aswathykab@gmail.com
                    </a>
                </section>
            </div>
        </div>
    );
};

export default ShippingReturn;
