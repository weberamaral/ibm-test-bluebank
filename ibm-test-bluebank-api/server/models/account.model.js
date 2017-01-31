import Database from '../helpers/dynamo-db';
import config from '../../config/env';
import httpStatus from 'http-status';

const _ = require('lodash');

const TYPES = ['BASIC'];
const STATUS = ['PENDING', 'ACTIVE'];

class Account {
  /**
   *
   * @param {object} data
   * @param {string} [data.id] ID da conta, caso seja NULL é criado uma nova conta
   * @param {string} data.cpf CPF do cliente da conta
   * @param {number} [data.balance] balanço inicial da conta
   * @param {number} data.number número da conta
   * @param {number} data.agency número da agencia
   */
  constructor(data) {
    const params = data || {};
    this.id = params.id;
    this.cpf = params.cpf;
    this.balance = params.balance || 0;
    this.number = params.number;
    this.agency = params.agency;
    this.createdAt = params.createdAt;
    this.status = params.status || STATUS[0];
    this.type = params.type = TYPES[0];
    this._db = new Database(config.dynamoDB.Accounts.TableName);
  }

  get status() {
    return this._status;
  }
  set status(value) {
    if (typeof value !== 'string') {
      throw new Error('Status deve ser uma string');
    }
    if (STATUS.indexOf(value.toUpperCase()) === -1) {
      throw new Error('Status não possui um valor válido');
    }
    this._status = value;
  }

  get type() {
    return this._type;
  }
  set type(value) {
    if (typeof value !== 'string') {
      throw new Error('Type deve ser uma string');
    }
    if (TYPES.indexOf(value.toUpperCase()) === -1) {
      throw new Error('Type não possui um valor válido');
    }
    this._type = value;
  }

  // Database functions

  static getOneByID(id, callback) {
    if (!id || id === '') {
      throw new Error('ID deve ser uma string e com algum valor');
    }
    const db = new Database(config.dynamoDB.Accounts.TableName);
    db.getById(id, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, new Account(result));
    });
  }

  static list(callback) {
    const db = new Database(config.dynamoDB.Accounts.TableName);
    const options = {
      limit: 10,
      scanIndexForward: false,
      keyConditionExpression: '#tp = :tp AND createdAt <= :maxDate',
      expressionAttributeNames: { '#tp': 'type' },
      expressionAttributeValues: {
        ':tp': 'BASIC',
        ':maxDate': new Date().toISOString()
      }
    };
    db.byIndex('GetAllIndex', options, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      const accounts = [];
      results.forEach((item) => {
        accounts.push(new Account(item).toVO());
      });
      return callback(null, accounts);
    });
  }

  /**
   *
   * @param agency
   * @param number
   * @param callback
   */
  static getAccount(agency, number, callback) {
    const db = new Database(config.dynamoDB.Accounts.TableName);
    const options = {
      keyConditionExpression: '#n = :n AND agency = :agency',
      expressionAttributeNames: {
        '#n': 'number'
      },
      expressionAttributeValues: {
        ':n': number,
        ':agency': agency
      }
    };
    db.byIndex('GetByAgencyAndNumberIndex', options, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (!results || results.length === 0) {
        return callback({ status: httpStatus.NOT_FOUND, message: 'Not Found' });
      }
      return callback(null, new Account(results[0]));
    });
  }


  updateBalance(value, callback) {
    const params = convertParamsToUpdateBalance(this, value);
    this._db.update(params.key, params, (err, result) => {
      if (err) {
        callback(err, null);
      }
      this.balance = result.balance;
      return callback(null, this);
    });
  }

  /**
   *
   * @param callback
   */
  save(callback) {
    const params = converParamsToSave(this);
    this._db.insert(params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      this.id = result.id;
      this.createdAt = result.createdAt;
      this.status = result.status;
      return callback(null, this);
    });
  }

  toVO() {
    return _.omit(this, ['_db', '_status', '_type']);
  }

}

/**
 *
 * @param {Account} params
 * @returns {{}}
 */
function converParamsToSave(params) {
  return {
    cpf: params.cpf,
    agency: params.agency,
    number: params.number,
    balance: params.balance,
    status: STATUS[1],
    type: params.type
  };
}
/**
 *
 * @param params
 * @param value
 * @returns {*}
 */
function convertParamsToUpdateBalance(params, value) {
  return {
    key: { id: params.id, cpf: params.cpf },
    updateExpression: 'set balance = :balance',
    expressionAttributeValues: { ':balance': value },
    returnValues: 'UPDATED_NEW'
  };
}

export default Account;
