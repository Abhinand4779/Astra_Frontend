import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import './AdminCategories.css';

const AdminCategories = () => {
    const { config, updateSection } = useSite();
    const categories = config?.sectionCategories || { women: [], men: [], kids: [] };

    // To make it easy to manage, we'll flatten it for the table view
    const flattenedCats = [
        ...categories.women.map(c => ({ ...c, section: 'Women' })),
        ...categories.men.map(c => ({ ...c, section: 'Men' })),
        ...categories.kids.map(c => ({ ...c, section: 'Kids' })),
    ];

    const [newCat, setNewCat] = useState({ section: 'Women', name: '', count: 0 });

    const handleAdd = (e) => {
        e.preventDefault();
        const section = newCat.section.toLowerCase();
        const updatedSection = [...categories[section], { name: newCat.name, count: parseInt(newCat.count) }];

        const newSiteCategories = { ...categories, [section]: updatedSection };
        updateSection('sectionCategories', newSiteCategories);
        setNewCat({ section: 'Women', name: '', count: 0 });
    };

    const handleDelete = (section, name) => {
        if (window.confirm(`Delete category "${name}"?`)) {
            const secKey = section.toLowerCase();
            const updatedSection = categories[secKey].filter(c => c.name !== name);
            updateSection('sectionCategories', { ...categories, [secKey]: updatedSection });
        }
    };

    return (
        <div className="admin-categories">
            <h2 className="page-title">Category Management</h2>

            <div className="cat-layout">
                <div className="cat-form-card">
                    <h3>Add New Category Item</h3>
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
                            <label>Product Count (Display only)</label>
                            <input
                                type="number"
                                value={newCat.count}
                                onChange={(e) => setNewCat({ ...newCat, count: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="admin-submit-btn">Add Category</button>
                    </form>
                </div>

                <div className="cat-list-card">
                    <h3>Current Categories (Total: {flattenedCats.length})</h3>
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Section</th>
                                    <th>Category</th>
                                    <th>Count</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flattenedCats.map((cat, idx) => (
                                    <tr key={idx}>
                                        <td><span className={`badge ${cat.section.toLowerCase()}`}>{cat.section}</span></td>
                                        <td><strong>{cat.name}</strong></td>
                                        <td>{cat.count} items</td>
                                        <td>
                                            <button className="del-btn" onClick={() => handleDelete(cat.section, cat.name)}><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
