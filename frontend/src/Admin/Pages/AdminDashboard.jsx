import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const stats = [
        { label: 'Customers', value: '2', change: '+ 100%', sub: 'Since last month', icon: 'bi-people', color: 'blue' },
        { label: 'Orders', value: '0', change: '0%', sub: 'Since last month', icon: 'bi-cart', color: 'purple' },
        { label: 'Revenue', value: '₹ 0', change: '0%', sub: 'Since last month', icon: 'bi-currency-rupee', color: 'indigo' },
        { label: 'Growth', value: '+ 100%', change: '+ 100%', sub: 'Since last month', icon: 'bi-graph-up', color: 'cyan' },
    ];

    return (
        <div className="admin-dashboard">
            <h2 className="page-title">Dashboard</h2>

            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card">
                        <div className="stat-content">
                            <span className="stat-label">{stat.label}</span>
                            <h3 className="stat-value">{stat.value}</h3>
                            <div className="stat-detail">
                                <span className={`stat-change ${stat.change.includes('+') ? 'up' : ''}`}>
                                    {stat.change.includes('+') ? '↑' : '↓'} {stat.change}
                                </span>
                                <span className="stat-sub">{stat.sub}</span>
                            </div>
                        </div>
                        <div className={`stat-icon-box ${stat.color}`}>
                            <i className={`bi ${stat.icon}`}></i>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-row">
                <div className="content-card top-selling">
                    <div className="card-header">
                        <h3>TOP SELLING PRODUCTS</h3>
                    </div>
                    <div className="card-body empty">
                        {/* Will populate from real data later */}
                    </div>
                </div>
            </div>

            <div className="dashboard-row">
                <div className="content-card recent-activity">
                    <div className="card-header">
                        <h3>RECENT ACTIVITY</h3>
                    </div>
                    <div className="card-body empty">
                        {/* Will populate from real data later */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
