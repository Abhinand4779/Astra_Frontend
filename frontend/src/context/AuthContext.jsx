import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // In a real app, you would check localStorage or a cookie for a token here
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [adminOrders, setAdminOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

    const updateOrderStatus = async (orderId, statusData) => {
        const token = localStorage.getItem('adminToken');
        const { status, trackingId, trackingUrl } = statusData;

        try {
            const url = new URL(`${API_BASE_URL}/orders/${orderId}/status`);
            url.searchParams.append("order_status", status);
            if (trackingId) url.searchParams.append("tracking_id", trackingId);
            if (trackingUrl) url.searchParams.append("tracking_url", trackingUrl);

            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                await syncAdminData(); // Refresh admin list
                return true;
            }
        } catch (err) {
            console.error("Update Status Failed", err);
        }
        return false;
    };

    // Synchronize User Specific Orders
    const syncUserOrders = async () => {
        const token = localStorage.getItem('astra_token');
        if (!token) return;

        try {
            const res = await fetch(`${API_BASE_URL}/orders/my-orders`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUserOrders(data);
                localStorage.setItem('astra_orders', JSON.stringify(data));
            }
        } catch (err) {
            console.error("Sync User Orders Failed", err);
        }
    };

    // Synchronize Admin Data
    const syncAdminData = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        try {
            // Fetch Orders
            const ordRes = await fetch(`${API_BASE_URL}/orders/all`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (ordRes.ok) {
                const ordData = await ordRes.json();
                setAdminOrders(ordData);
            }

            // Fetch Customers
            const custRes = await fetch(`${API_BASE_URL}/auth/all`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (custRes.ok) {
                const custData = await custRes.json();
                setCustomers(custData);
            }
        } catch (err) {
            console.error("Sync Admin Data Failed", err);
        }
    };


    useEffect(() => {
        const storedUser = localStorage.getItem('astra_user');
        const storedAdmin = localStorage.getItem('astra_admin');
        const storedCart = localStorage.getItem('astra_cart');
        const storedWishlist = localStorage.getItem('astra_wishlist');
        const storedOrders = localStorage.getItem('astra_orders');

        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
            // Token is in localStorage — sync after render
            setTimeout(syncAdminData, 100);
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setTimeout(syncUserOrders, 100);
        }

        if (storedCart) setCart(JSON.parse(storedCart));
        if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
        if (storedOrders) setUserOrders(JSON.parse(storedOrders));

        setLoading(false);
    }, []);

    const login = (userData, token) => {
        const fullUser = { ...userData, token };
        setUser(fullUser);
        localStorage.setItem('astra_user', JSON.stringify(fullUser));
        if (token) {
            localStorage.setItem('astra_token', token);
            syncUserOrders(); // Fetch fresh orders right after login
        }
    };

    const adminLogin = (adminData, token) => {
        const fullAdmin = { ...adminData, token };
        setAdmin(fullAdmin);
        localStorage.setItem('astra_admin', JSON.stringify(fullAdmin));
        if (token) {
            localStorage.setItem('adminToken', token);
            syncAdminData(); // Fetch fresh orders + customers right after login
        }
    };

    const logout = () => {
        setUser(null);
        setAdmin(null);
        setCart([]);
        setWishlist([]);
        setUserOrders([]);
        setAdminOrders([]);
        setCustomers([]);
        localStorage.removeItem('astra_user');
        localStorage.removeItem('astra_admin');
        localStorage.removeItem('astra_cart');
        localStorage.removeItem('astra_wishlist');
        localStorage.removeItem('astra_orders');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('astra_token');
    };

    const addToCart = (product, quantity) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            let newCart;
            if (existing) {
                newCart = prev.map(item =>
                    item.id === product.id ? { ...item, quantity: Math.max(1, item.quantity + quantity) } : item
                );
            } else {
                newCart = [...prev, { ...product, quantity }];
            }
            localStorage.setItem('astra_cart', JSON.stringify(newCart));
            return newCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => {
            const updated = prev.filter(item => item.id !== productId);
            localStorage.setItem('astra_cart', JSON.stringify(updated));
            return updated;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('astra_cart');
    };

    // --- Wishlist ---
    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const exists = prev.find(item => item.id === product.id);
            const updated = exists
                ? prev.filter(item => item.id !== product.id)
                : [...prev, product];
            localStorage.setItem('astra_wishlist', JSON.stringify(updated));
            return updated;
        });
    };

    const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

    const removeFromWishlist = (productId) => {
        setWishlist(prev => {
            const updated = prev.filter(item => item.id !== productId);
            localStorage.setItem('astra_wishlist', JSON.stringify(updated));
            return updated;
        });
    };

    const placeOrder = async (shippingInfo, totalAmount = null) => {
        const subtotalNumeric = cart.reduce((acc, item) => acc + (parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity), 0);
        const finalTotal = totalAmount || subtotalNumeric;

        const orderData = {
            items: cart.map(item => ({
                product_id: item.id.toString(),
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: (item.images && item.images[0]) || item.image || null
            })),
            total_amount: `₹${finalTotal.toLocaleString()}`,
            shipping_address: {
                ...shippingInfo,
                email: user?.email || shippingInfo.email // ensure email is present for notification
            }
        };

        // Always attempt to save to backend first (Backend now supports Guest Checkout)
        try {
            const rawToken = localStorage.getItem('astra_token') || localStorage.getItem('adminToken');
            const token = (rawToken && rawToken !== 'null' && rawToken !== 'undefined') ? rawToken : null;

            const res = await fetch(`${API_BASE_URL}/orders/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                const createdOrder = await res.json();

                // Update state if not redirected
                if (!createdOrder.checkout_url) {
                    setUserOrders(prev => [createdOrder, ...prev]);
                }

                setCart([]);
                localStorage.removeItem('astra_cart');
                return createdOrder;
            } else {
                const errRes = await res.json().catch(() => ({}));
                console.error("Backend Place Order Error:", errRes);
            }
        } catch (err) {
            console.error("Place Order Failed (Fetch sync exception)", err);
        }

        // Final Fallback: Local Only (in case backend is down)
        const newOrder = {
            id: `ORD-${Date.now()}`,
            _id: `ORD-${Date.now()}`, // Consistent with backend IDs
            ...orderData,
            status: 'Processing',
            order_status: 'Processing',
            date: new Date().toLocaleDateString()
        };
        const updatedOrders = [newOrder, ...userOrders];
        setUserOrders(updatedOrders);
        localStorage.setItem('astra_orders', JSON.stringify(updatedOrders));
        setCart([]);
        localStorage.removeItem('astra_cart');
        return newOrder;
    };

    return (
        <AuthContext.Provider value={{ user, admin, customers, syncAdminData, syncUserOrders, updateOrderStatus, login, adminLogin, logout, cart, addToCart, removeFromCart, clearCart, wishlist, toggleWishlist, isInWishlist, removeFromWishlist, userOrders, adminOrders, placeOrder, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
