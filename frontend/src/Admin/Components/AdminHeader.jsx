import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminHeader.css';

const AdminHeader = ({ toggleSidebar }) => {
    const { admin } = useAuth();

    return (
        <header className="admin-header">
            <div className="header-left">
                <button className="menu-toggle" onClick={toggleSidebar}>
                    <i className="bi bi-list"></i>
                </button>
                <div className="admin-search">
                    <input type="text" placeholder="Search..." />
                    <button className="search-btn">Search</button>
                </div>
            </div>

            <div className="header-right">
                <div className="notification-bell">
                    <i className="bi bi-bell"></i>
                    <span className="dot"></span>
                </div>
                <div className="admin-profile">
                    <div className="admin-avatar">
                        {admin?.email?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="admin-info">
                        <span className="admin-name">Admin</span>
                        <span className="admin-role">{admin?.email || 'admin'}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
