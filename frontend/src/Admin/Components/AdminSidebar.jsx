import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-brand">
                <h2>KIZA ADMIN</h2>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <span className="section-label">NAVIGATION</span>
                    <NavLink to="/admin/dashboard" className="nav-link">
                        <i className="bi bi-speedometer2"></i> Dashboard
                    </NavLink>
                </div>

                <div className="nav-section">
                    <span className="section-label">MODULES</span>
                    <NavLink to="/admin/categories" className="nav-link">
                        <i className="bi bi-grid"></i> Categories
                    </NavLink>
                    <NavLink to="/admin/products" className="nav-link">
                        <i className="bi bi-box-seam"></i> Products
                    </NavLink>
                    <NavLink to="/admin/customers" className="nav-link">
                        <i className="bi bi-people"></i> Customers
                    </NavLink>
                    <NavLink to="/admin/orders" className="nav-link">
                        <i className="bi bi-cart-check"></i> Orders History
                    </NavLink>
                </div>

                <div className="nav-section">
                    <span className="section-label">PAGES</span>
                    <NavLink to="/admin/sliders" className="nav-link">
                        <i className="bi bi-images"></i> Sliders
                    </NavLink>
                    <NavLink to="/admin/pages" className="nav-link">
                        <i className="bi bi-file-earmark-text"></i> Pages
                    </NavLink>
                </div>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
