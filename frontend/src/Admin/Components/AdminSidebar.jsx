import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen, onClose }) => {
    const { logout, admin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout from Admin Panel?')) {
            logout();
            navigate('/admin/login');
        }
    };

    const handleNavClick = () => {
        // Auto-close sidebar on mobile when navigating
        if (window.innerWidth < 992 && onClose) {
            onClose();
        }
    };

    return (
        <aside className={`admin-sidebar ${isOpen ? 'is-open' : ''}`}>
            <div className="sidebar-brand">
                <div className="brand-logo">
                    <i className="bi bi-shield-lock"></i>
                </div>
                <h2>ASTRA <span>ADMIN</span></h2>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <span className="section-label">OVERVIEW</span>
                    <NavLink to="/admin/dashboard" className="nav-link" onClick={handleNavClick}>
                        <i className="bi bi-speedometer2"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </div>

                <div className="nav-section">
                    <span className="section-label">INVENTORY</span>
                    <NavLink to="/admin/categories" className="nav-link" onClick={handleNavClick}>
                        <i className="bi bi-grid-3x3"></i>
                        <span>Categories</span>
                    </NavLink>
                    <NavLink to="/admin/products" className="nav-link" onClick={handleNavClick}>
                        <i className="bi bi-gem"></i>
                        <span>Products</span>
                    </NavLink>
                </div>

                <div className="nav-section">
                    <span className="section-label">COMMERCE</span>
                    <NavLink to="/admin/customers" className="nav-link" onClick={handleNavClick}>
                        <i className="bi bi-people"></i>
                        <span>Customers</span>
                    </NavLink>
                    <NavLink to="/admin/orders" className="nav-link" onClick={handleNavClick}>
                        <i className="bi bi-cart4"></i>
                        <span>Orders</span>
                    </NavLink>
                </div>

                <div className="nav-section">
                    <span className="section-label">STOREFRONT</span>
                    <NavLink to="/admin/cms" className="nav-link" onClick={handleNavClick}>
                        <i className="bi bi-window-sidebar"></i>
                        <span>Site Customizer</span>
                    </NavLink>
                    <NavLink to="/admin/sliders" className="nav-link" onClick={handleNavClick}>
                        <i className="bi bi-images"></i>
                        <span>Hero Sliders</span>
                    </NavLink>
                </div>
            </nav>

            <div className="sidebar-user-centric">
                <div className="user-profile-card">
                    <div className="user-avatar">
                        {admin?.email?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="user-details">
                        <span className="user-name">Admin Portal</span>
                        <span className="user-email">{admin?.email || 'admin@astra.in'}</span>
                    </div>
                    <button className="mini-logout" onClick={handleLogout} title="Log Out">
                        <i className="bi bi-power"></i>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
