import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminOrders.css';

const AdminOrders = () => {
    const { adminOrders, updateOrderStatus } = useAuth();
    const [updatingId, setUpdatingId] = useState(null);
    const [viewingDetailsId, setViewingDetailsId] = useState(null);
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
                                                className="btn btn-sm btn-outline-dark me-2"
                                                onClick={() => setViewingDetailsId(viewingDetailsId === (order._id || order.id) ? null : (order._id || order.id))}
                                            >
                                                {viewingDetailsId === (order._id || order.id) ? 'Hide' : 'View Details'}
                                            </button>
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

                                    {/* --- SHIPPING ADDRESS & ITEMS DETAILS --- */}
                                    {viewingDetailsId === (order._id || order.id) && (
                                        <tr className="bg-white elevation-1">
                                            <td colSpan="5" className="p-4 border-start border-4 border-primary">
                                                <div className="row">
                                                    <div className="col-md-5 border-end">
                                                        <h6 className="text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', color: '#b59b5a' }}>
                                                            <i className="bi bi-truck me-2"></i>Shipping Address
                                                        </h6>
                                                        <div className="shipping-info-box">
                                                            <p className="mb-1 fw-bold">{order.shipping_address?.firstName} {order.shipping_address?.lastName}</p>
                                                            <p className="mb-1 text-muted small">{order.shipping_address?.address}, {order.shipping_address?.apartment && order.shipping_address?.apartment + ','}</p>
                                                            <p className="mb-1 text-muted small">{order.shipping_address?.city}, {order.shipping_address?.state} - {order.shipping_address?.zipCode}</p>
                                                            <p className="mb-0 fw-bold small mt-2">
                                                                <i className="bi bi-telephone me-2"></i>{order.shipping_address?.phone || 'N/A'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7 ps-4">
                                                        <h6 className="text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', color: '#b59b5a' }}>
                                                            <i className="bi bi-box-seam me-2"></i>Ordered Items ({order.items?.length})
                                                        </h6>
                                                        <div className="order-items-scroll" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                                            {order.items?.map((item, i) => (
                                                                <div key={i} className="d-flex align-items-center mb-3 bg-light p-2 rounded">
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }}
                                                                        className="me-3"
                                                                    />
                                                                    <div className="flex-grow-1">
                                                                        <div className="fw-600 small">{item.name}</div>
                                                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>Qty: {item.quantity} | {item.price}</div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {updatingId === (order._id || order.id) && (
                                        <tr className="bg-light">
                                            <td colSpan="5" className="p-4 border-start border-4 border-primary">
                                                <div className="row g-4 mb-4">
                                                    {/* Shipping Address Section */}
                                                    <div className="col-md-6">
                                                        <h6 className="fw-bold text-dark mb-3"><i className="bi bi-geo-alt-fill me-2 text-primary"></i>Shipping Address</h6>
                                                        <div className="p-3 bg-white rounded shadow-sm border">
                                                            <div className="fw-bold mb-1">{order.shipping_address?.name || (order.shipping_address?.firstName ? `${order.shipping_address.firstName} ${order.shipping_address.lastName}` : (order.shipTo?.firstName ? `${order.shipTo.firstName} ${order.shipTo.lastName}` : 'Guest'))}</div>
                                                            <div className="text-muted small mb-1">{order.shipping_address?.street || order.shipping_address?.address || order.shipTo?.address || 'N/A'}</div>
                                                            <div className="text-muted small mb-1">
                                                                {order.shipping_address?.city || order.shipTo?.city || ''}, {order.shipping_address?.state || order.shipTo?.state || ''} {order.shipping_address?.zipCode || order.shipping_address?.postalCode || order.shipTo?.postalCode || ''}
                                                            </div>
                                                            <div className="text-muted small mb-2">{order.shipping_address?.country || 'India'}</div>
                                                            <div className="fw-500 small"><i className="bi bi-telephone-fill me-2"></i>{order.shipping_address?.phone || order.shipTo?.phone || 'No phone provided'}</div>
                                                        </div>
                                                    </div>

                                                    {/* Order Items Section */}
                                                    <div className="col-md-6">
                                                        <h6 className="fw-bold text-dark mb-3"><i className="bi bi-box-seam-fill me-2 text-primary"></i>Items Ordered</h6>
                                                        <div className="p-3 bg-white rounded shadow-sm border">
                                                            {order.items?.map((item, i) => (
                                                                <div key={i} className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom last-border-0">
                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <img src={item.image || (item.images && item.images[0])} alt="" style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px' }} />
                                                                        <div className="small">
                                                                            <span className="fw-bold d-block">{item.name}</span>
                                                                            <span className="text-muted">Qty: {item.quantity}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="small fw-bold">{item.price}</div>
                                                                </div>
                                                            ))}
                                                            <div className="d-flex justify-content-between mt-2 pt-2 fw-bold text-primary">
                                                                <span>Total </span>
                                                                <span>{order.total_amount || order.total}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Status Update section */}
                                                <div className="p-3 bg-white rounded shadow-sm border">
                                                    <h6 className="fw-bold text-dark mb-3"><i className="bi bi-pencil-square me-2 text-primary"></i>Update Order Status</h6>
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
                                                            <button className="btn btn-sm btn-primary w-100 py-2" onClick={() => handleUpdate(order._id || order.id)}>Save & Notify</button>
                                                        </div>
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
