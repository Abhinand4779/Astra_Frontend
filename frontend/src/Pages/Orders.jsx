import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Orders.css';

const Orders = () => {
    const { orders, user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/profile');
        return null;
    }

    if (orders.length === 0) {
        return (
            <div className="orders-page-empty">
                <div className="empty-orders-message">
                    <i className="bi bi-box-seam"></i>
                    <h2>No Orders Found</h2>
                    <p>You haven't placed any orders yet. Once you do, they will appear here!</p>
                    <button onClick={() => navigate('/shop')} className="shop-now-btn">Shop Now</button>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="orders-container">
                <h1 className="orders-title">Your Orders</h1>
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <div className="header-left">
                                    <p className="order-id">Order ID: <span>{order.id}</span></p>
                                    <p className="order-date">Placed on: {order.date}</p>
                                </div>
                                <div className="header-right">
                                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="order-body">
                                <div className="order-items">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="mini-item">
                                            <img src={item.images[0]} alt={item.name} />
                                            <div className="mini-item-info">
                                                <h6>{item.name}</h6>
                                                <p>Qty: {item.quantity} × {item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-footer">
                                    <div className="shipping-mini">
                                        <h6>Shipping to:</h6>
                                        <p>{order.shipTo.firstName} {order.shipTo.address}, {order.shipTo.city}</p>
                                    </div>
                                    <div className="total-mini">
                                        <p>Total Amount:</p>
                                        <h5>₹{order.total.toLocaleString()}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
