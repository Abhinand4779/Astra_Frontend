import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import './AdminCMS.css';

const AdminSliders = () => {
    const { config, updateSection } = useSite();

    // ── Hero Sliders ──
    const [heroSliders, setHeroSliders] = useState(config?.heroSliders || [
        { id: 1, image: '', title: '', subtitle: '' }
    ]);

    // ── Promo Carousel ──
    const [promoSlides, setPromoSlides] = useState(config?.promoCarousel || [
        { id: 1, image: '', badge: '', title: '', subtitle: '', link: '', btnText: '', align: 'left' }
    ]);

    // ── Testimonials ──
    const [testimonials, setTestimonials] = useState(config?.testimonials || [
        { id: 1, name: '', handle: '', text: '', rating: 5 }
    ]);

    const [activeTab, setActiveTab] = useState('hero'); // 'hero' | 'promo' | 'testimonials'

    // ── Hero handlers ──
    const handleHeroFile = (e, id) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeroSliders(prev => prev.map(s => s.id === id ? { ...s, image: reader.result } : s));
            };
            reader.readAsDataURL(file);
        }
    };
    const updateHero = (id, field, value) => setHeroSliders(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    const addHero = () => setHeroSliders(prev => [...prev, { id: Date.now(), image: '', title: '', subtitle: '' }]);
    const deleteHero = (id) => { if (window.confirm('Remove this slider?')) setHeroSliders(prev => prev.filter(s => s.id !== id)); };
    const saveHero = () => { updateSection('heroSliders', heroSliders); alert('Hero Sliders saved!'); };

    // ── Promo handlers ──
    const handlePromoFile = (e, id) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPromoSlides(prev => prev.map(s => s.id === id ? { ...s, image: reader.result } : s));
            };
            reader.readAsDataURL(file);
        }
    };
    const updatePromo = (id, field, value) => setPromoSlides(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    const addPromo = () => setPromoSlides(prev => [...prev, { id: Date.now(), image: '', badge: '', title: '', subtitle: '', link: '', btnText: '', align: 'left' }]);
    const deletePromo = (id) => { if (window.confirm('Remove this slide?')) setPromoSlides(prev => prev.filter(s => s.id !== id)); };
    const savePromo = () => { updateSection('promoCarousel', promoSlides); alert('Promo Carousel saved!'); };

    // ── Testimonial handlers ──
    const updateTestimonial = (id, field, value) => setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    const addTestimonial = () => setTestimonials(prev => [...prev, { id: Date.now(), name: '', handle: '', text: '', rating: 5 }]);
    const deleteTestimonial = (id) => { if (window.confirm('Remove this testimonial?')) setTestimonials(prev => prev.filter(t => t.id !== id)); };
    const saveTestimonials = () => { updateSection('testimonials', testimonials); alert('Testimonials saved!'); };

    const handleSave = () => {
        if (activeTab === 'hero') saveHero();
        else if (activeTab === 'promo') savePromo();
        else saveTestimonials();
    };

    return (
        <div className="admin-cms px-4">
            <div className="page-header d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="page-title">Home Content Manager</h2>
                    <p className="page-subtitle">Manage Sliders, Carousels, and Testimonials.</p>
                </div>
                <button className="save-btn" onClick={handleSave}>
                    Save Changes
                </button>
            </div>

            {/* Tabs */}
            <div className="d-flex gap-3 mt-4 mb-4" style={{ borderBottom: '2px solid #eee', paddingBottom: '0' }}>
                {[
                    { id: 'hero', label: '🖼️ Hero Sliders' },
                    { id: 'promo', label: '✨ Promo Carousel' },
                    { id: 'testimonials', label: '💬 Testimonials' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '0.95rem', fontWeight: '600', padding: '0.75rem 1.25rem',
                            color: activeTab === tab.id ? '#b59b5a' : '#888',
                            borderBottom: activeTab === tab.id ? '2px solid #b59b5a' : '2px solid transparent',
                            marginBottom: '-2px', transition: 'all 0.2s'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ── HERO TAB ── */}
            {activeTab === 'hero' && (
                <div>
                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-dark" onClick={addHero}>+ Add Slider</button>
                    </div>
                    {heroSliders.map((slider, idx) => (
                        <div key={slider.id} className="cms-section">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="m-0">Slider #{idx + 1}</h4>
                                <button className="btn btn-sm text-danger" onClick={() => deleteHero(slider.id)}><i className="bi bi-trash"></i></button>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-5">
                                    <div className="image-upload-wrapper">
                                        {slider.image ? <img src={slider.image} alt="S" style={{ width: '100%', borderRadius: '8px' }} /> : <div className="py-4">No Image</div>}
                                        <input type="file" accept="image/*" onChange={(e) => handleHeroFile(e, slider.id)} className="mt-2" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="admin-form">
                                        <div className="form-group mb-3">
                                            <label>Title</label>
                                            <input type="text" value={slider.title} onChange={(e) => updateHero(slider.id, 'title', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Subtitle</label>
                                            <textarea value={slider.subtitle} onChange={(e) => updateHero(slider.id, 'subtitle', e.target.value)} rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── PROMO TAB ── */}
            {activeTab === 'promo' && (
                <div>
                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-dark" onClick={addPromo}>+ Add Promo</button>
                    </div>
                    {promoSlides.map((slide, idx) => (
                        <div key={slide.id} className="cms-section">
                            <div className="d-flex justify-content-between mb-4">
                                <h4 className="m-0">Promo #{idx + 1}</h4>
                                <button className="btn btn-sm text-danger" onClick={() => deletePromo(slide.id)}><i className="bi bi-trash"></i></button>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-5">
                                    <div className="image-upload-wrapper">
                                        {slide.image ? <img src={slide.image} alt="P" style={{ width: '100%', borderRadius: '8px' }} /> : <div className="py-4">No Image</div>}
                                        <input type="file" accept="image/*" onChange={(e) => handlePromoFile(e, slide.id)} className="mt-2" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="admin-form">
                                        <div className="row g-3">
                                            <div className="col-md-6"><label>Badge</label><input type="text" value={slide.badge} onChange={(e) => updatePromo(slide.id, 'badge', e.target.value)} /></div>
                                            <div className="col-md-6"><label>Align</label><select value={slide.align} onChange={(e) => updatePromo(slide.id, 'align', e.target.value)} className="form-select"><option value="left">Left</option><option value="right">Right</option></select></div>
                                        </div>
                                        <div className="form-group my-3"><label>Title</label><input type="text" value={slide.title} onChange={(e) => updatePromo(slide.id, 'title', e.target.value)} /></div>
                                        <div className="form-group mb-3"><label>Subtitle</label><textarea value={slide.subtitle} onChange={(e) => updatePromo(slide.id, 'subtitle', e.target.value)} rows="2"></textarea></div>
                                        <div className="row g-3">
                                            <div className="col-md-6"><label>Link</label><input type="text" value={slide.link} onChange={(e) => updatePromo(slide.id, 'link', e.target.value)} /></div>
                                            <div className="col-md-6"><label>Btn Text</label><input type="text" value={slide.btnText} onChange={(e) => updatePromo(slide.id, 'btnText', e.target.value)} /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── TESTIMONIALS TAB ── */}
            {activeTab === 'testimonials' && (
                <div>
                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-dark" onClick={addTestimonial}>+ Add Testimonial</button>
                    </div>
                    <div className="row g-4">
                        {testimonials.map((item, idx) => (
                            <div key={item.id} className="col-lg-6">
                                <div className="cms-section h-100">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h5 className="m-0">Review #{idx + 1}</h5>
                                        <button className="btn btn-sm text-danger" onClick={() => deleteTestimonial(item.id)}><i className="bi bi-trash"></i></button>
                                    </div>
                                    <div className="admin-form">
                                        <div className="row g-3">
                                            <div className="col-md-6"><label>Name</label><input type="text" value={item.name} onChange={(e) => updateTestimonial(item.id, 'name', e.target.value)} /></div>
                                            <div className="col-md-6"><label>Handle</label><input type="text" value={item.handle} onChange={(e) => updateTestimonial(item.id, 'handle', e.target.value)} /></div>
                                        </div>
                                        <div className="form-group my-3"><label>Text</label><textarea value={item.text} onChange={(e) => updateTestimonial(item.id, 'text', e.target.value)} rows="3"></textarea></div>
                                        <div className="form-group"><label>Rating (1-5)</label><input type="number" min="1" max="5" value={item.rating} onChange={(e) => updateTestimonial(item.id, 'rating', parseInt(e.target.value) || 5)} /></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSliders;
