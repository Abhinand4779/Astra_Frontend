import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminCustomers.css';

const AdminCustomers = () => {
    const { customers, adminOrders } = useAuth();

    // Helper to calculate stats per customer
    const getCustomerStats = (email) => {
        const userOrders = adminOrders.filter(o =>
            (o.shipping_address?.email === email) ||
            (o.shipTo?.email === email) ||
            (o.email === email)
        );
        const spent = userOrders.reduce((acc, order) => {
            if ((order.order_status || order.status)?.toLowerCase() === 'cancelled') return acc;
            const amount = parseInt((order.total_amount || order.total || '0').replace(/[^\d]/g, ''));
            return acc + (isNaN(amount) ? 0 : amount);
        }, 0);
        return { count: userOrders.length, spent: `₹${spent.toLocaleString()}` };
    };

    // If customers is not yet loaded or empty
    if (!customers || customers.length === 0) {
        return (
            <div className="admin-customers px-4">
                <div className="page-header mb-4">
                    <h2 className="page-title">Customer Directory</h2>
                    <p className="page-subtitle">No customers found in the database.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-customers px-4">
            <div className="page-header mb-4 d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="page-title">Customer Directory</h2>
                    <p className="page-subtitle">View and manage your registered users and their purchase history.</p>
                </div>
                <button className="btn btn-dark px-4 py-2" style={{ borderRadius: '12px' }}>
                    <i className="bi bi-download me-2"></i> Export CSV
                </button>
            </div>

            <div className="premium-card">
                <div className="table-responsive">
                    <table className="admin-table custom-table">
                        <thead>
                            <tr>
                                <th>CUSTOMER</th>
                                <th>ORDERS</th>
                                <th>TOTAL SPENT</th>
                                <th>JOINING DATE</th>
                                <th>STATUS</th>
                                <th className="text-end">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => {
                                const stats = getCustomerStats(customer.email);
                                return (
                                    <tr key={customer._id || customer.id}>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="avatar-small">{(customer.name || 'U').substring(0, 2).toUpperCase()}</div>
                                                <div className="d-flex flex-column">
                                                    <span className="fw-bold">{customer.name}</span>
                                                    <span className="text-muted small">
                                                        {customer.email}
                                                        {customer.is_admin && <span className="badge bg-warning text-dark ms-1" style={{ fontSize: '10px' }}>Admin</span>}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="fw-600">{stats.count} Orders</span></td>
                                        <td><span className="fw-bold text-dark">{stats.spent}</span></td>
                                        <td>{customer.created_at ? new Date(customer.created_at).toLocaleDateString() : (customer.joining || new Date().toLocaleDateString())}</td>
                                        <td>
                                            <span className={`badge rounded-pill ${(customer.status || 'Active') === 'Active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                                                {customer.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="text-end">
                                            <button className="edit-btn"><i className="bi bi-chat-left-dots"></i></button>
                                            <button className="edit-btn"><i className="bi bi-pencil"></i></button>
                                            <button className="del-btn text-danger"><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCustomers;

