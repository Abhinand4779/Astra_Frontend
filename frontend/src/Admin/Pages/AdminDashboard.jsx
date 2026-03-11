import React from 'react';
import { useSite } from '../../context/SiteContext';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { config, products = [] } = useSite();
    const { adminOrders = [], customers = [] } = useAuth();

    const productCount = products.length;
    const orderCount = adminOrders.length;
    const customerCount = customers.length;

    // Calculate actual revenue (excluding cancelled)
    const totalRevenue = adminOrders.reduce((acc, order) => {
        if ((order.order_status || order.status)?.toLowerCase() === 'cancelled') return acc;
        const amount = parseInt((order.total_amount || order.total || '0').replace(/[^\d]/g, ''));
        return acc + (isNaN(amount) ? 0 : amount);
    }, 0);

    const stats = [
        {
            label: 'Total Revenue',
            value: `₹${totalRevenue.toLocaleString()}`,
            trend: 'Live',
            isUp: true,
            icon: 'bi-currency-rupee',
            bg: '#f0fdf4',
            color: '#16a34a'
        },
        {
            label: 'Active Orders',
            value: orderCount,
            trend: 'Live',
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
            label: 'Total Customers',
            value: customerCount,
            trend: 'Live',
            isUp: true,
            icon: 'bi-people',
            bg: '#f5f3ff',
            color: '#7c3aed'
        },
    ];

    const recentOrders = adminOrders.slice(0, 5).map(order => ({
        id: (order._id || order.id).substring(0, 10),
        customer: order.shipping_address?.name || (order.shipping_address?.firstName ? `${order.shipping_address.firstName} ${order.shipping_address.lastName}` : 'Guest'),
        items: order.items?.length || 0,
        total: order.total_amount || order.total,
        status: order.order_status || order.status || 'Pending',
        date: order.created_at ? new Date(order.created_at).toLocaleDateString() : (order.date || 'Today')
    }));

    // Calculate actual top products from sales
    const productSales = {};
    adminOrders.forEach(order => {
        if ((order.order_status || order.status)?.toLowerCase() === 'cancelled') return;
        (order.items || []).forEach(item => {
            const id = item.product_id || item.id;
            if (!productSales[id]) {
                productSales[id] = {
                    name: item.name,
                    category: item.category || 'Jewelry',
                    image: item.image || (item.images && item.images[0]),
                    price: item.price,
                    count: 0
                };
            }
            productSales[id].count += (item.quantity || 1);
        });
    });

    const sortedSales = Object.values(productSales).sort((a, b) => b.count - a.count);
    const topProducts = sortedSales.length > 0 ? sortedSales.slice(0, 4) : (config?.products?.slice(0, 4) || []);

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
                                            <span className={`badge rounded-pill fw-500 ${order.status?.toLowerCase() === 'delivered' ? 'bg-success-subtle text-success' :
                                                order.status?.toLowerCase() === 'shipped' ? 'bg-info-subtle text-info' :
                                                    order.status?.toLowerCase() === 'processing' ? 'bg-primary-subtle text-primary' :
                                                        order.status?.toLowerCase() === 'cancelled' ? 'bg-danger-subtle text-danger' :
                                                            'bg-warning-subtle text-warning'
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
                                    <img src={(product.images && product.images[0]) || product.image || (product.img && product.img[0])} alt={product.name} className="activity-img" />
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
