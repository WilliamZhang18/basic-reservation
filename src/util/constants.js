'use strict';

const RESERVATION_TABLE = 'reservation';
const NAMES = {
  RESERVATION_TYPE: 'Reservation',
  ROOT_QUERY_TYPE: 'Query',
  ROOT_MUTATION_TYPE: 'Mutation'
};
const DESCRIPTIONS = {
  RESERVATION_TYPE: 'This represents a reservation with a hotel by a guest',
  ROOT_QUERY_TYPE: 'Root Query',
  ROOT_MUTATION_TYPE: 'Root Mutation',
  FIELDS_SINGLE_RESERVATION: 'Retrieve a reservation by ID',
  FIELDS_ALL_RESERVATIONS: 'Retrieve all reservations',
  FIELDS_CREATE_RESERVATION: 'Create a reservation'
};
const MESSAGES = {
  BAD_INPUT: 'Bad Input',
  FAILED_TRANSACTION: 'Failed Dynamo Transaction',
  SUCCEEDED_TRANSACTION: 'Succeeded Dynamo Transaction',
};
const OPERATIONS = {
  ADD_ITEM: 'addItem',
  GET_SINGLE_ITEM: 'getItem',
  GET_ALL_ITEMS: 'getItems'
};

module.exports = {
  RESERVATION_TABLE,
  NAMES,
  DESCRIPTIONS,
  MESSAGES,
  OPERATIONS
};
