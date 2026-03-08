import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import AdminHeader from '../Components/AdminHeader';
import AdminDashboard from '../Pages/AdminDashboard';
import AdminCategories from '../Pages/AdminCategories';
import AdminProducts from '../Pages/AdminProducts';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
    const { admin } = useAuth();

    if (!admin) {
        return <Navigate to="/admin/login" />;
    }

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main-content">
                <AdminHeader />
                <main className="admin-page-body">
                    <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="categories" element={<AdminCategories />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="customers" element={<div>Customers List Coming Soon</div>} />
                        <Route path="orders" element={<div>Orders History Coming Soon</div>} />
                        <Route path="*" element={<Navigate to="dashboard" />} />
                    </Routes>
                </main>
                <footer className="admin-footer">
                    <div className="footer-left">2026 © KIZA - Admin</div>
                    <div className="footer-links">
                        <span>About</span>
                        <span>Support</span>
                        <span>Contact Us</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
