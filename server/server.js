const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
let   moment = require('moment'); // require
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const {Product} = require("./models")

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

var CronJob = require('cron').CronJob;
var job = new CronJob('0 */1 * * * *', function() {
  console.log('You will see this message every minute',moment().format());
}, null, true, 'America/Los_Angeles');
job.start();

async function Find(){
  const filter = { _id:"600779a81ea0905bf116730b"};
  const doc = await Product.findOne(filter);
  console.log(doc)
}



