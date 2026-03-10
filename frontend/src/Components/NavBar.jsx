import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Logo/original.png';
import './NavBar.css';

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { cart, wishlist } = useAuth();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const wishlistCount = wishlist?.length || 0;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            // Focus input after a short delay for animation
            setTimeout(() => document.getElementById('search-input')?.focus(), 100);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        // Navigate or handle search
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
                    {/* Women dropdown */}
                    <div className="nav-item">
                        <NavLink
                            to="/category/women"
                            className="nav-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Women <i className="bi bi-chevron-down ms-1" style={{ fontSize: '0.7em' }}></i>
                        </NavLink>
                        <ul className="dropdown">
                            {[
                                "Anklets", "Hip Chain", "Adjustable Bangle", "Jumkhas",
                                "Diamond Replica", "Bangles", "Bracelet", "Chains",
                                "Earrings", "Neckpiece", "Hindu God Chains",
                                "Hindu Thali chains", "Rings", "Toe Ring", "Traditional"
                            ].map((item) => (
                                <li key={item}>
                                    <NavLink
                                        to={`/category/women/${item.toLowerCase().replace(/ /g, '-')}`}
                                        className="dropdown-link"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Men dropdown */}
                    <div className="nav-item">
                        <NavLink
                            to="/category/men"
                            className="nav-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Men <i className="bi bi-chevron-down ms-1" style={{ fontSize: '0.7em' }}></i>
                        </NavLink>
                        <ul className="dropdown">
                            <li>
                                <NavLink
                                    to="/category/men/clothing"
                                    className="dropdown-link"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Bracelets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/category/men/accessories"
                                    className="dropdown-link"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Chains
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/category/men/accessories"
                                    className="dropdown-link"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Hindu God Chains
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/category/men/accessories"
                                    className="dropdown-link"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Cross Chains
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Remaining items */}
                    <div className="nav-item">
                        <NavLink
                            to="/category/kids"
                            className="nav-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Kids
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink
                            to="/offer-zone"
                            className="nav-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Offer Zone
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink
                            to="/about-us"
                            className="nav-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About Us
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink
                            to="/contact-us"
                            className="nav-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact Us
                        </NavLink>
                    </div>
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
