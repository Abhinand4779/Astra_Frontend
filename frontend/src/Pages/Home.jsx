import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import './Home.css';

export const Home = () => {
    const { config } = useSite();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [promoSlide, setPromoSlide] = useState(0);
    const [testiSlide, setTestiSlide] = useState(0);
    const promoRef = useRef(null);

    // Auto-advance hero slider
    useEffect(() => {
        if (!config?.heroSliders || config.heroSliders.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % config.heroSliders.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [config?.heroSliders]);

    // Auto-advance promo carousel
    useEffect(() => {
        if (!config?.promoCarousel || config.promoCarousel.length <= 1) return;
        const interval = setInterval(() => {
            setPromoSlide((prev) => (prev + 1) % config.promoCarousel.length);
        }, 4500);
        return () => clearInterval(interval);
    }, [config?.promoCarousel]);

    // Auto-advance testimonials
    useEffect(() => {
        if (!config?.testimonials || config.testimonials.length <= 1) return;
        const interval = setInterval(() => {
            setTestiSlide((prev) => (prev + 1) % config.testimonials.length);
        }, 5500);
        return () => clearInterval(interval);
    }, [config?.testimonials]);

    if (!config) return null;
    const { hero, heroSliders, coupon, highlights, homeCategories, promoCarousel, testimonials } = config;

    const copyCoupon = () => {
        navigator.clipboard.writeText(coupon.code || 'ASTRA15');
        alert(`Coupon "${coupon.code || 'ASTRA15'}" copied to clipboard!`);
    };

    const hasSliders = heroSliders && heroSliders.length > 0 && heroSliders[0].image !== '';
    const hasPromo = promoCarousel && promoCarousel.length > 0;
    const hasTesti = testimonials && testimonials.length > 0;

    const goPromo = (dir) => {
        setPromoSlide((prev) => {
            const total = promoCarousel.length;
            return (prev + dir + total) % total;
        });
    };

    const goTesti = (dir) => {
        setTestiSlide((prev) => {
            const total = testimonials.length;
            return (prev + dir + total) % total;
        });
    };

    return (
        <div className="home-container">

            {/* ── HERO ── */}
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
                                        width: '100%', height: '100%', top: 0, left: 0
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
                                        style={{ width: '12px', height: '12px', borderRadius: '50%', border: 'none', backgroundColor: index === currentSlide ? '#b59b5a' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.3s' }}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
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

            {/* ── HIGHLIGHTS ── */}
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

            {/* ── PROMO CAROUSEL ── */}
            {hasPromo && (
                <section className="promo-carousel-section">
                    <div className="promo-carousel-header">
                        <p className="promo-section-label">Our Collections</p>
                        <h2 className="promo-section-title">Crafted for You</h2>
                    </div>

                    <div className="promo-carousel-track" ref={promoRef}>
                        {promoCarousel.map((slide, index) => {
                            const isActive = index === promoSlide;
                            const isRight = slide.align === 'right';
                            return (
                                <div
                                    key={slide.id || index}
                                    className={`promo-slide ${isActive ? 'promo-slide--active' : ''} ${isRight ? 'promo-slide--reverse' : ''}`}
                                >
                                    <div className="promo-slide__img-wrap">
                                        <img src={slide.image} alt={slide.title} className="promo-slide__img" />
                                        <span className="promo-slide__badge">{slide.badge}</span>
                                    </div>
                                    <div className="promo-slide__content">
                                        <p className="promo-slide__eyebrow">Astra by Ash &mdash; Featured</p>
                                        <h2 className="promo-slide__title">{slide.title}</h2>
                                        <p className="promo-slide__subtitle">{slide.subtitle}</p>
                                        <Link to={slide.link} className="promo-slide__btn">{slide.btnText}</Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Controls */}
                    <div className="promo-carousel-controls">
                        <button className="promo-ctrl-btn" onClick={() => goPromo(-1)} aria-label="Previous">
                            <i className="bi bi-arrow-left"></i>
                        </button>
                        <div className="promo-dots">
                            {promoCarousel.map((_, i) => (
                                <button
                                    key={i}
                                    className={`promo-dot ${i === promoSlide ? 'promo-dot--active' : ''}`}
                                    onClick={() => setPromoSlide(i)}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                        <button className="promo-ctrl-btn" onClick={() => goPromo(1)} aria-label="Next">
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </section>
            )}

            {/* ── SHOP BY CATEGORY ── */}
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

            {/* ── TESTIMONIALS CAROUSEL (Instagram Style) ── */}
            {hasTesti && (
                <section className="testimonials-section">
                    <div className="section-header text-center mb-5">
                        <p className="label-style">Customer Stories</p>
                        <h2 className="title-style">Loved by our Community</h2>
                    </div>

                    <div className="testimonials-carousel-container">
                        <div className="testimonials-wrapper">
                            {testimonials.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`testimonial-slide ${index === testiSlide ? 'testimonial-slide--active' : ''}`}
                                >
                                    <div className="testimonial-card">
                                        <div className="testimonial-header">
                                            <div className="user-icon">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div className="user-info">
                                                <span className="user-name">{item.name}</span>
                                                <span className="user-handle">{item.handle}</span>
                                            </div>
                                            <i className="bi bi-instagram ms-auto insta-icon"></i>
                                        </div>
                                        <div className="testimonial-content">
                                            <div className="rating">
                                                {[...Array(item.rating || 5)].map((_, i) => (
                                                    <i key={i} className="bi bi-star-fill active"></i>
                                                ))}
                                            </div>
                                            <p className="testimonial-text">"{item.text}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        <div className="testi-dots">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`testi-dot ${i === testiSlide ? 'testi-dot--active' : ''}`}
                                    onClick={() => setTestiSlide(i)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
};

export default Home;
