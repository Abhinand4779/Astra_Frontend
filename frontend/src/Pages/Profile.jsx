import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [isGuestMode, setIsGuestMode] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        guestEmail: ''
    });

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setIsGuestMode(false);
        setError('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGuestLogin = (e) => {
        if (e) e.preventDefault();
        setError('');

        if (!isGuestMode) {
            setIsGuestMode(true);
            return;
        }

        if (!formData.guestEmail) {
            alert("Please enter an email to continue");
            return;
        }

        // Log in as a Guest with provided email
        login({ name: 'Guest User', email: formData.guestEmail, role: 'guest' });

        const destination = location.state?.from || '/';
        const action = location.state?.action;

        if (action === 'buy') {
            navigate('/checkout');
        } else {
            navigate(destination);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!isLogin) {
                // LIVE REGISTRATION
                if (formData.password !== formData.confirmPassword) {
                    setError("Passwords do not match!");
                    setLoading(false);
                    return;
                }

                const regRes = await fetch(`${API_BASE_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    })
                });

                if (regRes.ok) {
                    alert("Registration successful! Please login with your new account.");
                    setIsLogin(true);
                } else {
                    const errData = await regRes.json();
                    setError(errData.detail || "Registration failed");
                }
            } else {
                // LIVE LOGIN
                const loginData = new URLSearchParams();
                loginData.append('username', formData.email.trim());
                loginData.append('password', formData.password.trim());

                const logRes = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: loginData
                });

                if (logRes.ok) {
                    const data = await logRes.json();

                    // After login, we could fetch details from /me or just trust the input email
                    login({ name: formData.name || 'User', email: formData.email }, data.access_token);

                    const destination = location.state?.from || '/';
                    if (location.state?.action === 'buy') navigate('/checkout');
                    else navigate(destination);
                } else {
                    const errData = await logRes.json();
                    setError(errData.detail || "Invalid Email or Password");
                }
            }
        } catch (err) {
            console.error("Auth Error:", err);
            setError("Could not connect to authentication server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">
                        {isGuestMode ? 'Guest Checkout' : (isLogin ? 'Login' : 'Create Account')}
                    </h1>
                    <p className="auth-subtitle">
                        {isGuestMode
                            ? 'Provide your email to receive order updates'
                            : (isLogin ? 'Enter your credentials to access your account' : 'Join the Astra community and start your style journey')}
                    </p>
                    {error && <div className="error-alert mb-3" style={{ color: '#dc2626', background: '#fef2f2', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid #fee2e2' }}>{error}</div>}
                </div>

                {isGuestMode ? (
                    <form className="auth-form" onSubmit={handleGuestLogin}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="guestEmail"
                                placeholder="guest@example.com"
                                value={formData.guestEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? 'Processing...' : 'Continue to Shop'}
                        </button>
                        <button type="button" className="toggle-btn" style={{ marginTop: '1rem', textDecoration: 'none' }} onClick={() => setIsGuestMode(false)}>
                            ← Back to Login
                        </button>
                    </form>
                ) : (
                    <>
                        <form className="auth-form" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required={!isLogin}
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {!isLogin && (
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required={!isLogin}
                                    />
                                </div>
                            )}

                            {isLogin && (
                                <div className="auth-options">
                                    <label className="remember-me">
                                        <input type="checkbox" /> Remember me
                                    </label>
                                </div>
                            )}

                            <button type="submit" className="auth-btn" disabled={loading}>
                                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                            </button>

                            {isLogin && (
                                <>
                                    <div className="auth-divider">OR</div>
                                    <button type="button" className="guest-btn" onClick={handleGuestLogin}>
                                        <i className="bi bi-person-badge"></i> Continue as Guest
                                    </button>
                                </>
                            )}
                        </form>

                        <div className="auth-footer">
                            <p>
                                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                                <button onClick={toggleAuthMode} className="toggle-btn">
                                    {isLogin ? 'Register Now' : 'Login Here'}
                                </button>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
