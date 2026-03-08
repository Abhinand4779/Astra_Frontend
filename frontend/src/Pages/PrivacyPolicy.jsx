import React from 'react';
import './PrivacyPolicy.css';

export const PrivacyPolicy = () => {
    return (
        <div className="policy-container">
            <div className="policy-header">
                <h1 className="policy-title">Privacy Policy</h1>
                <p className="policy-subtitle">Last updated: March 2026</p>
            </div>

            <div className="policy-content">
                <section className="policy-section">
                    <p className="intro-text">
                        At <strong>Astra by Ash</strong>, accessible from <a href="https://kiza.in">kiza.in</a>, protecting your personal information and ensuring transparency about how we use it is our top priority. This Privacy Policy explains the types of personal data we collect, how we use it, and the measures we take to safeguard your information.
                    </p>
                </section>

                <section className="policy-section">
                    <h2 className="section-heading">Information We Collect</h2>
                    <p>When you visit our website or make a purchase, we may collect:</p>

                    <div className="info-subsection">
                        <h3>a. Personal Identification Information</h3>
                        <ul className="policy-list">
                            <li>Name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Shipping and billing address</li>
                        </ul>
                    </div>

                    <div className="info-subsection">
                        <h3>b. Payment Information</h3>
                        <p>Payment details such as credit or debit card information (processed securely via trusted third-party payment gateways).</p>
                    </div>

                    <div className="info-subsection">
                        <h3>c. Usage Data</h3>
                        <ul className="policy-list">
                            <li>IP address</li>
                            <li>Pages you visit on our website</li>
                        </ul>
                    </div>
                </section>

                <section className="policy-section">
                    <h2 className="section-heading">How We Use Your Information</h2>
                    <p>We use your information to:</p>
                    <ul className="policy-list">
                        <li>Provide and maintain our services</li>
                        <li>Process and deliver orders, including order confirmations and updates</li>
                        <li>Improve and optimize our website and offerings</li>
                        <li>Send promotional emails (only if you’ve opted-in)</li>
                        <li>Respond to queries, feedback, or requests</li>
                        <li>Comply with legal requirements</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2 className="section-heading">Sharing of Information</h2>
                    <p>We do not sell, trade, or rent your personal information. Your data may be shared with:</p>

                    <div className="info-subsection">
                        <h3>a. Service Providers</h3>
                        <ul className="policy-list">
                            <li>Third-party services (e.g., Storepecker) supporting our e-commerce platform</li>
                            <li>Razorpay or other payment processors for secure transactions</li>
                        </ul>
                    </div>

                    <div className="info-subsection">
                        <h3>b. Legal Requirements</h3>
                        <p>If required by law or for protection of Astra by Ash, our users, or others.</p>
                    </div>
                </section>

                <section className="policy-section">
                    <h2 className="section-heading">Security of Your Information</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission or electronic storage method can guarantee absolute security.
                    </p>
                </section>

                <section className="policy-section">
                    <h2 className="section-heading">Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul className="policy-list">
                        <li>Access the personal data we hold about you</li>
                        <li>Request corrections to any inaccuracies</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2 className="section-heading">Changes to This Privacy Policy</h2>
                    <p>
                        We reserve the right to update this Privacy Policy at any time. Updates will be posted on this page, and the “Last Updated” date will be revised. Continued use of <a href="https://kiza.in">kiza.in</a> means you accept the updated policy.
                    </p>
                </section>

                <section className="policy-section contact-box">
                    <h2 className="section-heading">Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:</p>
                    <a href="mailto:aswathykab@gmail.com" className="email-link">
                        <i className="bi bi-envelope-fill"></i> aswathykab@gmail.com
                    </a>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
