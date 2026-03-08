import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allProducts } from '../data/products';
import { useAuth } from '../context/AuthContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, addToCart } = useAuth();
    const [selectedImg, setSelectedImg] = useState(0);

    // Find the actual product by ID
    const product = allProducts.find(p => p.id === parseInt(id)) || allProducts[0];

    const [quantity, setQuantity] = useState(1);

    const handlePurchaseClick = (action) => {
        if (!user) {
            alert(`Please login to ${action === 'cart' ? 'add items to cart' : 'buy this item'}.`);
            navigate('/profile', { state: { from: `/product/${id}`, action } });
            return;
        }

        if (action === 'buy') {
            addToCart(product, quantity);
            navigate('/checkout');
        } else {
            addToCart(product, quantity);
            alert('Added to Cart!');
        }
    };

    return (
        <div className="product-detail-page">
            <div className="detail-container">
                <nav className="detail-breadcrumb">
                    <span onClick={() => navigate('/')}>Home</span> /
                    <span onClick={() => navigate('/shop')}>Shop</span> /
                    <span className="current">{product.name}</span>
                </nav>

                <div className="product-main-layout">
                    {/* Left: Image Gallery */}
                    <div className="image-gallery-section">
                        <div className="thumbnail-list">
                            {product.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`thumbnail-item ${selectedImg === idx ? 'active' : ''}`}
                                    onClick={() => setSelectedImg(idx)}
                                >
                                    <img src={img} alt={`Thumb ${idx}`} />
                                </div>
                            ))}
                        </div>
                        <div className="main-image-wrapper">
                            {product.discount && <span className="detail-discount-badge">-{product.discount}</span>}
                            <img src={product.images[selectedImg]} alt={product.name} className="main-display-img" />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="product-info-section">
                        <span className="detail-category">{product.category}</span>
                        <h1 className="detail-title">{product.name}</h1>

                        <div className="detail-price-wrapper">
                            <span className="current-price">{product.price}</span>
                            {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
                        </div>

                        <p className="detail-description">{product.description}</p>

                        <div className="product-specs">
                            <h5>Product Specification:</h5>
                            <ul>
                                {product.details.map((spec, i) => (
                                    <li key={i}>{spec}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="purchase-controls">
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>

                            <div className="action-buttons">
                                <button className="add-to-cart-btn" onClick={() => handlePurchaseClick('cart')}>
                                    <i className="bi bi-cart3 me-2"></i> Add To Cart
                                </button>
                                <button className="buy-now-detail-btn" onClick={() => handlePurchaseClick('buy')}>
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        <div className="trust-badges">
                            <div className="badge-item">
                                <i className="bi bi-truck"></i>
                                <span>Free Shipping</span>
                            </div>
                            <div className="badge-item">
                                <i className="bi bi-shield-check"></i>
                                <span>Secure Payment</span>
                            </div>
                            <div className="badge-item">
                                <i className="bi bi-arrow-repeat"></i>
                                <span>Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
