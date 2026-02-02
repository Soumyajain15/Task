import Review from '../models/Review.js';
import Company from '../models/Company.js';

// @desc    Get reviews for a specific company
// @route   GET /api/reviews/:companyId
// @access  Public
export const getReviews = async (req, res) => {
    try {
        const { companyId } = req.params;
        const { sortBy } = req.query;

        // Verify company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Get reviews for the company
        let query = Review.find({ companyId });

        // Apply sorting
        switch (sortBy) {
            case 'recent':
                query = query.sort({ createdAt: -1 });
                break;
            case 'rating':
                query = query.sort({ rating: -1 });
                break;
            default:
                query = query.sort({ createdAt: -1 });
        }

        const reviews = await query;

        // Format response to match frontend expectations
        const formattedReviews = reviews.map(review => ({
            id: review._id,
            companyId: review.companyId,
            reviewerName: review.reviewerName,
            subject: review.subject,
            reviewText: review.reviewText,
            rating: review.rating,
            likes: review.likes,
            createdAt: review.createdAt
        }));

        res.json(formattedReviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
export const createReview = async (req, res) => {
    try {
        const { companyId } = req.body;

        // Verify company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const review = await Review.create(req.body);

        res.status(201).json({
            id: review._id,
            companyId: review.companyId,
            reviewerName: review.reviewerName,
            subject: review.subject,
            reviewText: review.reviewText,
            rating: review.rating,
            likes: review.likes,
            createdAt: review.createdAt
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
