import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { adminLogin } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Secure hardcoded admin check for demo (Email: admin@kiza.in, Pass: admin123)
        if (credentials.email === 'admin@kiza.in' && credentials.password === 'admin123') {
            adminLogin({ email: credentials.email, role: 'admin' });
            navigate('/admin/dashboard');
        } else {
            setError('Invalid Admin Credentials');
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <div className="login-header">
                    <h2>KIZA ADMIN</h2>
                    <p>Sign in to manage your store</p>
                </div>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    {error && <div className="error-alert">{error}</div>}

                    <div className="form-group">
                        <label>Admin Email</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="admin@kiza.in"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Secure Login</button>

                    <p className="login-footer">
                        Secure administrative area. All actions are logged.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
