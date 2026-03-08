import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { allProducts } from '../data/products';
import './Shop.css';

const Shop = () => {
    const { slug, sub } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const isOfferZone = location.pathname === '/offer-zone';
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [selectedSize, setSelectedSize] = useState(null);

    // Section-specific categories
    const sectionCategories = {
        women: [
            { name: 'Anklets', count: 42 },
            { name: 'Bangles', count: 85 },
            { name: 'Bracelets', count: 64 },
            { name: 'Chains', count: 120 },
            { name: 'Earrings', count: 210 },
            { name: 'Hip Chain', count: 15 },
            { name: 'Neckpiece', count: 124 },
            { name: 'Rings', count: 56 },
            { name: 'Traditional', count: 42 }
        ],
        men: [
            { name: 'Bracelets', count: 18 },
            { name: 'Chains', count: 35 },
            { name: 'Hindu God Chains', count: 12 },
            { name: 'Cross Chains', count: 8 }
        ],
        kids: [
            { name: 'Earrings', count: 24 },
            { name: 'Neckpiece', count: 15 },
            { name: 'Bracelets', count: 12 },
            { name: 'Chains', count: 10 }
        ]
    };

    // Determine current section categories
    const currentSection = slug?.toLowerCase() || 'women';
    const activeCategories = sectionCategories[currentSection] || sectionCategories.women;

    const materials = ['22K Gold', '18K Gold', 'Rose Gold', 'Silver'];

    const products = isOfferZone
        ? allProducts.filter(p => p.discount)
        : (selectedCategory === 'All'
            ? allProducts
            : allProducts.filter(p =>
                p.category === selectedCategory ||
                (slug && p.section?.toLowerCase() === slug.toLowerCase()) ||
                (slug && p.category.toLowerCase() === slug.toLowerCase())
            ));



    // Effect to handle URL categorization
    useEffect(() => {
        if (isOfferZone) {
            setSelectedCategory('Offer Zone');
        } else if (sub) {
            const formattedSub = sub.split('-').map(word => {
                if (word === 'thali') return 'Thali';
                if (word === 'chains') return 'chains';
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');

            // Special cases for matching NavBar names
            let finalCat = formattedSub;
            if (formattedSub === 'Neckpiece') finalCat = 'Neckpiece';
            if (formattedSub === 'Anklets') finalCat = 'Anklets';

            setSelectedCategory(finalCat);
        } else if (slug) {
            setSelectedCategory(slug.charAt(0).toUpperCase() + slug.slice(1));
        } else {
            setSelectedCategory('All');
        }
    }, [slug, sub, location]);

    const handleCategoryClick = (catName) => {
        if (catName === 'All') {
            navigate(isOfferZone ? '/offer-zone' : `/category/${currentSection}`);
        } else {
            navigate(`/category/${currentSection}/${catName.toLowerCase().replace(/ /g, '-')}`);
        }
    };

    return (
        <div className="shop-page">
            {/* Category Banner */}
            <header className="shop-header">
                <div className="header-overlay">
                    <h1>{selectedCategory === 'All' ? currentSection.charAt(0).toUpperCase() + currentSection.slice(1) : selectedCategory}</h1>
                    <nav className="breadcrumb">
                        <span>Home</span> / <span>Shop</span> / <span>{selectedCategory}</span>
                    </nav>
                </div>
            </header>

            <div className="shop-container">
                {/* Fixed Premium Sidebar */}
                <aside className="shop-sidebar">
                    {currentSection !== 'kids' && (
                        <div className="filter-group">
                            <h3 className="filter-title">Product Categories</h3>
                            <ul className="filter-list">
                                <li
                                    className={selectedCategory === 'All' ? 'active' : ''}
                                    onClick={() => handleCategoryClick('All')}
                                >
                                    All {currentSection === 'women' ? 'Women' : currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Items
                                </li>
                                {activeCategories.map(cat => (
                                    <li
                                        key={cat.name}
                                        className={selectedCategory === cat.name ? 'active' : ''}
                                        onClick={() => handleCategoryClick(cat.name)}
                                    >
                                        {cat.name} <span>({cat.count})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="filter-group">
                        <h3 className="filter-title">Filter By Material</h3>
                        <div className="material-tags">
                            {materials.map(mat => (
                                <label key={mat} className="material-checkbox">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    {mat}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3 className="filter-title">Select Size</h3>
                        <div className="size-selector">
                            {['12', '13', '14', '15'].map(size => (
                                <button
                                    key={size}
                                    className={`size-option ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3 className="filter-title">Price Range</h3>
                        <div className="price-filter">
                            <input type="range" min="0" max="500000" className="gold-slider" />
                            <div className="price-labels">
                                <span>₹0</span>
                                <span>₹5,00,000+</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="shop-content">
                    <div className="content-toolbar">
                        <p className="results-count">Showing 1–{products.length} of 535 results</p>
                        <div className="toolbar-right">
                            <div className="view-switcher">
                                <button
                                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                    title="Grid View"
                                >
                                    <i className="bi bi-grid-3x3-gap"></i>
                                </button>
                                <button
                                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                    title="List View"
                                >
                                    <i className="bi bi-view-list"></i>
                                </button>
                            </div>
                            <select className="premium-select">
                                <option>Default Sorting</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Latest Arrivals</option>
                            </select>
                        </div>
                    </div>

                    <div className={`product-display ${viewMode}-view`}>
                        {products.map(product => (
                            <div key={product.id} className="premium-product-card" onClick={() => navigate(`/product/${product.id}`)}>
                                <div className="p-card-image">
                                    {product.discount && <span className="discount-badge">-{product.discount}</span>}
                                    <img src={product.images[0]} alt={product.name} />
                                    <button className="quick-view">Quick View</button>
                                </div>
                                <div className="p-card-info">
                                    <span className="p-category">{product.category}</span>
                                    <h4 className="p-name">{product.name}</h4>
                                    <div className="price-wrapper">
                                        <p className="p-price">{product.price}</p>
                                        {product.oldPrice && <p className="old-price">{product.oldPrice}</p>}
                                    </div>

                                    {viewMode === 'list' && (
                                        <p className="p-description">Beautifully crafted {product.category} piece for your jewelry collection.</p>
                                    )}

                                    <button className="buy-now-btn">Buy Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Shop;
