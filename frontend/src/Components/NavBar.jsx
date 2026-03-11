import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import logo from '../assets/Logo/original.png';
import './NavBar.css';

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { cart, wishlist } = useAuth();
    const { config } = useSite();
    const navCategories = config?.navCategories || [];

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const wishlistCount = wishlist?.length || 0;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setTimeout(() => document.getElementById('search-input')?.focus(), 100);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    return (
        <nav className="navbar-container">
            <div className="navbar-wrapper">
                <div className="navbar-logo">
                    <Link to="/" className="navbar-logo-link">
                        <img src={logo} alt="Astra by Ash" />
                        <span className="logo-subtitle">ASTRA</span>
                    </Link>
                </div>

                <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    {navCategories.map((cat, idx) => (
                        <div key={idx} className="nav-item">
                            <NavLink
                                to={cat.path}
                                className="nav-link"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {cat.name} {cat.dropdown && cat.dropdown.length > 0 && (
                                    <i className="bi bi-chevron-down ms-1" style={{ fontSize: '0.7em' }}></i>
                                )}
                            </NavLink>

                            {cat.dropdown && cat.dropdown.length > 0 && (
                                (cat.name === 'Women' || cat.name === 'Men') ? (
                                    <div className="mega-menu">
                                        <div className="mega-menu-content">
                                            {cat.dropdown.map((item, i) => (
                                                <NavLink
                                                    key={i}
                                                    to={`${cat.path}/${item.toLowerCase().replace(/ /g, '-')}`}
                                                    className="mega-menu-link"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {item}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <ul className="dropdown">
                                        {cat.dropdown.map((item, i) => (
                                            <li key={i}>
                                                <NavLink
                                                    to={`${cat.path}/${item.toLowerCase().replace(/ /g, '-')}`}
                                                    className="dropdown-link"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {item}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                )
                            )}
                        </div>
                    ))}
                </div>

                <div className="navbar-icons">
                    <Link to="/profile" className="icon-link"><i className="bi bi-person"></i></Link>
                    <button className="icon-button" onClick={toggleSearch} aria-label="Search"><i className="bi bi-search"></i></button>
                    <Link to="/wishlist" className="icon-link" style={{ position: 'relative' }}>
                        <i className="bi bi-heart"></i>
                        {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
                    </Link>
                    <Link to="/cart" className="icon-link cart-icon">
                        <i className="bi bi-handbag"></i>
                        <span className="cart-badge">{cartCount}</span>
                    </Link>

                    <button className="mobile-toggle" onClick={toggleMobileMenu}>
                        <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
                    </button>
                </div>
            </div>

            {/* Search Overlay */}
            <div className={`search-overlay ${isSearchOpen ? 'active' : ''}`}>
                <div className="search-container">
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <input
                            id="search-input"
                            type="text"
                            placeholder="Search for products, brands and more..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="search-submit">
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                    <button className="search-close" onClick={toggleSearch}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
