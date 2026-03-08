import React, { useState } from 'react';
import './Contact.css';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
        // Add logic to send email or save to DB
        alert('Thank you for contacting Astra by Ash! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1 className="contact-title">Contact Us</h1>
                <p className="contact-subtitle">Get in touch with Astra by Ash for any queries or support</p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-item">
                        <i className="bi bi-geo-alt"></i>
                        <div>
                            <h3>Our Location</h3>
                            <p>Kerala, India</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <i className="bi bi-envelope"></i>
                        <div>
                            <h3>Email Us</h3>
                            <p>aswathykab@gmail.com</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <i className="bi bi-instagram"></i>
                        <div>
                            <h3>Social Media</h3>
                            <p>@astra_by.ash</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <i className="bi bi-telephone"></i>
                        <div>
                            <h3>Phone</h3>
                            <p>+61 466 790 752</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrapper">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="contact-btn">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
