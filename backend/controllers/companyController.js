import Company from '../models/Company.js';
import Review from '../models/Review.js';

// @desc    Get all companies with optional filters and sorting
// @route   GET /api/companies
// @access  Public
export const getCompanies = async (req, res) => {
    try {
        const { search, city, sort } = req.query;

        // Build filter query
        let filter = {};

        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        if (city) {
            filter.city = city;
        }

        // Get companies
        let query = Company.find(filter);

        // Apply sorting
        switch (sort) {
            case 'name':
                query = query.sort({ name: 1 });
                break;
            case 'location':
                query = query.sort({ location: 1 });
                break;
            case 'average':
            case 'rating':
                // For rating sort, we'll handle it after fetching
                break;
            default:
                query = query.sort({ createdAt: -1 });
        }

        let companies = await query;

        // Calculate average rating for each company
        const companiesWithRatings = await Promise.all(
            companies.map(async (company) => {
                const reviews = await Review.find({ companyId: company._id });
                const averageRating = reviews.length > 0
                    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                    : 0;

                return {
                    id: company._id,
                    name: company.name,
                    logo: company.logo,
                    logoColor: company.logoColor,
                    location: company.location,
                    city: company.city,
                    foundedOn: company.foundedOn,
                    description: company.description,
                    createdAt: company.createdAt,
                    averageRating: parseFloat(averageRating),
                    reviewCount: reviews.length
                };
            })
        );

        // Sort by rating if requested
        if (sort === 'average' || sort === 'rating') {
            companiesWithRatings.sort((a, b) => b.averageRating - a.averageRating);
        }

        res.json(companiesWithRatings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new company
// @route   POST /api/companies
// @access  Public
export const createCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);

        res.status(201).json({
            id: company._id,
            name: company.name,
            logo: company.logo,
            logoColor: company.logoColor,
            location: company.location,
            city: company.city,
            foundedOn: company.foundedOn,
            description: company.description,
            createdAt: company.createdAt
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a company and its reviews
// @route   DELETE /api/companies/:id
// @access  Public
export const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Delete all reviews associated with this company
        await Review.deleteMany({ companyId: req.params.id });

        // Delete the company
        await Company.findByIdAndDelete(req.params.id);

        res.json({ message: 'Company and associated reviews deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
