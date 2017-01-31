import express from 'express';
import { version, name } from '../../package.json';
import accountRoutes from './account.route';
import transactionRoutes from './transaction.route';

const router = express.Router(); // eslint-disable-line new-cap

// GET /api/health-check
router.get('/health-check', (req, res) => {
  res.send('OK');
});

// GET /api
router.get('/', (req, res) => {
  res.json({ version, name });
});

router.use('/accounts', accountRoutes);
router.use('/transactions', transactionRoutes);

export default router;
