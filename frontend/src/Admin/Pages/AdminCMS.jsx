import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import './AdminCMS.css';

const AdminCMS = () => {
    const { config, updateSection } = useSite();
    const [activeTab, setActiveTab] = useState('hero');

    if (!config) return <div className="p-4">Loading configuration...</div>;

    const [heroData, setHeroData] = useState(config.hero);
    const [couponData, setCouponData] = useState(config.coupon);
    const [footerData, setFooterData] = useState(config.footer);
    const [highlightsData, setHighlightsData] = useState(config.highlights);
    const [categoriesData, setCategoriesData] = useState(config.homeCategories);
    // Initialize navCats by converting dropdown arrays to strings for easy editing
    const [navCats, setNavCats] = useState(config.navCategories.map(cat => ({
        ...cat,
        dropdown: cat.dropdown ? cat.dropdown.join(', ') : ''
    })));

    const handleHeroSave = (e) => {
        e.preventDefault();
        updateSection('hero', heroData);
        alert('Hero Section Updated!');
    };

    const handleCouponSave = (e) => {
        e.preventDefault();
        updateSection('coupon', couponData);
        alert('Coupon Section Updated!');
    };

    const handleFooterSave = (e) => {
        e.preventDefault();
        updateSection('footer', footerData);
        alert('Footer Updated!');
    };

    const handleHighlightsSave = (e) => {
        e.preventDefault();
        updateSection('highlights', highlightsData);
        alert('Highlights Updated!');
    };

    const handleCategoriesSave = (e) => {
        e.preventDefault();
        updateSection('homeCategories', categoriesData);
        alert('Home Categories Updated!');
    };

    const handleNavSave = (e) => {
        e.preventDefault();
        // Convert comma-separated strings back to arrays before saving
        const finalNav = navCats.map(cat => ({
            ...cat,
            dropdown: typeof cat.dropdown === 'string'
                ? cat.dropdown.split(',').map(s => s.trim()).filter(s => s !== '')
                : cat.dropdown
        }));
        updateSection('navCategories', finalNav);
        alert('Navigation Updated!');
    };

    const addNavItem = () => {
        setNavCats([...navCats, { name: 'New Link', path: '/shop', dropdown: '' }]);
    };

    const deleteNavItem = (idx) => {
        if (window.confirm('Delete this Navigation link?')) {
            setNavCats(navCats.filter((_, i) => i !== idx));
        }
    };

    const updateHighlightItem = (id, field, value) => {
        const newHighlights = highlightsData.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setHighlightsData(newHighlights);
    };

    const updateCategoryItem = (id, field, value) => {
        const newCategories = categoriesData.map(cat =>
            cat.id === id ? { ...cat, [field]: value } : cat
        );
        setCategoriesData(newCategories);
    };

    const updateNavItem = (idx, field, value) => {
        const next = [...navCats];
        next[idx] = { ...next[idx], [field]: value };
        setNavCats(next);
    };

    const handleFileChange = (e, callback) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="admin-cms">
            <div className="page-header">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div>
                        <h2 className="page-title">Website Content Manager (CMS)</h2>
                        <p className="page-subtitle">Fully manage your store's banners, navigation, and promotional content.</p>
                    </div>
                </div>
            </div>

            <div className="cms-tabs">
                <button className={`tab-btn ${activeTab === 'hero' ? 'active' : ''}`} onClick={() => setActiveTab('hero')}>Banners & Offers</button>
                <button className={`tab-btn ${activeTab === 'nav' ? 'active' : ''}`} onClick={() => setActiveTab('nav')}>Navigation Bar</button>
                <button className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>Home Sections</button>
                <button className={`tab-btn ${activeTab === 'footer' ? 'active' : ''}`} onClick={() => setActiveTab('footer')}>Branding & Footer</button>
            </div>

            <div className="cms-content-area">
                {activeTab === 'hero' && (
                    <div className="cms-tab-panel">
                        <section className="cms-section">
                            <h3>Hero Banner Settings</h3>
                            <form className="admin-form" onSubmit={handleHeroSave}>
                                <div className="form-group">
                                    <label>Banner Image</label>
                                    <div className="image-upload-wrapper">
                                        <div className="current-preview mb-3">
                                            <img src={typeof heroData.bannerImg === 'string' ? heroData.bannerImg : ''} alt="Preview" style={{ maxWidth: '300px', borderRadius: '8px' }} />
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, (base64) => setHeroData({ ...heroData, bannerImg: base64 }))}
                                            className="upload-input"
                                        />
                                        <small className="text-muted d-block mt-1">Upload a high-resolution image for the main banner.</small>
                                    </div>
                                </div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Banner Title</label>
                                        <input type="text" value={heroData.title} onChange={(e) => setHeroData({ ...heroData, title: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Button Label</label>
                                        <input type="text" value={heroData.btnText} onChange={(e) => setHeroData({ ...heroData, btnText: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Banner Subtitle</label>
                                    <textarea value={heroData.subtitle} onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}></textarea>
                                </div>
                                <button type="submit" className="save-btn">Save Banner</button>
                            </form>
                        </section>

                        <section className="cms-section mt-4">
                            <h3>Coupon Manager</h3>
                            <form className="admin-form" onSubmit={handleCouponSave}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Discount Label</label>
                                        <input type="text" value={couponData.discount} onChange={(e) => setCouponData({ ...couponData, discount: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Coupon Code</label>
                                        <input type="text" value={couponData.code} onChange={(e) => setCouponData({ ...couponData, code: e.target.value })} />
                                    </div>
                                </div>
                                <button type="submit" className="save-btn">Save Coupon</button>
                            </form>
                        </section>
                    </div>
                )}

                {activeTab === 'nav' && (
                    <div className="cms-tab-panel">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3>NavBar Configuration</h3>
                            <button className="btn btn-outline-dark btn-sm" onClick={addNavItem}>
                                <i className="bi bi-plus-circle me-1"></i> Add Link
                            </button>
                        </div>
                        <div className="nav-cms-list">
                            {navCats.map((cat, idx) => (
                                <div key={idx} className="cms-item-card">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <span className="badge bg-light text-dark">Menu Item #{idx + 1}</span>
                                        <button className="btn btn-sm text-danger p-0" onClick={() => deleteNavItem(idx)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Link Text</label>
                                            <input type="text" value={cat.name} onChange={(e) => updateNavItem(idx, 'name', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Path (e.g. /shop)</label>
                                            <input type="text" value={cat.path} onChange={(e) => updateNavItem(idx, 'path', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label>Dropdown Items (Comma separated)</label>
                                        <textarea
                                            placeholder="e.g. Necklace, Rings, Bangles"
                                            value={cat.dropdown}
                                            onChange={(e) => updateNavItem(idx, 'dropdown', e.target.value)}
                                        ></textarea>
                                        <small className="text-muted">Leave empty if this link has no dropdown menu.</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="save-btn mt-3" onClick={handleNavSave}>Update Navigation</button>
                    </div>
                )}

                {activeTab === 'home' && (
                    <div className="cms-tab-panel">
                        <section className="cms-section mb-4">
                            <h3>Home Highlights (3 Items)</h3>
                            <div className="highlights-editor">
                                {highlightsData.map((item) => (
                                    <div key={item.id} className="cms-item-card">
                                        <div className="form-group">
                                            <label>Upload Image</label>
                                            <div className="mb-2">
                                                <img src={typeof item.image === 'string' ? item.image : ''} alt="Preview" style={{ height: '80px', borderRadius: '4px' }} />
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, (base64) => updateHighlightItem(item.id, 'image', base64))}
                                                className="upload-input-small mb-2"
                                            />
                                        </div>
                                        <div className="form-grid">
                                            <input className="mb-2" type="text" value={item.title} onChange={(e) => updateHighlightItem(item.id, 'title', e.target.value)} placeholder="Title" />
                                            <input type="text" value={item.subtitle} onChange={(e) => updateHighlightItem(item.id, 'subtitle', e.target.value)} placeholder="Subtitle" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="save-btn mt-3" onClick={handleHighlightsSave}>Save Highlights</button>
                        </section>

                        <section className="cms-section">
                            <h3>Homepage Categories (Square Cards)</h3>
                            <div className="categories-editor">
                                {categoriesData.map((cat) => (
                                    <div key={cat.id} className="cms-item-card">
                                        <div className="form-group">
                                            <label>Category Image</label>
                                            <div className="mb-2">
                                                <img src={typeof cat.image === 'string' ? cat.image : ''} alt="Preview" style={{ height: '80px', borderRadius: '4px' }} />
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, (base64) => updateCategoryItem(cat.id, 'image', base64))}
                                                className="upload-input-small mb-2"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Category Name</label>
                                            <input type="text" value={cat.name} onChange={(e) => updateCategoryItem(cat.id, 'name', e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="save-btn mt-3" onClick={handleCategoriesSave}>Save Categories</button>
                        </section>
                    </div>
                )}

                {activeTab === 'footer' && (
                    <div className="cms-tab-panel">
                        <h3>Store Identity & Footer</h3>
                        <form className="admin-form" onSubmit={handleFooterSave}>
                            <div className="form-group">
                                <label>Store Name</label>
                                <input type="text" value={footerData.storeName} onChange={(e) => setFooterData({ ...footerData, storeName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Branding Description</label>
                                <textarea value={footerData.description} onChange={(e) => setFooterData({ ...footerData, description: e.target.value })} rows="4"></textarea>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Instagram Link</label>
                                    <input type="text" value={footerData.instagram} onChange={(e) => setFooterData({ ...footerData, instagram: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Copyright Notice</label>
                                    <input type="text" value={footerData.copyright} onChange={(e) => setFooterData({ ...footerData, copyright: e.target.value })} />
                                </div>
                            </div>
                            <button type="submit" className="save-btn">Save Identity</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCMS;
