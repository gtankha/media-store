const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
let   moment = require('moment'); // require
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const {Product,User} = require("./models")

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


// Serve up static assets

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}




var CronJob = require('cron').CronJob;
var job = new CronJob('*/15 * * * * *', function() {
  console.log('You will see this message every minute',moment().format());
  Find();
}, null, true, 'America/Los_Angeles');
job.start();

 function Find(){
 
   Product.find()
   .then(data=>{
   
   const auctions = data.filter(product => {return product.bidTimeStamp != null} )
   auctions.forEach(prod => {

   const now = moment(); //todays date
   const m = moment(prod.bidTimeStamp).format(); // another date
   const duration = moment.duration(now.diff(m));

   const expire = Math.floor(120 - duration.asSeconds());

   if(expire <=0){

    console.log("id",prod._id);

    const message = `You won the action for ${prod.name} on ${moment(prod.bidTimeStamp).format('MMMM Do YYYY, h:mm:ss a')}`
    User.findOneAndUpdate({email:prod.bidderId}, { "$push": { "messages": message } },
    function (err, raw) {
        if (err) return handleError(err);
        console.log('The raw response from Mongo was ', raw);
    })

    
    Product.findOneAndDelete({_id:prod._id}, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Deleted User : ", docs); 
    } })
    .then(data => console.log(data))
    .catch(err=> console.log(err))
   }

   

   console.log("bidTimeStamp",now.format(),m,prod.bidTimeStamp,duration.asSeconds());

   })
   
   })
}



