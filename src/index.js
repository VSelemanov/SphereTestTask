import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './AppSchema';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
