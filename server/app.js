const express  = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect("mongodb+srv://what2watch:what2watch@what2watch.ylfc8dh.mongodb.net/?retryWrites=true&w=majority")
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});