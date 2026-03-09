import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import './AdminProducts.css';

const AdminProducts = () => {
    const { config, updateSection } = useSite();
    const products = config?.products || [];

    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '', price: '', oldPrice: '', category: '', section: 'Women', description: '', images: ['', '', '', ''], details: ['Material: TBA', 'Weight: TBA']
    });

    const handleSave = (e) => {
        e.preventDefault();

        // Calculate Discount automatically
        let discount = '';
        if (newProduct.oldPrice && newProduct.oldPrice !== '') {
            const currentPrice = parseInt(newProduct.price.replace(/[^\d]/g, ''));
            const oldPrice = parseInt(newProduct.oldPrice.replace(/[^\d]/g, ''));
            if (oldPrice > currentPrice && currentPrice > 0) {
                const diff = oldPrice - currentPrice;
                const percent = Math.round((diff / oldPrice) * 100);
                discount = `${percent}%`;
            }
        }

        const productToSave = { ...newProduct, discount };

        let updatedProducts;
        if (editingProduct) {
            updatedProducts = products.map(p => p.id === editingProduct.id ? { ...productToSave, id: p.id } : p);
        } else {
            updatedProducts = [{ ...productToSave, id: Date.now() }, ...products];
        }
        updateSection('products', updatedProducts);
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this product?")) {
            updateSection('products', products.filter(p => p.id !== id));
        }
    };

    const openEdit = (product) => {
        setEditingProduct(product);
        setNewProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setNewProduct({
            name: '', price: '', oldPrice: '', category: '', section: 'Women', description: '', images: ['', '', '', ''], details: ['Material: TBA', 'Weight: TBA']
        });
    };

    const handleFileChange = (e, idx) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const nextImgs = [...newProduct.images];
                nextImgs[idx] = reader.result;
                setNewProduct({ ...newProduct, images: nextImgs });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="admin-products">
            <div className="page-header">
                <h2 className="page-title">Products</h2>
                <button className="add-btn-main" onClick={() => setShowModal(true)}>
                    <i className="bi bi-plus-lg"></i> Add New Product
                </button>
            </div>

            <div className="products-table-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Section</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="product-cell">
                                    <img src={product.images[0]} alt={product.name} className="table-thumb" />
                                    <span>{product.name}</span>
                                </td>
                                <td><span className={`badge ${product.section.toLowerCase()}`}>{product.section}</span></td>
                                <td>{product.category}</td>
                                <td>
                                    <strong>{product.price}</strong>
                                    {product.discount && (
                                        <span className="badge rounded-pill bg-danger-subtle text-danger ms-2" style={{ fontSize: '0.65rem' }}>
                                            -{product.discount} OFF
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <button className="edit-btn" onClick={() => openEdit(product)}><i className="bi bi-pencil"></i></button>
                                    <button className="del-btn" onClick={() => handleDelete(product.id)}><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                            <button className="close-modal" onClick={closeModal}>&times;</button>
                        </div>
                        <form className="admin-form" onSubmit={handleSave}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Price (e.g. ₹85,000)</label>
                                    <input type="text" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Old Price (For Discounts)</label>
                                    <input type="text" value={newProduct.oldPrice || ''} onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })} placeholder="e.g. ₹1,00,000" />
                                </div>
                                <div className="form-group">
                                    <label>Section</label>
                                    <select value={newProduct.section} onChange={(e) => setNewProduct({ ...newProduct, section: e.target.value })}>
                                        <option value="Women">Women</option>
                                        <option value="Men">Men</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Product Images (Upload up to 4)</label>
                                <div className="product-image-uploads">
                                    {newProduct.images.map((img, idx) => (
                                        <div key={idx} className="image-upload-item mb-3">
                                            {img && (
                                                <div className="mb-2">
                                                    <img src={img} alt={`Preview ${idx + 1}`} style={{ height: '60px', borderRadius: '4px' }} />
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, idx)}
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="save-btn">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
