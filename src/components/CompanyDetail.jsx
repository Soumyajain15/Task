import React from 'react';
import ReviewCard from './ReviewCard';
import StarRating from './StarRating';
import { calculateAverageRating, getCompanyReviews } from '../utils/storage';

const CompanyDetail = ({ company, onBack, onAddReview, sortBy, onSortChange }) => {
    const averageRating = parseFloat(calculateAverageRating(company.id));
    const allReviews = getCompanyReviews(company.id);

    // Sort reviews
    let sortedReviews = [...allReviews];
    if (sortBy === 'recent') {
        sortedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'highest') {
        sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
        sortedReviews.sort((a, b) => a.rating - b.rating);
    }

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
                            <span className="review-count">{allReviews.length} Review{allReviews.length !== 1 ? 's' : ''}</span>
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

                {sortedReviews.length === 0 ? (
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
