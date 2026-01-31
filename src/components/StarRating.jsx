import React from 'react';

const StarRating = ({ rating, maxStars = 5, interactive = false, onRatingChange, size = 18 }) => {
    const [hoverRating, setHoverRating] = React.useState(0);

    const handleClick = (value) => {
        if (interactive && onRatingChange) {
            onRatingChange(value);
        }
    };

    const handleMouseEnter = (value) => {
        if (interactive) {
            setHoverRating(value);
        }
    };

    const handleMouseLeave = () => {
        if (interactive) {
            setHoverRating(0);
        }
    };

    const getStarClass = (index) => {
        const value = index + 1;
        const currentRating = interactive && hoverRating > 0 ? hoverRating : rating;

        if (currentRating >= value) {
            return 'star filled';
        } else if (currentRating > index && currentRating < value) {
            return 'star half';
        }
        return 'star';
    };

    return (
        <div className="star-rating" style={{ fontSize: `${size}px` }}>
            {[...Array(maxStars)].map((_, index) => (
                <span
                    key={index}
                    className={getStarClass(index)}
                    onClick={() => handleClick(index + 1)}
                    onMouseEnter={() => handleMouseEnter(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: interactive ? 'pointer' : 'default' }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
