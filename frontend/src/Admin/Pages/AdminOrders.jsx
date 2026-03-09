import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminOrders.css';

const AdminOrders = () => {
    const { orders } = useAuth();

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'bg-success-subtle text-success';
            case 'processing': return 'bg-primary-subtle text-primary';
            case 'pending': return 'bg-warning-subtle text-warning';
            case 'cancelled': return 'bg-danger-subtle text-danger';
            default: return 'bg-secondary-subtle text-secondary';
        }
    };

    return (
        <div className="admin-orders px-4">
            <div className="page-header mb-4">
                <h2 className="page-title">Order Management</h2>
                <p className="page-subtitle">Track and manage your customer's orders and shipping status.</p>
            </div>

            <div className="premium-card">
                <div className="table-responsive">
                    <table className="admin-table custom-table">
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>CUSTOMER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>STATUS</th>
                                <th className="text-end">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? orders.map((order) => (
                                <tr key={order.id}>
                                    <td><span className="fw-bold fs-7">{order.id}</span></td>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <span className="fw-bold">{order.shipTo?.firstName} {order.shipTo?.lastName}</span>
                                            <span className="text-muted small">{order.shipTo?.email}</span>
                                        </div>
                                    </td>
                                    <td>{order.date}</td>
                                    <td><span className="fw-bold text-dark">₹{order.total.toLocaleString()}</span></td>
                                    <td>
                                        <span className={`badge rounded-pill ${getStatusColor(order.status || 'Pending')}`}>
                                            {order.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <button className="edit-btn"><i className="bi bi-eye"></i></button>
                                        <button className="del-btn text-danger"><i className="bi bi-printer"></i></button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-5">
                                        <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                                        <span className="text-muted">No orders found yet.</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
