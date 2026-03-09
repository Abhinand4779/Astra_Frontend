import React from 'react';
import { useSite } from '../../context/SiteContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { config } = useSite();
    const productCount = config?.products?.length || 0;

    const stats = [
        {
            label: 'Total Revenue',
            value: '₹12,45,000',
            trend: '+12.5%',
            isUp: true,
            icon: 'bi-currency-rupee',
            bg: '#f0fdf4',
            color: '#16a34a'
        },
        {
            label: 'Active Orders',
            value: '48',
            trend: '+5.2%',
            isUp: true,
            icon: 'bi-cart-check',
            bg: '#eff6ff',
            color: '#2563eb'
        },
        {
            label: 'Total Products',
            value: productCount,
            trend: 'Live',
            isUp: true,
            icon: 'bi-gem',
            bg: '#fff7ed',
            color: '#ea580c'
        },
        {
            label: 'Site Visits',
            value: '1,284',
            trend: '-2.1%',
            isUp: false,
            icon: 'bi-eye',
            bg: '#f5f3ff',
            color: '#7c3aed'
        },
    ];

    const recentOrders = [
        { id: '#ORD-9281', customer: 'Anjali Sharma', items: 3, total: '₹85,000', status: 'Delivered', date: '2 hours ago' },
        { id: '#ORD-9280', customer: 'Rahul Verma', items: 1, total: '₹12,500', status: 'Processing', date: '5 hours ago' },
        { id: '#ORD-9279', customer: 'Priya Iyer', items: 2, total: '₹45,200', status: 'Pending', date: 'Yesterday' },
        { id: '#ORD-9278', customer: 'Vikram Singh', items: 4, total: '₹2,10,000', status: 'Delivered', date: 'Yesterday' },
    ];

    const topProducts = config?.products?.slice(0, 4) || [];

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h2>Welcome back, Admin</h2>
                <p>Here's what's happening with your store today.</p>
            </header>

            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card">
                        <div className="stat-left">
                            <span className="stat-label">{stat.label}</span>
                            <div className="stat-value">{stat.value}</div>
                            <div className={`stat-trend ${stat.isUp ? 'up' : 'down'}`}>
                                <i className={`bi ${stat.isUp ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`}></i>
                                {stat.trend} <span style={{ color: '#999', fontWeight: 400, marginLeft: '4px' }}>vs last month</span>
                            </div>
                        </div>
                        <div className="stat-icon-wrapper" style={{ backgroundColor: stat.bg, color: stat.color }}>
                            <i className={`bi ${stat.icon}`}></i>
                        </div>
                    </div>
                ))}
            </div>

            <main className="dashboard-main-grid">
                {/* Recent Orders Section */}
                <div className="premium-card">
                    <div className="card-title-row">
                        <h3>Recent Transactions</h3>
                        <button className="btn btn-sm btn-light">View All</button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle custom-table">
                            <thead>
                                <tr>
                                    <th className="text-muted small">ORDER ID</th>
                                    <th className="text-muted small">CUSTOMER</th>
                                    <th className="text-muted small">STATUS</th>
                                    <th className="text-muted small">DATE</th>
                                    <th className="text-muted small text-end">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, idx) => (
                                    <tr key={idx}>
                                        <td><span className="fw-bold fs-7">{order.id}</span></td>
                                        <td>{order.customer}</td>
                                        <td>
                                            <span className={`badge rounded-pill fw-500 ${order.status === 'Delivered' ? 'bg-success-subtle text-success' :
                                                    order.status === 'Processing' ? 'bg-primary-subtle text-primary' : 'bg-warning-subtle text-warning'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="text-muted small">{order.date}</td>
                                        <td className="text-end fw-bold">{order.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Products Section */}
                <div className="premium-card">
                    <div className="card-title-row">
                        <h3>Top Selling</h3>
                    </div>
                    <div className="activity-list">
                        {topProducts.length > 0 ? (
                            topProducts.map((product, idx) => (
                                <div key={idx} className="activity-item">
                                    <img src={product.images[0]} alt={product.name} className="activity-img" />
                                    <div className="activity-info">
                                        <div className="activity-title text-truncate" style={{ maxWidth: '150px' }}>{product.name}</div>
                                        <div className="activity-meta">{product.category}</div>
                                    </div>
                                    <div className="activity-price">{product.price}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4 text-muted small">
                                No products found. Go to Products to add some.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
