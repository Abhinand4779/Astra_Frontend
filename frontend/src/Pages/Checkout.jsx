import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { user, cart, placeOrder } = useAuth();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState({ text: '', type: '' });

    // Calculate real subtotal from cart
    const subtotal = cart.reduce((acc, item) => acc + (parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity), 0);
    const total = subtotal - discount;

    const applyCoupon = () => {
        if (couponCode.toUpperCase() === 'KIZA10') {
            const amount = subtotal * 0.1;
            setDiscount(amount);
            setCouponMessage({ text: 'Coupon applied successfully! You saved 10%', type: 'success' });
        } else if (couponCode.trim() === '') {
            setCouponMessage({ text: 'Please enter a code', type: 'error' });
        } else {
            setCouponMessage({ text: 'Invalid coupon code', type: 'error' });
            setDiscount(0);
        }
    };

    const [shippingData, setShippingData] = useState({
        firstName: '',
        lastName: '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India'
    });

    const handleInputChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePayment = () => {
        // Here we will eventually integrate Stripe
        alert("Redirecting to Stripe Payment Gateway...");

        // Simulating successful payment for now
        placeOrder(shippingData);
        alert("Payment Successful! Order Placed.");
        navigate('/orders');
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-header">
                    <h1>Checkout</h1>
                    <div className="checkout-steps">
                        <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                            <span className="step-num">1</span>
                            <span className="step-label">Shipping</span>
                        </div>
                        <div className="step-line"></div>
                        <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                            <span className="step-num">2</span>
                            <span className="step-label">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="checkout-layout">
                    {/* Left: Form Area */}
                    <div className="checkout-main">
                        {step === 1 ? (
                            <form className="shipping-form" onSubmit={handleShippingSubmit}>
                                <h3 className="section-title">Shipping Information</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" name="firstName" value={shippingData.firstName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" name="lastName" value={shippingData.lastName} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={shippingData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" name="phone" value={shippingData.phone} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Street Address</label>
                                    <input type="text" name="address" value={shippingData.address} onChange={handleInputChange} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input type="text" name="city" value={shippingData.city} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>State</label>
                                        <input type="text" name="state" value={shippingData.state} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>ZIP Code</label>
                                        <input type="text" name="zipCode" value={shippingData.zipCode} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Country</label>
                                        <select name="country" value={shippingData.country} onChange={handleInputChange}>
                                            <option value="India">India</option>
                                            <option value="USA">USA</option>
                                            <option value="UAE">UAE</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="proceed-btn">Continue to Payment</button>
                            </form>
                        ) : (
                            <div className="payment-ready">
                                <h3 className="section-title">Billing & Payment</h3>
                                <p>All items will be shipped to:</p>
                                <div className="address-preview">
                                    <p><strong>{shippingData.firstName} {shippingData.lastName}</strong></p>
                                    <p>{shippingData.address}</p>
                                    <p>{shippingData.city}, {shippingData.state} - {shippingData.zipCode}</p>
                                    <p>{shippingData.phone}</p>
                                </div>
                                <button onClick={() => setStep(1)} className="edit-addr-btn">Edit Shipping Info</button>

                                <div className="stripe-placeholder">
                                    <i className="bi bi-credit-card-2-front"></i>
                                    <p>Secure payment via Stripe</p>
                                    <button onClick={handlePayment} className="pay-now-btn">Pay Now with Stripe</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Order Summary */}
                    <div className="checkout-sidebar">
                        <div className="summary-card">
                            <h3>Order Summary</h3>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>

                            {discount > 0 && (
                                <div className="summary-row discount">
                                    <span>Discount (10%)</span>
                                    <span>-₹{discount.toLocaleString()}</span>
                                </div>
                            )}

                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className="free">FREE</span>
                            </div>

                            <div className="coupon-section">
                                <div className="coupon-input-group">
                                    <input
                                        type="text"
                                        placeholder="Coupon Code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <button type="button" onClick={applyCoupon}>Apply</button>
                                </div>
                                {couponMessage.text && (
                                    <p className={`coupon-msg ${couponMessage.type}`}>
                                        {couponMessage.text}
                                    </p>
                                )}
                            </div>

                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                            <p className="gst-info">Inclusive of all taxes & GST</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
