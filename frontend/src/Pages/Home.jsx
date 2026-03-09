import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import './Home.css';

export const Home = () => {
    const { config } = useSite();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slider
    useEffect(() => {
        if (!config?.heroSliders || config.heroSliders.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % config.heroSliders.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, [config?.heroSliders]);

    if (!config) return null;
    const { hero, heroSliders, coupon, highlights, homeCategories } = config;

    const copyCoupon = () => {
        navigator.clipboard.writeText(coupon.code || 'ASTRA15');
        alert(`Coupon "${coupon.code || 'ASTRA15'}" copied to clipboard!`);
    };

    // Use dynamic sliders if they exist, otherwise fallback to the single static hero
    const hasSliders = heroSliders && heroSliders.length > 0 && heroSliders[0].image !== '';

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-banner">
                    {hasSliders ? (
                        <>
                            {heroSliders.map((slide, index) => (
                                <div
                                    key={slide.id || index}
                                    className={`slider-item ${index === currentSlide ? 'active' : ''}`}
                                    style={{
                                        position: index === currentSlide ? 'relative' : 'absolute',
                                        opacity: index === currentSlide ? 1 : 0,
                                        transition: 'opacity 0.8s ease-in-out',
                                        width: '100%',
                                        height: '100%',
                                        top: 0,
                                        left: 0
                                    }}
                                >
                                    <img src={slide.image} alt={slide.title} className="banner-img" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                    <div className="banner-content">
                                        <h2>{slide.title}</h2>
                                        <p>{slide.subtitle}</p>
                                        <Link to={hero.btnLink} className="hero-btn">{hero.btnText}</Link>
                                    </div>
                                </div>
                            ))}
                            <div className="slider-dots" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 10 }}>
                                {heroSliders.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        style={{
                                            width: '12px', height: '12px', borderRadius: '50%', border: 'none',
                                            backgroundColor: index === currentSlide ? '#b59b5a' : 'rgba(255,255,255,0.5)',
                                            cursor: 'pointer', transition: 'all 0.3s'
                                        }}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        // Fallback completely to static image
                        <>
                            <img src={hero.bannerImg} alt="Hero Banner" className="banner-img" />
                            <div className="banner-content">
                                <h2>{hero.title}</h2>
                                <p>{hero.subtitle}</p>
                                <Link to={hero.btnLink} className="hero-btn">{hero.btnText}</Link>
                            </div>
                        </>
                    )}
                </div>
                <div className="coupon-area">
                    <div className="coupon-card">
                        <span className="coupon-label">{coupon.label}</span>
                        <h3 className="coupon-discount">{coupon.discount}</h3>
                        <p className="coupon-text">{coupon.text}</p>
                        <div className="coupon-code-box" onClick={copyCoupon}>
                            <span className="code-text">{coupon.code}</span>
                            <i className="bi bi-files ms-2"></i>
                        </div>
                        <p className="tap-text">Tap to copy code</p>
                    </div>
                </div>
            </section>

            <section className="highlights-section">
                <div className="highlights-grid">
                    {highlights && highlights.map((item) => (
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
                    {homeCategories && homeCategories.map((cat) => (
                        <Link to={cat.path} key={cat.id || cat.name} className="category-card">
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
