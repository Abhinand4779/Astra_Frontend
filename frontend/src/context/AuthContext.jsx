import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // In a real app, you would check localStorage or a cookie for a token here
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('kiza_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedAdmin = localStorage.getItem('kiza_admin');
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }

        const storedCart = localStorage.getItem('kiza_cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }

        const storedOrders = localStorage.getItem('kiza_orders');
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }

        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('kiza_user', JSON.stringify(userData));
    };

    const adminLogin = (adminData) => {
        setAdmin(adminData);
        localStorage.setItem('kiza_admin', JSON.stringify(adminData));
    };

    const logout = () => {
        setUser(null);
        setAdmin(null);
        setCart([]);
        setOrders([]);
        localStorage.removeItem('kiza_user');
        localStorage.removeItem('kiza_admin');
        localStorage.removeItem('kiza_cart');
        localStorage.removeItem('kiza_orders');
    };

    const addToCart = (product, quantity) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            let newCart;
            if (existing) {
                newCart = prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                newCart = [...prev, { ...product, quantity }];
            }
            localStorage.setItem('kiza_cart', JSON.stringify(newCart));
            return newCart;
        });
    };

    const placeOrder = (orderData) => {
        const newOrder = {
            id: `ORD-${Date.now()}`,
            date: new Date().toLocaleDateString(),
            items: [...cart],
            total: cart.reduce((acc, item) => acc + (parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity), 0),
            shipTo: orderData,
            status: 'Processing'
        };
        const updatedOrders = [newOrder, ...orders];
        setOrders(updatedOrders);
        localStorage.setItem('kiza_orders', JSON.stringify(updatedOrders));

        // Clear cart after order
        setCart([]);
        localStorage.removeItem('kiza_cart');
        return newOrder.id;
    };

    return (
        <AuthContext.Provider value={{ user, admin, login, adminLogin, logout, cart, addToCart, orders, placeOrder, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
