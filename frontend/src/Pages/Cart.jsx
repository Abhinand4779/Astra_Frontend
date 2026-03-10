import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
    const { cart, addToCart, removeFromCart, clearCart } = useAuth();
    const navigate = useNavigate();

    const subtotal = cart.reduce((acc, item) => acc + (parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity), 0);

    if (cart.length === 0) {
        return (
            <div className="cart-page-empty">
                <div className="empty-cart-message">
                    <i className="bi bi-handbag"></i>
                    <h2>Your Shopping Bag is Empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <button onClick={() => navigate('/shop')} className="start-shopping-btn">Start Shopping</button>
                    <Link to="/wishlist" className="wishlist-link-empty">View your Wishlist →</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-top-bar">
                    <h1 className="cart-title">Your Bag ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h1>
                    <button className="clear-cart-btn" onClick={() => { if (window.confirm('Clear your entire bag?')) clearCart(); }}>
                        <i className="bi bi-trash3 me-1"></i> Clear Bag
                    </button>
                </div>

                <div className="cart-layout">
                    <div className="cart-items-section">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-img">
                                    <img src={item.images?.[0] || item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <div className="item-header">
                                        <h4>{item.name}</h4>
                                        <p className="item-price">{item.price}</p>
                                    </div>
                                    <p className="item-meta">Category: {item.category}</p>

                                    <div className="item-actions">
                                        <div className="qty-controls">
                                            <button onClick={() => addToCart(item, -1)} disabled={item.quantity <= 1}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => addToCart(item, 1)}>+</button>
                                        </div>
                                        <button
                                            className="remove-item-btn"
                                            onClick={() => removeFromCart(item.id)}
                                            title="Remove item"
                                        >
                                            <i className="bi bi-trash3"></i> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary-section">
                        <div className="summary-card">
                            <h3>Order Summary</h3>
                            <div className="summary-row">
                                <span>Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className="free">FREE</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Total (Incl. GST)</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <button onClick={() => navigate('/checkout')} className="checkout-btn">Proceed to Checkout</button>
                            <Link to="/wishlist" className="view-wishlist-link">
                                <i className="bi bi-heart me-1"></i> View Wishlist
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
