import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import ReviewCard from './ReviewCard';
import StarRating from './StarRating';

const CompanyDetail = ({ company, onBack, onAddReview, sortBy, onSortChange }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompanyReviews();
    }, [company.id, sortBy]);

    const fetchCompanyReviews = async () => {
        try {
            setLoading(true);
            const data = await api.fetchReviews(company.id, sortBy);
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const averageRating = company.averageRating || 0;
    const sortedReviews = reviews;

    return (
        <div className="container">
            <button className="btn btn-dark mb-lg" onClick={onBack}>
                ← Back to Companies
            </button>

            <div className="company-detail-header">
                <div className="company-detail-info">
                    <div className="company-logo-large" style={{ backgroundColor: company.logoColor || '#8B00FF' }}>
                        {company.logo}
                    </div>

                    <div className="company-detail-content">
                        <h1>{company.name}</h1>

                        <div className="company-location">
                            <span className="location-icon">📍</span>
                            <span>{company.location}</span>
                        </div>

                        <div className="company-stats">
                            <StarRating rating={averageRating} size={20} />
                            <span className="rating-number-large">{averageRating.toFixed(1)}</span>
                            <span className="review-count">{reviews.length} Review{reviews.length !== 1 ? 's' : ''}</span>
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={onAddReview}>
                    + Add Review
                </button>
            </div>

            {company.description && (
                <div className="company-about-section">
                    <h2>About {company.name}</h2>
                    <p>{company.description}</p>
                </div>
            )}

            <div className="reviews-section">
                <div className="reviews-header">
                    <div className="result-text">
                        Result Found: {sortedReviews.length}
                    </div>

                    <div className="sort-control">
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                            <option value="recent">Most Recent</option>
                            <option value="highest">Highest Rating</option>
                            <option value="lowest">Lowest Rating</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="loader">Loading reviews...</div>
                ) : sortedReviews.length === 0 ? (
                    <div className="empty-state">
                        <h3>No reviews yet</h3>
                        <p>Be the first to review this company!</p>
                    </div>
                ) : (
                    <div className="reviews-list">
                        {sortedReviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyDetail;
