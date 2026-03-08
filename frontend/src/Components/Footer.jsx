import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter signup
        console.log('Newsletter signup:', email);
        setEmail('');
    };

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-column footer-store">
                    <h3 className="footer-heading">Our Store</h3>
                    <p className="footer-description">
                        Astra by Ash (formerly Kiza) was started in 2022 to bring elegance and tradition to your everyday style.
                    </p>
                </div>

                <div className="footer-column">
                    <h3 className="footer-heading">Quick links</h3>
                    <ul className="footer-links">
                        <li><Link to="/profile">My account</Link></li>
                        <li><Link to="/cart">Shopping Cart</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3 className="footer-heading">Information</h3>
                    <ul className="footer-links">
                        <li><Link to="/privacy-policy">Privacy policy</Link></li>
                        <li><Link to="/shipping-return">Refund & Returns Policy</Link></li>
                        <li><Link to="/shipping-return">Shipping & Return</Link></li>
                    </ul>
                </div>

                <div className="footer-column footer-newsletter">
                    <h3 className="footer-heading footer-heading-large">Let's get in touch</h3>
                    <p className="footer-newsletter-text">
                        Sign up for our newsletter and receive 10% off your
                    </p>
                    <form className="footer-email-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="footer-email-input"
                            required
                        />
                        <button type="submit" className="footer-email-btn">
                            <span>&rarr;</span>
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="footer-copyright">&copy;2026 Astra by Ash. All Rights Reserved.</p>
                <a
                    href="https://www.instagram.com/rdr.technology?igsh=eTc5NWUwOWN0eHBs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-instagram"
                >
                    <i className="bi bi-instagram"></i>
                </a>
                <p className="footer-credit">Designed By RDR Technology</p>
            </div>
        </footer>
    );
};

export default Footer;
