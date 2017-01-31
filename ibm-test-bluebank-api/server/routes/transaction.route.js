import express from 'express';
import validation from 'express-validation';
import rules from '../../config/params-validation';
import controller from '../controllers/transaction.controller';

const router = express.Router();

// GET /api/transactions
router.route('/').post(validation(rules.createTransaction), controller.transfer);
// PUT /api/transactions/:id
router.route('/:id').put(validation(rules.paramsId), controller.commit);

export default router;
