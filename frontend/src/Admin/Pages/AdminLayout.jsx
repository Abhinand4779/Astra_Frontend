import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import AdminHeader from '../Components/AdminHeader';
import AdminDashboard from '../Pages/AdminDashboard';
import AdminCategories from '../Pages/AdminCategories';
import AdminProducts from '../Pages/AdminProducts';
import AdminCMS from '../Pages/AdminCMS';
import AdminSliders from '../Pages/AdminSliders';
import AdminOrders from '../Pages/AdminOrders';
import AdminCustomers from '../Pages/AdminCustomers';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
    const { admin, syncAdminData } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    // Sync admin data on mount or when admin state exists
    React.useEffect(() => {
        if (admin) {
            syncAdminData();
        }
    }, [admin, syncAdminData]);

    // Auto-close on smaller screens
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    // Check if admin is logged in
    if (!admin) {
        return <Navigate to="/admin/login" />;
    }

    return (
        <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {/* Mobile overlay — clicking it closes the sidebar */}
            {isSidebarOpen && window.innerWidth < 992 && (
                <div className="sidebar-overlay" onClick={closeSidebar}></div>
            )}
            <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <div className="admin-main-wrapper">
                <AdminHeader toggleSidebar={toggleSidebar} />
                <main className="admin-content-area">
                    <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="categories" element={<AdminCategories />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="cms" element={<AdminCMS />} />
                        <Route path="sliders" element={<AdminSliders />} />
                        <Route path="customers" element={<AdminCustomers />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="*" element={<Navigate to="dashboard" />} />
                    </Routes>
                </main>
                <footer className="admin-footer">
                    <div className="footer-left">2026 © ASTRA - Admin Panel</div>
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
