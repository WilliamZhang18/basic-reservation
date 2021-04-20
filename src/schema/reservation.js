'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');
const {
  NAMES,
  DESCRIPTIONS
} = require('../util/constants');
const {
  createRevervation,
  getAllReservations,
  getSingleReservation
} = require('../repo/reservation-dynamo-repo');

const ReservationType = new GraphQLObjectType({
  name: NAMES.RESERVATION_TYPE,
  description: DESCRIPTIONS.RESERVATION_TYPE,
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    guest_name: { type: GraphQLNonNull(GraphQLString) },
    hotel_name: { type: GraphQLNonNull(GraphQLString) },
    arrival_date: { type: GraphQLNonNull(GraphQLString) },
    departure_date: { type: GraphQLNonNull(GraphQLString) },
  })
});

const RootQueryType = new GraphQLObjectType({
  name: NAMES.ROOT_QUERY_TYPE,
  description: DESCRIPTIONS.ROOT_QUERY_TYPE,
  fields: () => ({
    reservation: {
      type: ReservationType,
      description: DESCRIPTIONS.FIELDS_SINGLE_RESERVATION,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (parent, args) => await getSingleReservation(args.id)
    },
    reservations: {
      type: new GraphQLList(ReservationType),
      description: DESCRIPTIONS.FIELDS_ALL_RESERVATIONS,
      resolve: async () => await getAllReservations()
    }
  })
});

const RootMutationType = new GraphQLObjectType({
  name: NAMES.ROOT_MUTATION_TYPE,
  description: DESCRIPTIONS.ROOT_MUTATION_TYPE,
  fields: () => ({
    createRevervation: {
      type: ReservationType,
      description: DESCRIPTIONS.FIELDS_CREATE_RESERVATION,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        guest_name: { type: GraphQLNonNull(GraphQLString) },
        hotel_name: { type: GraphQLNonNull(GraphQLString) },
        arrival_date: { type: GraphQLNonNull(GraphQLString) },
        departure_date: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        const reservation = { id: args.id, guest_name: args.guest_name, hotel_name: args.hotel_name, arrival_date: args.arrival_date, departure_date: args.departure_date };
        await createRevervation(reservation);
        return reservation;
      }
    }
  })
});

const reservationSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

module.exports = reservationSchema;
