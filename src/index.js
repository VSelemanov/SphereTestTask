import express from 'express';
import { graphqlHTTP } from 'express-graphql';

const PORT = 4000;

const app = express();

app.post(
  '/graphql',
  graphqlHTTP({
    // schema: MyGraphQLSchema,
    graphiql: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
