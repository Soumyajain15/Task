import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    logo: {
        type: String,
        default: 'C'
    },
    logoColor: {
        type: String,
        default: '#2D3E50'
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    foundedOn: {
        type: String,
        required: [true, 'Founded date is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }
}, {
    timestamps: true
});

// Virtual for average rating (calculated from reviews)
companySchema.virtual('averageRating', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'companyId',
    justOne: false
});

const Company = mongoose.model('Company', companySchema);

export default Company;
