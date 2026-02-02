import express from 'express';
import {
    getCompanies,
    createCompany,
    deleteCompany
} from '../controllers/companyController.js';

const router = express.Router();

router.route('/')
    .get(getCompanies)
    .post(createCompany);

router.route('/:id')
    .delete(deleteCompany);

export default router;
