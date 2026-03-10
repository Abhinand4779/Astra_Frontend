import React from 'react';
import banner from '../assets/About/Banner.jpg';
import './About.css';

export const About = () => {
    return (
        <div className="about-container">
            <div className="about-banner">
                <img src={banner} alt="Astra by Ash" className="about-banner-img" />
                <div className="about-banner-overlay">
                    <h1 className="about-title">About Us</h1>
                </div>
            </div>

            <div className="about-content">
                <div className="about-section">
                    <h2 className="section-title">Our Story</h2>
                    <p className="section-text">
                        Founded in 2022 with a shared passion for fashion and tradition,
                        <strong> Astra by Ash</strong> was born from a desire
                        to bring high-quality, elegant, and affordable imitation jewelry and accessories to the modern world.
                    </p>
                    <p className="section-text">
                        Based in the heart of Kerala, we take inspiration from the rich cultural heritage and
                        intricate craftsmanship that our land is famous for. What started as a small conversation
                        between friends during a quiet evening has now blossomed into a brand that serves
                        thousands of customers, helping them express their unique style stories.
                    </p>
                </div>

                <div className="about-section">
                    <h2 className="section-title">Our Mission</h2>
                    <p className="section-text">
                        At Astra by Ash, our mission is simple: to make every person feel extraordinary.
                        We believe that style is a form of self-expression, and everyone deserves access to
                        accessories that make them feel confident without breaking the bank.
                    </p>
                </div>

                <div className="about-section">
                    <h2 className="section-title">Why Astra by Ash?</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <h3>Authentic Designs</h3>
                            <p>Each piece is carefully selected or designed to reflect a blend of tradition and modernity.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Quality Commitment</h3>
                            <p>We use premium materials to ensure our accessories are durable and skin-friendly.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Community First</h3>
                            <p>From our artisan partners to our loyal customers, Astra by Ash is built on relationships.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
