import {json} from 'body-parser';
import resolvers from './api/resolvers'
import typeDefs from './api/typeDefs'
import express from 'express';

import {makeExecutableSchema} from 'graphql-tools';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';

const schema = makeExecutableSchema({typeDefs, resolvers});

const GRAPHQL_PORT = 3000;
const server = express();

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use('/api', json(), graphqlExpress({schema}));
server.use('/graphiql', graphiqlExpress({endpointURL: '/api'}));

server.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`,
  )
);

