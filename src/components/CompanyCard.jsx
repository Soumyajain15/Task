import React from 'react';
import StarRating from './StarRating';

const CompanyCard = ({ company, onClick }) => {
    const averageRating = company.averageRating || 0;
    const reviewCount = company.reviewCount || 0;

    return (
        <div className="company-card-horizontal card">
            <div className="company-card-left">
                <div className="company-logo-list" style={{ backgroundColor: company.logoColor || '#8B00FF' }}>
                    {company.logo}
                </div>
            </div>

            <div className="company-card-center">
                <div className="company-card-main-info">
                    <h3 className="company-name-list">{company.name}</h3>
                    <div className="company-location">
                        <span className="location-icon">📍</span>
                        <span>{company.location}</span>
                    </div>
                </div>

                <div className="company-rating-info">
                    <StarRating rating={averageRating} size={18} />
                    <span className="rating-number">{averageRating.toFixed(1)}</span>
                    <span className="review-count">{reviewCount} Review{reviewCount !== 1 ? 's' : ''}</span>
                </div>
            </div>

            <div className="company-card-right">
                <div className="founded-date">Founded on {new Date(company.foundedOn).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</div>
                <button className="btn btn-dark" onClick={onClick}>
                    Detail Review
                </button>
            </div>
        </div>
    );
};

export default CompanyCard;
