'use strict';

const aws = require('aws-sdk');
const {
  MESSAGES,
  OPERATIONS
} = require('./constants');

class DynamoDB {
  constructor() {
    this.docClient = new aws.DynamoDB.DocumentClient();
  }

  result(params, resolve, reject, context = 'NA') {
    return (err, data) => {
      if (err) {
        console.error({
          message: MESSAGES.FAILED_TRANSACTION,
          error: err,
          params,
          operation: context
        });
        reject(err);
      } else {
        console.info({
          message: MESSAGES.SUCCEEDED_TRANSACTION,
          operation: context
        });
        resolve(data);
      }
    };
  }

  getItems(params = {}) {
    const {
      TableName
    } = params;
    if (!(TableName))
      throw new Error({
        message: MESSAGES.BAD_INPUT,
        operation: OPERATIONS.GET_ALL_ITEMS,
        arguments: params
      });

    return new Promise((resolve, reject) => {
      this.docClient.scan(params, this.result(params, resolve, reject, OPERATIONS.GET_ALL_ITEMS));
    });
  }

  getItem(params = {}) {
    const {
      TableName
    } = params;
    if (!(TableName))
      throw new Error({
        message: MESSAGES.BAD_INPUT,
        operation: OPERATIONS.GET_SINGLE_ITEM,
        arguments: params
      });

    return new Promise((resolve, reject) => {
      this.docClient.get(params, this.result(params, resolve, reject, OPERATIONS.GET_SINGLE_ITEM));
    });
  }

  addItem(params = {}) {
    const {
      TableName,
      Item
    } = params;
    if (!(TableName && Item))
      throw new Error({
        message: MESSAGES.BAD_INPUT,
        operation: OPERATIONS.ADD_ITEM,
        arguments: params
      });

    return new Promise((resolve, reject) => {
      this.docClient.put(params, this.result(params, resolve, reject, OPERATIONS.ADD_ITEM));
    });
  }

}

module.exports = new DynamoDB();
