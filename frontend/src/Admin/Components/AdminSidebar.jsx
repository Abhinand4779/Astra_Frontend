import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminSidebar.css';

const AdminSidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout from Admin Panel?')) {
            logout();
            navigate('/admin/login');
        }
    };

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-brand">
                <div className="brand-logo">A</div>
                <h2>ASTRA <span>ADMIN</span></h2>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <span className="section-label">MAIN MENU</span>
                    <NavLink to="/admin/dashboard" className="nav-link">
                        <i className="bi bi-grid-1x2-fill"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </div>

                <div className="nav-section">
                    <span className="section-label">STORE MANAGEMENT</span>
                    <NavLink to="/admin/categories" className="nav-link">
                        <i className="bi bi-tags-fill"></i>
                        <span>Categories</span>
                    </NavLink>
                    <NavLink to="/admin/products" className="nav-link">
                        <i className="bi bi-gem"></i>
                        <span>Products</span>
                    </NavLink>
                    <NavLink to="/admin/customers" className="nav-link">
                        <i className="bi bi-people-fill"></i>
                        <span>Customers</span>
                    </NavLink>
                    <NavLink to="/admin/orders" className="nav-link">
                        <i className="bi bi-bag-check-fill"></i>
                        <span>Orders</span>
                    </NavLink>
                </div>

                <div className="nav-section">
                    <span className="section-label">DESIGN & CONTENT</span>
                    <NavLink to="/admin/cms" className="nav-link">
                        <i className="bi bi-palette-fill"></i>
                        <span>Site Customizer</span>
                    </NavLink>
                    <NavLink to="/admin/sliders" className="nav-link">
                        <i className="bi bi-card-image"></i>
                        <span>Hero Sliders</span>
                    </NavLink>
                </div>
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-left"></i>
                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
