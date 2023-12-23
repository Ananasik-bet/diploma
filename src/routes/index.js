import express from 'express';
import dashboardRouter from './dashboard.router.js';
import alertRouter from './alert.router.js';

const router = express.Router();

// Add routes here using dashboardRouter and alertRouter
router.use('/dashboard', dashboardRouter);
router.use('/alerts', alertRouter);

export default router;