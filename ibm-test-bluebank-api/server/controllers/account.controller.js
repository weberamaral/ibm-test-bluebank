import httpStatus from 'http-status';
import Account from '../models/account.model';
import APIError from '../helpers/api-error';
import mocks from '../../config/mocks/accounts.mocks';

const debug = require('debug')('bluebank-backend:accounts');

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function createDataAccounts(req, res, next) {
  mocks.forEach((mock) => {
    const account = new Account(mock);
    account.save((err, result) => {
      debug('Chamada foi concluida');
    });
    debug('Chamada assincrona');
  });
  return res.status(httpStatus.OK).json({ message: 'Dados fictícios estão sendo criados na collection Acccounts'});
}
/**
 * Recupera uma conta pelo ID
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function get(req, res, next) {
  Account.getOneByID(req.params.id, (err, account) => {
    if (err) {
      const message = `Náo foi possivel recuperar a conta com ID: ${req.params.id}`;
      const status = getStatusCode(err);
      return next(new APIError(message, status, true));
    }
    return res.json(account.toVO());
  });
}
/**
 * Adiciona uma nova conta
 * @param req
 * @param res
 * @param next
 */
function create(req, res, next) {
  const account = new Account(req.body);
  account.save((err) => {
    if (err) {
      const message = 'Não foi possivel adicionar a nova conta.';
      const status = getStatusCode(err);
      return next(new APIError(message, status));
    }
    return res.status(httpStatus.CREATED).json(account.toVO());
  });
}
/**
 * Lista as contas, max 10
 * @param req
 * @param res
 * @param next
 */
function list(req, res, next) {
  Account.list((err, accounts) => {
    if (err) {
      const message = 'Não foi possivel listar as contas.';
      const status = getStatusCode(err);
      return next(new APIError(message, status, true));
    }
    return res.json(accounts);
  });
}
/**
 *
 * @param req
 * @param res
 * @param next
 */
function checkBalance(req, res, next) {
  Account.getOneByID(req.params.id, (err, account) => {
    if (err) {
      const message = `Náo foi possivel recuperar a conta com ID: ${req.params.id}`;
      const status = getStatusCode(err);
      return next(new APIError(message, status, true));
    }
    return res.json({ balance: account.balance });
  });
}
/**
 *
 * @param req
 * @param res
 * @param next
 */
function addBalance(req, res, next) {
  Account.getOneByID(req.params.id, (gErr, account) => {
    if (gErr) {
      const message = `Náo foi possivel recuperar a conta com ID: ${req.params.id}`;
      const status = getStatusCode(gErr);
      return next(new APIError(message, status, true));
    }
    const value = account.balance + req.body.value;
    account.updateBalance(value, (uErr) => {
      if (uErr) {
        const message = `Não foi possivel atualizar o saldo da conta com ID: ${req.params.id}`;
        const status = getStatusCode(uErr);
        return next(new APIError(message, status, true));
      }
      return res.json(account.toVO());
    });
  });
}
/**
 *
 * @param req
 * @param res
 * @param next
 */
function retireBalance(req, res, next) {
  Account.getOneByID(req.params.id, (gErr, account) => {
    if (gErr) {
      const message = `Náo foi possivel recuperar a conta com ID: ${req.params.id}`;
      const status = getStatusCode(gErr);
      return next(new APIError(message, status, true));
    }
    if (account.balance < req.body.value) {
      const message = 'Saldo insuficiente para saque.';
      return next(new APIError(message, httpStatus.BAD_REQUEST, true));
    }
    const value = account.balance - req.body.value;
    account.updateBalance(value, (uErr) => {
      if (uErr) {
        const message = `Não foi possivel atualizar o saldo da conta com ID: ${req.params.id}`;
        const status = getStatusCode(uErr);
        return next(new APIError(message, status, true));
      }
      return res.json(account.toVO());
    });
  });
}

function getStatusCode(err) {
  return err.status || err.statusCode || 500;
}

export default { get, create, list, checkBalance, addBalance, retireBalance, createDataAccounts };
