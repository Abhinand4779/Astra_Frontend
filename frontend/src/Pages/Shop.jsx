import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import './Shop.css';

const Shop = () => {
    const { config, products: allSiteProducts } = useSite();
    const { slug, sub } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const isOfferZone = location.pathname === '/offer-zone';
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedSize, setSelectedSize] = useState(null);

    if (!config || !allSiteProducts) return null;
    const { sectionCategories } = config;

    const currentSection = slug?.toLowerCase() || 'women';
    const materials = ['22K Gold', '18K Gold', 'Rose Gold', 'Silver'];

    // Calculate dynamic counts and active categories with robust matching
    const sectionProducts = allSiteProducts.filter(p => p.section?.toLowerCase().trim() === currentSection);

    const activeCategories = (sectionCategories[currentSection] || []).map(cat => ({
        ...cat,
        count: sectionProducts.filter(p =>
            p.category?.toLowerCase().trim() === cat.name.toLowerCase().trim()
        ).length
    }));

    // Improved Filtering Logic: Handle section views vs sub-category views
    const filteredProducts = isOfferZone
        ? allSiteProducts.filter(p => p.discount)
        : (selectedCategory === 'All' || selectedCategory.toLowerCase() === currentSection
            ? sectionProducts
            : sectionProducts.filter(p =>
                p.category?.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
            )
        );

    useEffect(() => {
        if (isOfferZone) {
            setSelectedCategory('Offer Zone');
        } else if (sub) {
            // Find category by slugified matching
            const matched = (sectionCategories[currentSection] || []).find(
                c => c.name.toLowerCase().replace(/ /g, '-') === sub.toLowerCase()
            );
            if (matched) {
                setSelectedCategory(matched.name);
            } else {
                const formattedSub = sub.split('-').map(word => {
                    if (word === 'thali') return 'Thali';
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }).join(' ');
                setSelectedCategory(formattedSub);
            }
        } else {
            setSelectedCategory('All');
        }
    }, [slug, sub, location, isOfferZone, sectionCategories, currentSection]);

    const handleCategoryClick = (catName) => {
        const isMainSection = catName.toLowerCase() === currentSection || catName === 'All' || catName.startsWith('All ');
        if (isMainSection) {
            navigate(isOfferZone ? '/offer-zone' : `/category/${currentSection}`);
        } else {
            navigate(`/category/${currentSection}/${catName.toLowerCase().trim().replace(/ /g, '-')}`);
        }
    };

    const displayTitle = selectedCategory === 'All' || selectedCategory.toLowerCase() === currentSection
        ? currentSection.charAt(0).toUpperCase() + currentSection.slice(1)
        : selectedCategory;

    return (
        <div className="shop-page">
            <header className="shop-header">
                <div className="header-overlay">
                    <h1>{displayTitle}</h1>
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{displayTitle}</span>
                    </nav>
                </div>
            </header>

            <div className="shop-container">
                <aside className="shop-sidebar">
                    {currentSection !== 'kids' && (
                        <div className="filter-group">
                            <h3 className="filter-title">Product Categories</h3>
                            <ul className="filter-list">
                                <li
                                    className={(selectedCategory === 'All' || selectedCategory.toLowerCase() === currentSection) ? 'active' : ''}
                                    onClick={() => handleCategoryClick('All')}
                                >
                                    All {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Items
                                </li>
                                {activeCategories.map(cat => (
                                    <li
                                        key={cat.name}
                                        className={selectedCategory.toLowerCase().trim() === cat.name.toLowerCase().trim() ? 'active' : ''}
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
                            {['12', '14', '16', '18'].map(size => (
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
                </aside>

                <main className="shop-content">
                    <div className="content-toolbar">
                        <p className="results-count">Showing 1–{filteredProducts.length} results</p>
                        <div className="toolbar-right">
                            <div className="view-switcher">
                                <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><i className="bi bi-grid-3x3-gap"></i></button>
                                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><i className="bi bi-view-list"></i></button>
                            </div>
                        </div>
                    </div>

                    <div className={`product-display ${viewMode}-view`}>
                        {filteredProducts.map(product => (
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
                                        {product.oldPrice && <p className="p-old-price" style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9em', marginLeft: '10px' }}>{product.oldPrice}</p>}
                                    </div>
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
