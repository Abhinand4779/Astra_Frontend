import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact';
import { Profile } from './Pages/Profile';
import { ShippingReturn } from './Pages/ShippingReturn';
import { PrivacyPolicy } from './Pages/PrivacyPolicy';
import Shop from './Pages/Shop';
import ProductDetail from './Pages/ProductDetail';
import Checkout from './Pages/Checkout';
import Cart from './Pages/Cart';
import Orders from './Pages/Orders';
import AdminLayout from './Admin/Pages/AdminLayout';
import AdminLogin from './Admin/Pages/AdminLogin';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
    const isAdminRoute = window.location.pathname.startsWith('/admin');

    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    {!window.location.pathname.startsWith('/admin') && <NavBar />}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/offer-zone" element={<Shop />} />
                        <Route path="/category/:slug" element={<Shop />} />
                        <Route path="/category/:slug/:sub" element={<Shop />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/about-us" element={<About />} />
                        <Route path="/contact-us" element={<Contact />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/shipping-return" element={<ShippingReturn />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/*" element={<AdminLayout />} />
                    </Routes>
                    {!window.location.pathname.startsWith('/admin') && <Footer />}
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
