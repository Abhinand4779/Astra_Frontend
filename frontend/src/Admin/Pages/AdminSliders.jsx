import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import './AdminCMS.css'; // Reuse CMS layouts for consistency

const AdminSliders = () => {
    const { config, updateSection } = useSite();
    // Use sliders from config if they exist, or use a default if not
    const [sliders, setSliders] = useState(config?.heroSliders || [
        { id: 1, image: '', title: 'Exquisite Bangles', subtitle: 'Timeless Elegance' },
        { id: 2, image: '', title: 'Bridal Collection', subtitle: 'For your special day' }
    ]);

    const handleFileChange = (e, id) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const next = sliders.map(s => s.id === id ? { ...s, image: reader.result } : s);
                setSliders(next);
            };
            reader.readAsDataURL(file);
        }
    };

    const updateSlider = (id, field, value) => {
        const next = sliders.map(s => s.id === id ? { ...s, [field]: value } : s);
        setSliders(next);
    };

    const addSlider = () => {
        setSliders([...sliders, { id: Date.now(), image: '', title: '', subtitle: '' }]);
    };

    const deleteSlider = (id) => {
        if (window.confirm('Remove this slider?')) {
            setSliders(sliders.filter(s => s.id !== id));
        }
    };

    const handleSave = () => {
        updateSection('heroSliders', sliders);
        alert('Sliders Saved Successfully!');
    };

    return (
        <div className="admin-cms px-4">
            <div className="page-header d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="page-title">Hero Sliders Manager</h2>
                    <p className="page-subtitle">Manage the images and text for your main website slider.</p>
                </div>
                <button className="save-btn" onClick={handleSave}>Save Changes</button>
            </div>

            <div className="mt-4">
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-dark" onClick={addSlider}>
                        <i className="bi bi-plus-lg me-2"></i> Add New Slider
                    </button>
                </div>

                <div className="sliders-list">
                    {sliders.map((slider, idx) => (
                        <div key={slider.id} className="cms-section">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="m-0">Slider #{idx + 1}</h4>
                                <button className="btn btn-sm text-danger" onClick={() => deleteSlider(slider.id)}>
                                    <i className="bi bi-trash fs-5"></i>
                                </button>
                            </div>

                            <div className="row g-4">
                                <div className="col-md-5">
                                    <div className="image-upload-wrapper" style={{ minHeight: '200px' }}>
                                        {slider.image ? (
                                            <div className="current-preview mb-3">
                                                <img src={slider.image} alt="Slider" style={{ width: '100%', borderRadius: '12px' }} />
                                            </div>
                                        ) : (
                                            <div className="py-4 text-muted">
                                                <i className="bi bi-image fs-1 d-block mb-2"></i>
                                                <span>No Image Uploaded</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, slider.id)}
                                            className="upload-input mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="admin-form">
                                        <div className="form-group">
                                            <label>Slider Title</label>
                                            <input
                                                type="text"
                                                value={slider.title}
                                                onChange={(e) => updateSlider(slider.id, 'title', e.target.value)}
                                                placeholder="e.g. Traditional Gold"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Slider Subtitle</label>
                                            <textarea
                                                value={slider.subtitle}
                                                onChange={(e) => updateSlider(slider.id, 'subtitle', e.target.value)}
                                                placeholder="e.g. Crafted with passion"
                                                rows="3"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminSliders;
