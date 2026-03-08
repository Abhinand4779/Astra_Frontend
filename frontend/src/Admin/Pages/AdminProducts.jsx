import React, { useState } from 'react';
import { allProducts as initialProducts } from '../../data/products';
import './AdminProducts.css';

const AdminProducts = () => {
    const [products, setProducts] = useState(initialProducts);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        oldPrice: '',
        category: '',
        section: 'Women',
        description: '',
        images: ['', '', '', '']
    });

    const handleAddProduct = (e) => {
        e.preventDefault();
        const productToAdd = {
            ...newProduct,
            id: Date.now(),
            details: ['Material: TBA', 'Weight: TBA'] // Default specs
        };
        setProducts([productToAdd, ...products]);
        setShowModal(false);
        setNewProduct({
            name: '', price: '', oldPrice: '', category: '', section: 'Women', description: '', images: ['', '', '', '']
        });
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
                                <td><strong>{product.price}</strong></td>
                                <td>
                                    <button className="edit-btn"><i className="bi bi-pencil"></i></button>
                                    <button className="del-btn"><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for adding new product */}
            {showModal && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h3>Add New Product</h3>
                            <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form className="admin-form" onSubmit={handleAddProduct}>
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
                                    <label>Section</label>
                                    <select value={newProduct.section} onChange={(e) => setNewProduct({ ...newProduct, section: e.target.value })}>
                                        <option value="Women">Women</option>
                                        <option value="Men">Men</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} placeholder="e.g. Bangles" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Short Description</label>
                                <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} rows="3"></textarea>
                            </div>

                            <div className="form-group">
                                <label>Image URLs (At least 1 required)</label>
                                {newProduct.images.map((img, idx) => (
                                    <input
                                        key={idx}
                                        type="url"
                                        placeholder={`Image URL ${idx + 1}`}
                                        value={img}
                                        onChange={(e) => {
                                            const newImgs = [...newProduct.images];
                                            newImgs[idx] = e.target.value;
                                            setNewProduct({ ...newProduct, images: newImgs });
                                        }}
                                        className="mb-2"
                                        required={idx === 0}
                                    />
                                ))}
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
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
