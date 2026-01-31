import React, { useState } from 'react';

const AddCompanyModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        logo: '',
        logoColor: '#8B00FF',
        location: '',
        foundedOn: '',
        city: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.location || !formData.foundedOn || !formData.city) {
            alert('Please fill in all required fields');
            return;
        }

        onAdd(formData);

        // Reset form
        setFormData({
            name: '',
            logo: '',
            logoColor: '#8B00FF',
            location: '',
            foundedOn: '',
            city: '',
            description: ''
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="modal-header">
                    <div className="modal-title-decoration"></div>
                    <h2>Add Company</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Company Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter company name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Logo (text/emoji)</label>
                        <input
                            type="text"
                            name="logo"
                            value={formData.logo}
                            onChange={handleChange}
                            placeholder="e.g., C or 💡"
                            maxLength={3}
                        />
                    </div>

                    <div className="form-group">
                        <label>Logo Color</label>
                        <input
                            type="color"
                            name="logoColor"
                            value={formData.logoColor}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Location *</label>
                        <div className="input-with-icon">
                            <span className="input-icon">📍</span>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                                className="input-with-icon-field"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Founded On *</label>
                        <div className="input-with-icon">
                            <span className="input-icon">📅</span>
                            <input
                                type="date"
                                name="foundedOn"
                                value={formData.foundedOn}
                                onChange={handleChange}
                                className="input-with-icon-field"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>City *</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter company description..."
                            rows={4}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCompanyModal;
