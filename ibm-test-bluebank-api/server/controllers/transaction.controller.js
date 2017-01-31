import httpStatus from 'http-status';
import Account from '../models/account.model';
import Transaction from '../models/transaction.model';
import TransactionTypes from '../models/transaction.types';
import APIError from '../helpers/api-error';

/**
 *
 * @param req
 * @param res
 * @param next
 */
function transfer(req, res, next) {
  Promise.all([
    getAccountAsPromise(req.body.fromAccountAgency, req.body.fromAccountNumber),
    getAccountAsPromise(req.body.toAccountAgency, req.body.toAccountNumber)
  ])
    .then(([fromAccount, toAccount]) => {
      if (fromAccount.balance < req.body.value) {
        const message = 'Saldo insuficiente na conta de origem';
        return next(new APIError(message, httpStatus.BAD_REQUEST, true));
      }
      const transaction = new Transaction({
        fromAccountId: fromAccount.id,
        toAccountId: toAccount.id,
        value: req.body.value,
        type: TransactionTypes.TYPES.TRANSFER
      });
      transaction.save((err, result) => {
        if (err) {
          const message = 'Erro ao efetuar a transação';
          return next(new APIError(message, httpStatus.BAD_REQUEST, true));
        }
        return res.status(httpStatus.CREATED).json(result.toVO());
      });
    })
    .catch(err => next(new APIError(err.message, httpStatus.NOT_FOUND, true)));
}
/**
 *
 * @param req
 * @param res
 * @param next
 */
function commit(req, res, next) {
  Transaction.getOneByID(req.params.id, (err, transaction) => {
    if (err) {
      const message = 'Erro ao efetivar transação';
      return next(new APIError(message, httpStatus.INTERNAL_SERVER_ERROR, true));
    }
    Promise.all([
      getAccountByIdAsPromise(transaction.toAccountId),
      getAccountByIdAsPromise(transaction.fromAccountId)
    ])
      .then(([toAccount, fromAccount]) => {
        const accountTo = new Account(toAccount);
        const accountFrom = new Account(fromAccount);
        accountTo.updateBalance(accountTo.balance + transaction.value, (err1) => {
          if (err1) {
            const message = 'Erro ao efetivar transação - Falha ao atualizar conta de destino';
            return next(new APIError(message, httpStatus.INTERNAL_SERVER_ERROR, true));
          }
          accountFrom.updateBalance(accountFrom.balance - transaction.value, (err2, result) => {
            if (err2) {
              const message = 'Erro ao efetivar transação - Falha ao atualizar conta de origem';
              return next(new APIError(message, httpStatus.INTERNAL_SERVER_ERROR, true));
            }
            transaction.updateStatus((err) => {
              if (err) {
                const message = `Erro ao atualizar o status da transaferencia - ${err.message}`;
                return next(new APIError(message, httpStatus.INTERNAL_SERVER_ERROR, true));
              }
              return res.json({ balance: result.balance });
            });
          });
        });
      })
      .catch(err3 => next(new APIError(err3.message, httpStatus.NOT_FOUND, true)));
  });
}

function getAccountByIdAsPromise (id) {
  return new Promise((resolve, reject) => {
    Account.getOneByID(id, (err, account) => {
      if (err) {
        const message = `Não foi encontrada uma conta com ID: ${id}`;
        return reject(new Error(message));
      }
      return resolve(new Account(account).toVO());
    });
  });
}

function getAccountAsPromise(agency, number) {
  return new Promise((resolve, reject) => {
    Account.getAccount(agency, number, (err, account) => {
      if (err) {
        const message = `Não foi encontrada uma conta com agencia ${agency} e número ${number}`;
        return reject(new Error(message));
      }
      return resolve(account.toVO());
    });
  });
}

export default { transfer, commit };
