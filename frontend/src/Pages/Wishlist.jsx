import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Wishlist.css';

const Wishlist = () => {
    const { wishlist, removeFromWishlist, addToCart } = useAuth();
    const navigate = useNavigate();

    const handleMoveToCart = (product) => {
        addToCart(product, 1);
        removeFromWishlist(product.id);
        navigate('/cart');
    };

    if (wishlist.length === 0) {
        return (
            <div className="wishlist-page-empty">
                <div className="empty-wishlist-message">
                    <i className="bi bi-heart"></i>
                    <h2>Your Wishlist is Empty</h2>
                    <p>Save items you love so you can revisit them anytime.</p>
                    <button onClick={() => navigate('/shop')} className="start-shopping-btn">Explore Collection</button>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <div>
                        <h1 className="wishlist-title">My Wishlist</h1>
                        <p className="wishlist-subtitle">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
                    </div>
                    <Link to="/cart" className="go-to-cart-btn">
                        <i className="bi bi-handbag me-2"></i> Go to Bag
                    </Link>
                </div>

                <div className="wishlist-grid">
                    {wishlist.map(item => (
                        <div key={item.id} className="wishlist-card">
                            <div className="wishlist-card-img" onClick={() => navigate(`/product/${item.id}`)}>
                                <img src={item.images?.[0] || item.image} alt={item.name} />
                                <button
                                    className="wishlist-remove-btn"
                                    onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}
                                    title="Remove from wishlist"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div className="wishlist-card-info">
                                <p className="wishlist-category">{item.category}</p>
                                <h3 className="wishlist-name" onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                                <div className="wishlist-price-row">
                                    <span className="wishlist-price">{item.price}</span>
                                    {item.oldPrice && <span className="wishlist-old-price">{item.oldPrice}</span>}
                                    {item.discount && <span className="wishlist-discount">{item.discount} OFF</span>}
                                </div>
                                <div className="wishlist-actions">
                                    <button className="move-to-cart-btn" onClick={() => handleMoveToCart(item)}>
                                        <i className="bi bi-handbag me-2"></i> Move to Bag
                                    </button>
                                    <button className="wishlist-del-btn" onClick={() => removeFromWishlist(item.id)}>
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
