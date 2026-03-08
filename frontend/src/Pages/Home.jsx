import React from 'react';
import { Link } from 'react-router-dom';
import Women from '../assets/Main_Categories/women.png';
import Men from '../assets/Main_Categories/men.png';
import Kids from '../assets/Main_Categories/kids.png';
import Traditional from '../assets/Main_Categories/traditional.png';
import BannerImg from '../assets/About/Banner.jpg';
import Featured1 from '../assets/Ornaments_Categories/bangle.jpg';
import Featured2 from '../assets/Ornaments_Categories/earings.jpg';
import Featured3 from '../assets/Ornaments_Categories/chain.jpg';
import './Home.css';

export const Home = () => {
    const categories = [
        { name: 'Women', image: Women, path: '/category/women' },
        { name: 'Men', image: Men, path: '/category/men' },
        { name: 'Kids', image: Kids, path: '/category/kids' },
        { name: 'Traditional', image: Traditional, path: '/category/traditional' },
    ];

    const highlights = [
        { id: 1, title: 'Summer Sale', image: Featured1, subtitle: 'Flat 20% Off', link: '/offer-zone' },
        { id: 2, title: 'New Arrivals', image: Featured2, subtitle: 'Signature Collection', link: '/shop' },
        { id: 3, title: 'Best Sellers', image: Featured3, subtitle: 'Trending Now', link: '/shop' },
    ];

    const copyCoupon = () => {
        navigator.clipboard.writeText('ASTRA15');
        alert('Coupon "ASTRA15" copied to clipboard!');
    };

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-banner">
                    <img src={BannerImg} alt="Hero Banner" className="banner-img" />
                    <div className="banner-content">
                        <h2>Elegance in Every Detail</h2>
                        <p>Explore the exclusive collection from Astra by Ash.</p>
                        <Link to="/shop" className="hero-btn">Shop Collection</Link>
                    </div>
                </div>
                <div className="coupon-area">
                    <div className="coupon-card">
                        <span className="coupon-label">Special Offer</span>
                        <h3 className="coupon-discount">15% OFF</h3>
                        <p className="coupon-text">On your first order above ₹1999</p>
                        <div className="coupon-code-box" onClick={copyCoupon}>
                            <span className="code-text">ASTRA15</span>
                            <i className="bi bi-files ms-2"></i>
                        </div>
                        <p className="tap-text">Tap to copy code</p>
                    </div>
                </div>
            </section>

            <section className="highlights-section">
                <div className="highlights-grid">
                    {highlights.map((item) => (
                        <div key={item.id} className="highlight-item">
                            <img src={item.image} alt={item.title} className="highlight-img" />
                            <div className="highlight-overlay">
                                <span className="highlight-subtitle">{item.subtitle}</span>
                                <h3 className="highlight-title">{item.title}</h3>
                                <Link to={item.link} className="highlight-link">View More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="shop-by-category">
                <h2 className="section-title">Shop By Category</h2>
                <div className="category-grid">
                    {categories.map((cat) => (
                        <Link to={cat.path} key={cat.name} className="category-card">
                            <div className="category-image-wrapper">
                                <img src={cat.image} alt={cat.name} />
                            </div>
                            <h3 className="category-name">{cat.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
