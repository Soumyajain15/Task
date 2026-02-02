import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchCompanies = async (search = '', city = '', sort = 'name') => {
    try {
        const response = await api.get('/companies', {
            params: { search, city, sort }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw error;
    }
};

export const createCompany = async (companyData) => {
    try {
        const response = await api.post('/companies', companyData);
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};

export const deleteCompany = async (id) => {
    try {
        const response = await api.delete(`/companies/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting company:', error);
        throw error;
    }
};

export const fetchReviews = async (companyId, sortBy = 'recent') => {
    try {
        const response = await api.get(`/reviews/${companyId}`, {
            params: { sortBy }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export const createReview = async (reviewData) => {
    try {
        const response = await api.post('/reviews', reviewData);
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

export default {
    fetchCompanies,
    createCompany,
    deleteCompany,
    fetchReviews,
    createReview
};
