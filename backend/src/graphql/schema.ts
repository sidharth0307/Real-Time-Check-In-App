import { gql } from "apollo-server-express";

export const typeDefs = gql`
  
  type Event {
    id: String!
    name: String!
    date: String!
    createdAt: String!
    checkIns: [CheckIn!]!
  }

  type CheckIn {
    id: String!
    userName: String!
    eventId: String!
    timestamp: String!
  }

  type Query {
    events: [Event!]!
    event(id: String!): Event
  }

  type Mutation {
    createEvent(name: String!): Event!
    checkInUser(eventId: String!, userName: String!, date: String!): CheckIn!
  }
`;


