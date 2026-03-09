import React from 'react';
import './AdminCustomers.css';

const AdminCustomers = () => {
    // Mock data for demo
    const customers = [
        { id: 1, name: 'Anjali Sharma', email: 'anjali@example.com', orders: 12, spent: '₹4,50,000', status: 'Active', joining: '12 Jan 2026' },
        { id: 2, name: 'Rahul Verma', email: 'rahul.v@example.com', orders: 5, spent: '₹85,200', status: 'Active', joining: '05 Feb 2026' },
        { id: 3, name: 'Priya Iyer', email: 'priya.i@example.com', orders: 8, spent: '₹1,20,000', status: 'Inactive', joining: '20 Jan 2026' },
        { id: 4, name: 'Vikram Singh', email: 'vikram.s@example.com', orders: 15, spent: '₹8,90,000', status: 'Active', joining: '01 Jan 2026' },
    ];

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
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-small">{customer.name.substring(0, 2).toUpperCase()}</div>
                                            <div className="d-flex flex-column">
                                                <span className="fw-bold">{customer.name}</span>
                                                <span className="text-muted small">{customer.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="fw-600">{customer.orders} Orders</span></td>
                                    <td><span className="fw-bold text-dark">{customer.spent}</span></td>
                                    <td>{customer.joining}</td>
                                    <td>
                                        <span className={`badge rounded-pill ${customer.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <button className="edit-btn"><i className="bi bi-chat-left-dots"></i></button>
                                        <button className="edit-btn"><i className="bi bi-pencil"></i></button>
                                        <button className="del-btn text-danger"><i className="bi bi-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCustomers;
