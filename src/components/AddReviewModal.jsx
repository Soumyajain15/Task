import React, { useState } from 'react';
import StarRating from './StarRating';

const AddReviewModal = ({ isOpen, onClose, onAdd, companyName }) => {
    const [formData, setFormData] = useState({
        reviewerName: '',
        subject: '',
        reviewText: '',
        rating: 0
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRatingChange = (rating) => {
        setFormData({
            ...formData,
            rating
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.reviewerName || !formData.subject || !formData.reviewText || formData.rating === 0) {
            alert('Please fill in all fields and provide a rating');
            return;
        }

        onAdd(formData);

        // Reset form
        setFormData({
            reviewerName: '',
            subject: '',
            reviewText: '',
            rating: 0
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
                    <h2>Add Review</h2>
                    {companyName && <p className="modal-subtitle">for {companyName}</p>}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            name="reviewerName"
                            value={formData.reviewerName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Subject *</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Enter review subject"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Review Text *</label>
                        <textarea
                            name="reviewText"
                            value={formData.reviewText}
                            onChange={handleChange}
                            placeholder="Write your review here..."
                            rows={5}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Rating *</label>
                        <div className="rating-input">
                            <StarRating
                                rating={formData.rating}
                                interactive={true}
                                onRatingChange={handleRatingChange}
                                size={28}
                            />
                            <span className="rating-label">
                                {formData.rating > 0 ? `${formData.rating} star${formData.rating !== 1 ? 's' : ''}` : 'Click to rate'}
                            </span>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="btn btn-primary">Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReviewModal;
