// LocalStorage utility functions

const COMPANIES_KEY = 'review_rate_companies';
const REVIEWS_KEY = 'review_rate_reviews';

// Company operations
export const getCompanies = () => {
    try {
        const data = localStorage.getItem(COMPANIES_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading companies:', error);
        return [];
    }
};

export const saveCompanies = (companies) => {
    try {
        localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
        return true;
    } catch (error) {
        console.error('Error saving companies:', error);
        return false;
    }
};

export const addCompany = (company) => {
    const companies = getCompanies();
    const newCompany = {
        ...company,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
    };
    companies.push(newCompany);
    saveCompanies(companies);
    return newCompany;
};

export const deleteCompany = (companyId) => {
    const companies = getCompanies();
    const filtered = companies.filter(c => c.id !== companyId);
    saveCompanies(filtered);

    // Also delete associated reviews
    const reviews = getReviews();
    const filteredReviews = reviews.filter(r => r.companyId !== companyId);
    saveReviews(filteredReviews);
};

// Review operations
export const getReviews = () => {
    try {
        const data = localStorage.getItem(REVIEWS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading reviews:', error);
        return [];
    }
};

export const saveReviews = (reviews) => {
    try {
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
        return true;
    } catch (error) {
        console.error('Error saving reviews:', error);
        return false;
    }
};

export const addReview = (review) => {
    const reviews = getReviews();
    const newReview = {
        ...review,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
    };
    reviews.push(newReview);
    saveReviews(reviews);
    return newReview;
};

export const getCompanyReviews = (companyId) => {
    const reviews = getReviews();
    return reviews.filter(r => r.companyId === companyId);
};

export const calculateAverageRating = (companyId) => {
    const reviews = getCompanyReviews(companyId);
    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
};

// Initialize with sample data if empty
export const initializeSampleData = () => {
    const companies = getCompanies();
    if (companies.length === 0) {
        const sampleCompanies = [
            {
                id: '1',
                name: 'Graftersid Web and App Development',
                logo: 'C',
                logoColor: '#2D3E50',
                location: 'IT Park, Mahima Capital, Maharana Pratap Nagar, Bhopal (M.P.)',
                city: 'Bhopal',
                foundedOn: '2018-04-15',
                description: 'Graftersid is a leading web and app development company specializing in innovative digital solutions. We provide cutting-edge technology services including web development, mobile app development, UI/UX design, and digital marketing. Our team of experienced developers and designers work collaboratively to deliver high-quality products that exceed client expectations. We pride ourselves on our commitment to excellence and customer satisfaction.',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                name: 'Code Tech Company',
                logo: 'CTD',
                logoColor: '#27AE60',
                location: '456, LDPH Arcade No1, Bhopal (M.P.)',
                city: 'Bhopal',
                foundedOn: '2015-06-20',
                description: 'Code Tech Company is a technology consulting firm that helps businesses transform digitally. We offer comprehensive software development services, cloud solutions, and IT consulting. Our expertise spans across various industries, and we are committed to delivering scalable, secure, and efficient solutions that drive business growth. With a focus on innovation and quality, we build long-term partnerships with our clients.',
                createdAt: new Date().toISOString()
            },
            {
                id: '3',
                name: 'Innogent Pvt. Ltd.',
                logo: '💡',
                logoColor: '#F39C12',
                location: '8 Tds Software Complex, Maharana Pratap Nagar AB road, New Rajendra Nagar, Bhopal (M.P.)',
                city: 'Bhopal',
                foundedOn: '2012-03-10',
                description: 'Innogent is an innovative software company focused on creating intelligent business solutions. We specialize in enterprise software development, custom CRM systems, ERP solutions, and business automation tools. Our team combines deep technical expertise with business acumen to deliver solutions that streamline operations and boost productivity. We believe in the power of technology to transform businesses and drive success.',
                createdAt: new Date().toISOString()
            }
        ];

        const sampleReviews = [
            {
                id: '1',
                companyId: '1',
                reviewerName: 'Jargua Watson',
                subject: 'Best Choice',
                reviewText: 'Graftersid one of the best Company dolor sit amet, consectetur adipiscing elit. Cangive neque fugiat elit suspendisse commodo. Pellentesque mus suspendisse metis et mauris. Ultrices ac et men ut. Aliquam aliquam ultrices ipsum commodo magna. In non non, consequat.',
                rating: 4,
                createdAt: '2025-12-22',
                likes: 0
            },
            {
                id: '2',
                companyId: '1',
                reviewerName: 'Jenny Kole',
                subject: 'Great Team',
                reviewText: 'Graftersid one of the best Company dolor sit amet, consectetur adipiscing elit. Cangive neque fugiat elit suspendisse commodo. Pellentesque mus suspendisse metis et mauris. Ultrices ac et men ut.',
                rating: 4,
                createdAt: '2025-11-15',
                likes: 0
            },
            {
                id: '3',
                companyId: '2',
                reviewerName: 'Michael Smith',
                subject: 'Professional Service',
                reviewText: 'Code Tech Company provided exceptional service and delivered our project on time. Their team is highly skilled and professional. The communication throughout the project was excellent, and they were always available to address our concerns. Highly recommended for software development needs.',
                rating: 5,
                createdAt: '2026-01-10',
                likes: 0
            },
            {
                id: '4',
                companyId: '2',
                reviewerName: 'Sarah Johnson',
                subject: 'Excellent Support',
                reviewText: 'The support team at Code Tech is amazing. They helped us migrate our entire infrastructure to the cloud seamlessly. Very knowledgeable and responsive. Would definitely work with them again on future projects.',
                rating: 5,
                createdAt: '2025-12-28',
                likes: 0
            },
            {
                id: '5',
                companyId: '2',
                reviewerName: 'Raj Kumar',
                subject: 'Good Experience',
                reviewText: 'Had a good experience working with Code Tech Company. They delivered quality work within budget. The project manager was very cooperative and ensured all requirements were met.',
                rating: 4,
                createdAt: '2025-11-20',
                likes: 0
            },
            {
                id: '6',
                companyId: '3',
                reviewerName: 'David Brown',
                subject: 'Innovative Solutions',
                reviewText: 'Innogent developed a custom ERP solution for our business that has significantly improved our operations. Their innovative approach and technical expertise are commendable. The team understood our business needs perfectly.',
                rating: 5,
                createdAt: '2026-01-05',
                likes: 0
            },
            {
                id: '7',
                companyId: '3',
                reviewerName: 'Priya Sharma',
                subject: 'Top-notch CRM System',
                reviewText: 'We hired Innogent to build our CRM system and they exceeded our expectations. The system is user-friendly, scalable, and has all the features we needed. Great job by the entire team!',
                rating: 5,
                createdAt: '2025-12-15',
                likes: 0
            },
            {
                id: '8',
                companyId: '3',
                reviewerName: 'Alex Turner',
                subject: 'Reliable Partner',
                reviewText: 'Innogent has been our technology partner for the past two years. They are reliable, deliver quality solutions, and provide excellent post-deployment support. Highly satisfied with their services.',
                rating: 4,
                createdAt: '2025-11-05',
                likes: 0
            }
        ];

        saveCompanies(sampleCompanies);
        saveReviews(sampleReviews);
    }
};
