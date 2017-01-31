import Database from '../helpers/dynamo-db';
import config from '../../config/env';
import TransactionTypes from './transaction.types';

const _ = require('lodash');

class Transaction {
  constructor(data) {
    const params = data || {};
    this.id = params.id;
    this.fromAccountId = params.fromAccountId;
    this.toAccountId = params.toAccountId;
    this.value = params.value;
    this.status = params.status || TransactionTypes.STATUS.PENDING;
    this.type = TransactionTypes.TYPES.TRANSFER;
    this._db = new Database(config.dynamoDB.Transactions.TableName);
  }

  // Database functions

  /**
   *
   * @param id
   * @param callback
   */
  static getOneByID(id, callback) {
    if (!id || id === '') {
      throw new Error('ID deve ser uma string e com algum valor');
    }
    const db = new Database(config.dynamoDB.Transactions.TableName);
    db.getById(id, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, new Transaction(result));
    });
  }

  /**
   *
   * @param callback
   */
  static findAll(id, callback) {
    const db = new Database(config.dynamoDB.Transactions.TableName);
    const options = {
      limit: 20,
      scanIndexForward: false,
      keyConditionExpression: 'fromAccountId = :id AND #st <= :st',
      expressionAttributeNames: { '#st': 'status' },
      expressionAttributeValues: {
        ':id': id,
        ':st': TransactionTypes.STATUS.PENDING
      }
    };
    db.byIndex('GetAllPendingIndex', options, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      const transactions = [];
      results.forEach((item) => {
        transactions.push(new Transaction(item).toVO());
      });
      return callback(null, transactions);
    });
  }

  save(callback) {
    const params = converParamsToSave(this);
    this._db.insert(params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      this.id = result.id;
      this.createdAt = result.createdAt;
      return callback(null, this);
    });
  }

  updateStatus(callback) {
    const params = converParamsToSave(this);
    this._db.update(params.key, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

  toVO() {
    return _.omit(this, ['_db']);
  }
}

/**
 *
 * @param {Transaction} params
 * @returns {{}}
 */
function converParamsToSave(params) {
  return {
    key: { id: params.id, type: params.type },
    fromAccountId: params.fromAccountId,
    toAccountId: params.toAccountId,
    value: params.value,
    balance: params.balance,
    status: TransactionTypes.STATUS.OK,
    type: params.type
  };
}

export default Transaction;
