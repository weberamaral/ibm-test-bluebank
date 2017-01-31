import express from 'express';
import validation from 'express-validation';
import rules from '../../config/params-validation';
import controller from '../controllers/account.controller';

const router = express.Router();

router.route('/create-data').get(controller.createDataAccounts);
// GET /api/accounts/:id
router.route('/:id').get(validation(rules.getAccount), controller.get);
// GET /api/accounts/:id/balance
router.route('/:id/balance').get(validation(rules.getAccount), controller.checkBalance);
// PUT /api/accounts/:id/balance/add
router.route('/:id/balance/add').put(validation(rules.updateBalance), controller.addBalance);
// PUT /api/accounts/:id/balance/retire
router.route('/:id/balance/retire').put(validation(rules.updateBalance), controller.retireBalance);
// GET /api/accounts
router.route('/').get(controller.list);
// POST /api/accounts
router.route('/').post(validation(rules.createAccount), controller.create);

export default router;
