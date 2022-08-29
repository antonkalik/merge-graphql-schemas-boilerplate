const { gql } = require('apollo-server-koa');

module.exports = gql`
  type Query {
    getDataExample: DataExample
  }

  type DataExample {
    id: ID
    value: String
  }

  type Mutation {
    updateData(value: String!): DataExample!
  }
`;
