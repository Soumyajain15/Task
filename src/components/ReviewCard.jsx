import React from 'react';
import StarRating from './StarRating';

const ReviewCard = ({ review }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Generate initials for avatar
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const avatarColors = ['#8B00FF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F'];
    const getAvatarColor = (id) => {
        if (!id) return avatarColors[0];
        // Simple hash function for string IDs
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return avatarColors[hash % avatarColors.length];
    };
    const avatarColor = getAvatarColor(review.id);

    return (
        <div className="card review-card">
            <div className="review-header">
                <div className="reviewer-info">
                    <div className="reviewer-avatar" style={{ backgroundColor: avatarColor }}>
                        {getInitials(review.reviewerName)}
                    </div>
                    <div className="reviewer-details">
                        <h4 className="reviewer-name">{review.reviewerName}</h4>
                        <span className="review-date">{formatDate(review.createdAt)}</span>
                    </div>
                </div>
                <StarRating rating={review.rating} size={16} />
            </div>

            <h3 className="review-subject">{review.subject}</h3>
            <p className="review-text">{review.reviewText}</p>
        </div>
    );
};

export default ReviewCard;
