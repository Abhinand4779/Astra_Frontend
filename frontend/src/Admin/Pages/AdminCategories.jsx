import React, { useState } from 'react';
import './AdminCategories.css';

const AdminCategories = () => {
    // Initial categories matching the NavBar
    const [categories, setCategories] = useState([
        { id: 1, section: 'Women', name: 'Neckpiece', sub: ['Choker', 'Long Chain'] },
        { id: 2, section: 'Women', name: 'Earrings', sub: ['Jhumkas', 'Studs'] },
        { id: 3, section: 'Men', name: 'Bracelets', sub: ['Urban Links', 'Leather'] },
    ]);

    const [newCat, setNewCat] = useState({ section: 'Women', name: '', sub: '' });

    const handleAdd = (e) => {
        e.preventDefault();
        const subArray = newCat.sub.split(',').map(s => s.trim());
        setCategories([...categories, { ...newCat, id: Date.now(), sub: subArray }]);
        setNewCat({ section: 'Women', name: '', sub: '' });
    };

    return (
        <div className="admin-categories">
            <h2 className="page-title">Category Management</h2>

            <div className="cat-layout">
                {/* Form to add new Category */}
                <div className="cat-form-card">
                    <h3>Add New Category</h3>
                    <form onSubmit={handleAdd}>
                        <div className="form-group">
                            <label>Section</label>
                            <select value={newCat.section} onChange={(e) => setNewCat({ ...newCat, section: e.target.value })}>
                                <option value="Women">Women</option>
                                <option value="Men">Men</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Category Name</label>
                            <input
                                type="text"
                                value={newCat.name}
                                onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                                placeholder="e.g. Bangles"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Sub-categories (Comma separated)</label>
                            <input
                                type="text"
                                value={newCat.sub}
                                onChange={(e) => setNewCat({ ...newCat, sub: e.target.value })}
                                placeholder="e.g. Adjustable, Kada"
                            />
                        </div>
                        <button type="submit" className="admin-submit-btn">Add Category</button>
                    </form>
                </div>

                {/* List of existing categories */}
                <div className="cat-list-card">
                    <h3>Current Categories</h3>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Section</th>
                                <th>Category</th>
                                <th>Sub-categories</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <tr key={cat.id}>
                                    <td><span className={`badge ${cat.section.toLowerCase()}`}>{cat.section}</span></td>
                                    <td><strong>{cat.name}</strong></td>
                                    <td>{cat.sub.join(', ')}</td>
                                    <td>
                                        <button className="edit-btn"><i className="bi bi-pencil"></i></button>
                                        <button className="del-btn"><i className="bi bi-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
