import uuid from 'node-uuid';
import aws from 'aws-sdk';
import config from '../../config/env';

class Database {
  /**
   *
   * @param tableName
   */
  constructor(tableName) {
    this.tableName = tableName;
    aws.config.update(config.aws);
    this.db = new aws.DynamoDB.DocumentClient();
  }

  /**
   *
   * @param data
   * @param callback
   */
  insert(data, callback) {
    const params = {
      TableName: this.tableName,
      Item: data
    };
    if (!params.Item.id || params.Item.id === '') {
      params.Item.id = uuid.v4();
      params.Item.createdAt = new Date().toISOString();
    }
    this.db.put(params, (err) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, params.Item);
    });
  }

  /**
   *
   * @param data
   * @param key
   * @param options
   * @param callback
   */
  update(key, options, callback) {
    const params = {
      TableName: this.tableName,
      Key: key,
      UpdateExpression: options.updateExpression,
      ExpressionAttributeValues: options.expressionAttributeValues,
      ReturnValues: options.returnValues
    };
    if (options.expressionAttributeNames) {
      params.ExpressionAttributeNames = options.expressionAttributeNames;
    }
    this.db.update(params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.Attributes);
    });
  }

  /**
   *
   * @param id
   * @param callback
   */
  getById(id, callback) {
    if (!id || id === '') {
      throw new Error('id must ve defined');
    }
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: '#id = :id',
      ExpressionAttributeNames: { '#id': 'id' },
      ExpressionAttributeValues: { ':id': id }
    };
    this.db.query(params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      if (result && result.Items && result.Items.length === 0) {
        return callback({ status: 404, message: 'Not Found' }, null);
      }
      return callback(null, result.Items[0]);
    });
  }

  /**
   *
   * @param callback
   */
  list(callback) {
    const params = {
      TableName: this.tableName
    };
    this.db.scan(params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.Items);
    });
  }

  /**
   *
   * @param indexName
   * @param options
   * @param callback
   */
  byIndex(indexName, options, callback) {
    const params = {
      TableName: this.tableName,
      IndexName: indexName,
      Limit: options.limit,
      ScanIndexForward: options.scanIndexForward,
      Select: 'ALL_ATTRIBUTES',
      FilterExpression: options.filterExpression,
      KeyConditionExpression: options.keyConditionExpression,
      ExpressionAttributeNames: options.expressionAttributeNames,
      ExpressionAttributeValues: options.expressionAttributeValues
    };

    this.db.query(params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.Items);
    });
  }
}

export default Database;
