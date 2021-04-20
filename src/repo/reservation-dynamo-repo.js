'use strict';

const dynamoDB = require('../util/dynamo');
const { RESERVATION_TABLE } = require('../util/constants');

const createRevervation = async (reservation) => {
  return await dynamoDB.addItem({
    TableName: RESERVATION_TABLE,
    Item: reservation
  });
};

const getSingleReservation = async (id) => {
  const params = {
    TableName: RESERVATION_TABLE,
    Key: {
      id
    }
  };

  const { Item: reservation } = await dynamoDB.getItem(params);

  return reservation;
};

const getAllReservations = async () => {
  const params = {
    TableName: RESERVATION_TABLE
  };

  const { Items: reservations } = await dynamoDB.getItems(params);

  return reservations;
};

module.exports = {
  createRevervation,
  getSingleReservation,
  getAllReservations
};
