import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
    const { cart, addToCart } = useAuth();
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
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1 className="cart-title">Your Bag ({cart.length} items)</h1>

                <div className="cart-layout">
                    <div className="cart-items-section">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-img">
                                    <img src={item.images[0]} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <div className="item-header">
                                        <h4>{item.name}</h4>
                                        <p className="item-price">{item.price}</p>
                                    </div>
                                    <p className="item-meta">Category: {item.category}</p>

                                    <div className="item-actions">
                                        <div className="qty-controls">
                                            {/* For demo, we just use alert/placeholder for minus as delete isn't fully implemented yet */}
                                            <button onClick={() => addToCart(item, -1)} disabled={item.quantity <= 1}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => addToCart(item, 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary-section">
                        <div className="summary-card">
                            <h3>Order Summary</h3>
                            <div className="summary-row">
                                <span>Subtotal</span>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
