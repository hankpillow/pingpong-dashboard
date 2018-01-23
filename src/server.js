import {json} from 'body-parser';
import resolvers from './server/resolvers'
import typeDefs from './server/typeDefs'
import express from 'express';

import {makeExecutableSchema} from 'graphql-tools';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';

const schema = makeExecutableSchema({typeDefs, resolvers});

const GRAPHQL_PORT = 3000;
const server = express();

server.use('/api', json(), graphqlExpress({schema}));
server.use('/graphiql', graphiqlExpress({endpointURL: '/api'}));

server.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`,
  )
);

