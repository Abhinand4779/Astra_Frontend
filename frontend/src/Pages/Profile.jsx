import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

export const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isLogin) {
            // REGISTRATION LOGIC
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            alert("Registration successful! Please login with your new account.");
            setIsLogin(true); // Switch to login mode automatically
            return;
        }

        // LOGIN LOGIC
        // Simulating successful login
        login({ name: formData.name || 'User', email: formData.email });

        const destination = location.state?.from || '/';
        const action = location.state?.action;

        if (action === 'buy') {
            navigate('/checkout');
        } else {
            navigate(destination);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">{isLogin ? 'Login' : 'Create Account'}</h1>
                    <p className="auth-subtitle">
                        {isLogin
                            ? 'Enter your credentials to access your account'
                            : 'Join the Kiza community and start your style journey'}
                    </p>
                </div>

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

                    <button type="submit" className="auth-btn">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button onClick={toggleAuthMode} className="toggle-btn">
                            {isLogin ? 'Register Now' : 'Login Here'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
