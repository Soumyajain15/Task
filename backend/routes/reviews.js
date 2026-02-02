import express from 'express';
import {
    getReviews,
    createReview
} from '../controllers/reviewController.js';

const router = express.Router();

router.route('/:companyId')
    .get(getReviews);

router.route('/')
    .post(createReview);

export default router;
