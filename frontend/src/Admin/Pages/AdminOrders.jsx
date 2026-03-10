import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminOrders.css';

const AdminOrders = () => {
    const { adminOrders, updateOrderStatus } = useAuth();
    const [updatingId, setUpdatingId] = useState(null);
    const [statusData, setStatusData] = useState({
        status: 'Processing',
        trackingId: '',
        trackingUrl: ''
    });

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-success-subtle text-success';
            case 'shipped': return 'bg-info-subtle text-info';
            case 'processing': return 'bg-primary-subtle text-primary';
            case 'pending': return 'bg-warning-subtle text-warning';
            case 'cancelled': return 'bg-danger-subtle text-danger';
            default: return 'bg-secondary-subtle text-secondary';
        }
    };

    const handleUpdate = async (id) => {
        const success = await updateOrderStatus(id, statusData);
        if (success) {
            setUpdatingId(null);
            alert("Order updated and notification sent!");
        }
    };

    return (
        <div className="admin-orders px-4">
            <div className="page-header mb-4">
                <h2 className="page-title">Order Management</h2>
                <p className="page-subtitle">Track and manage customer orders. Updating status to 'Shipped' sends a tracking email.</p>
            </div>

            <div className="premium-card">
                <div className="table-responsive">
                    <table className="admin-table custom-table">
                        <thead>
                            <tr>
                                <th>ORDER</th>
                                <th>CUSTOMER</th>
                                <th>TOTAL</th>
                                <th>STATUS</th>
                                <th className="text-end">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminOrders.length > 0 ? adminOrders.map((order) => (
                                <React.Fragment key={order._id || order.id}>
                                    <tr>
                                        <td><span className="fw-bold fs-7">{order._id || order.id}</span></td>
                                        <td>
                                            <div className="d-flex flex-column">
                                                <span className="fw-bold">{order.shipping_address?.name || (order.shipping_address?.firstName ? `${order.shipping_address.firstName} ${order.shipping_address.lastName}` : (order.shipTo?.firstName ? `${order.shipTo.firstName} ${order.shipTo.lastName}` : 'Guest'))}</span>
                                                <span className="text-muted small">{order.shipping_address?.email || order.shipTo?.email || 'No Email'}</span>
                                            </div>
                                        </td>
                                        <td><span className="fw-bold text-dark">{order.total_amount || order.total}</span></td>
                                        <td>
                                            <span className={`badge rounded-pill ${getStatusColor(order.order_status || order.status || 'Pending')}`}>
                                                {order.order_status || order.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="text-end">
                                            <button
                                                className="btn btn-sm btn-dark"
                                                onClick={() => {
                                                    setUpdatingId(updatingId === (order._id || order.id) ? null : (order._id || order.id));
                                                    setStatusData({ status: order.order_status || 'Shipped', trackingId: order.tracking_id || '', trackingUrl: order.tracking_url || '' });
                                                }}
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                    {updatingId === (order._id || order.id) && (
                                        <tr className="bg-light">
                                            <td colSpan="5" className="p-3">
                                                <div className="row g-3 align-items-end">
                                                    <div className="col-md-3">
                                                        <label className="form-label small fw-bold">Status</label>
                                                        <select className="form-select form-select-sm" value={statusData.status} onChange={(e) => setStatusData({ ...statusData, status: e.target.value })}>
                                                            <option>Processing</option>
                                                            <option>Shipped</option>
                                                            <option>Delivered</option>
                                                            <option>Cancelled</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label small fw-bold">Tracking ID</label>
                                                        <input type="text" className="form-control form-control-sm" placeholder="SHP-12345" value={statusData.trackingId} onChange={(e) => setStatusData({ ...statusData, trackingId: e.target.value })} />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label small fw-bold">Tracking Link</label>
                                                        <input type="text" className="form-control form-control-sm" placeholder="https://courier.com/track/..." value={statusData.trackingUrl} onChange={(e) => setStatusData({ ...statusData, trackingUrl: e.target.value })} />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <button className="btn btn-sm btn-primary w-100" onClick={() => handleUpdate(order._id || order.id)}>Save & Notify</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                                        <span className="text-muted">No orders found.</span>
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
