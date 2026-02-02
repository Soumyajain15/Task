import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Company from './models/Company.js';
import Review from './models/Review.js';

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        // Clear existing data
        await Company.deleteMany({});
        await Review.deleteMany({});
        console.log('Cleared existing data');

        // Create sample companies
        const companies = await Company.insertMany([
            {
                name: 'Graftersid Web and App Development',
                logo: 'G',
                logoColor: '#2D3E50',
                location: 'IT Park, Mahima Capital, Maharana Pratap Nagar, Bhopal (M.P.)',
                city: 'Bhopal',
                foundedOn: '2018-04-15',
                description: 'Graftersid is a leading web and app development company specializing in innovative digital solutions. We provide cutting-edge technology services including web development, mobile app development, UI/UX design, and digital marketing. Our team of experienced developers and designers work collaboratively to deliver high-quality products that exceed client expectations. We pride ourselves on our commitment to excellence and customer satisfaction.'
            },
            {
                name: 'Code Tech Company',
                logo: 'CTD',
                logoColor: '#27AE60',
                location: '456, LDPH Arcade No1, Bhopal (M.P.)',
                city: 'Bhopal',
                foundedOn: '2015-06-20',
                description: 'Code Tech Company is a technology consulting firm that helps businesses transform digitally. We offer comprehensive software development services, cloud solutions, and IT consulting. Our expertise spans across various industries, and we are committed to delivering scalable, secure, and efficient solutions that drive business growth. With a focus on innovation and quality, we build long-term partnerships with our clients.'
            },
            {
                name: 'Innogent Pvt. Ltd.',
                logo: '💡',
                logoColor: '#F39C12',
                location: '8 Tds Software Complex, Maharana Pratap Nagar AB road, New Rajendra Nagar, Bhopal (M.P.)',
                city: 'Bhopal',
                foundedOn: '2012-03-10',
                description: 'Innogent is an innovative software company focused on creating intelligent business solutions. We specialize in enterprise software development, custom CRM systems, ERP solutions, and business automation tools. Our team combines deep technical expertise with business acumen to deliver solutions that streamline operations and boost productivity. We believe in the power of technology to transform businesses and drive success.'
            }
        ]);

        console.log('Companies created:', companies.length);

        // Create sample reviews
        const reviews = await Review.insertMany([
            {
                companyId: companies[0]._id,
                reviewerName: 'Jargua Watson',
                subject: 'Best Choice',
                reviewText: 'Graftersid one of the best Company dolor sit amet, consectetur adipiscing elit. Cangive neque fugiat elit suspendisse commodo. Pellentesque mus suspendisse metis et mauris. Ultrices ac et men ut. Aliquam aliquam ultrices ipsum commodo magna. In non non, consequat.',
                rating: 4,
                likes: 0,
                createdAt: new Date('2025-12-22')
            },
            {
                companyId: companies[0]._id,
                reviewerName: 'Jenny Kole',
                subject: 'Great Team',
                reviewText: 'Graftersid one of the best Company dolor sit amet, consectetur adipiscing elit. Cangive neque fugiat elit suspendisse commodo. Pellentesque mus suspendisse metis et mauris. Ultrices ac et men ut.',
                rating: 4,
                likes: 0,
                createdAt: new Date('2025-11-15')
            },
            {
                companyId: companies[1]._id,
                reviewerName: 'Michael Smith',
                subject: 'Professional Service',
                reviewText: 'Code Tech Company provided exceptional service and delivered our project on time. Their team is highly skilled and professional. The communication throughout the project was excellent, and they were always available to address our concerns. Highly recommended for software development needs.',
                rating: 5,
                likes: 0,
                createdAt: new Date('2026-01-10')
            },
            {
                companyId: companies[1]._id,
                reviewerName: 'Sarah Johnson',
                subject: 'Excellent Support',
                reviewText: 'The support team at Code Tech is amazing. They helped us migrate our entire infrastructure to the cloud seamlessly. Very knowledgeable and responsive. Would definitely work with them again on future projects.',
                rating: 5,
                likes: 0,
                createdAt: new Date('2025-12-28')
            },
            {
                companyId: companies[1]._id,
                reviewerName: 'Raj Kumar',
                subject: 'Good Experience',
                reviewText: 'Had a good experience working with Code Tech Company. They delivered quality work within budget. The project manager was very cooperative and ensured all requirements were met.',
                rating: 4,
                likes: 0,
                createdAt: new Date('2025-11-20')
            },
            {
                companyId: companies[2]._id,
                reviewerName: 'David Brown',
                subject: 'Innovative Solutions',
                reviewText: 'Innogent developed a custom ERP solution for our business that has significantly improved our operations. Their innovative approach and technical expertise are commendable. The team understood our business needs perfectly.',
                rating: 5,
                likes: 0,
                createdAt: new Date('2026-01-05')
            },
            {
                companyId: companies[2]._id,
                reviewerName: 'Priya Sharma',
                subject: 'Top-notch CRM System',
                reviewText: 'We hired Innogent to build our CRM system and they exceeded our expectations. The system is user-friendly, scalable, and has all the features we needed. Great job by the entire team!',
                rating: 5,
                likes: 0,
                createdAt: new Date('2025-12-15')
            },
            {
                companyId: companies[2]._id,
                reviewerName: 'Alex Turner',
                subject: 'Reliable Partner',
                reviewText: 'Innogent has been our technology partner for the past two years. They are reliable, deliver quality solutions, and provide excellent post-deployment support. Highly satisfied with their services.',
                rating: 4,
                likes: 0,
                createdAt: new Date('2025-11-05')
            }
        ]);

        console.log('Reviews created:', reviews.length);
        console.log('Sample data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
