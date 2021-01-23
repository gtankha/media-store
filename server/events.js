const EventEmitter = require('eventemitter3');
const emitter = new EventEmitter();
const {Product,User} = require("./models");
let   moment = require('moment'); // require



function subscribe(req, res) {

	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		Connection: 'keep-alive'
	});

	// Heartbeat
	const nln = function() {
        res.write('\n');
        console.log("interval")
        Find();

        
	};
	const hbt = setInterval(nln, 5000);

	const onEvent = function(data,type) {
        console.log("type",type)
		res.write('retry: 500\n');
        res.write(`event: UPDATE_PRODUCTS\n`);
        res.write(`type: ${type}\n`);
		res.write(`data: ${JSON.stringify(data)}\n\n`);
    };
    
    const onEvent2 = function(data,type) {
        console.log("type",type)
		res.write('retry: 500\n');
        res.write(`event: UPDATE_MESSAGES\n`);
        res.write(`type: ${type}\n`);
		res.write(`data: ${JSON.stringify(data)}\n\n`);
	};

    emitter.on("UPDATE_PRODUCTS", onEvent);
    emitter.on("UPDATE_MESSAGES", onEvent2);

	// Clear heartbeat and listener
	req.on('close', function() {
		clearInterval(hbt);
		emitter.removeListener("UPDATE_PRODUCTS", onEvent);
	});
}


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

    
  
    const message = `You won the action for ${prod.name} on ${moment(prod.bidTimeStamp).format('MMMM Do YYYY, h:mm:ss a')}`
    console.log("id",prod._id,prod.name);
    User.findOneAndUpdate({email:prod.bidderId}, { $addToSet: { "messages": message } }, { returnOriginal:false },
    function (err, raw) {
        if (err) return handleError(err);
        console.log('The raw response from Mongo was ', raw);
    })
    .then(user_data => {

     emitter.emit("UPDATE_MESSAGES",user_data,"UPDATE_MESSAGES");

    Product.findOneAndDelete({_id:prod._id}, function (err, docs) { 

    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Deleted User : ", docs); 
    } })
    .then(product_data => {
        

        Product.find()
        .then(updated_products => {
       
        emitter.emit("UPDATE_PRODUCTS",updated_products ,"UPDATE_PRODUCTS");
        })
    
    })
    .catch(err=> console.log(err))
   })

   

   }
   else if(expire > 0)
   {

    Product.find()
    .then(updated_products => {
    emitter.emit("UPDATE_PRODUCTS",updated_products ,"UPDATE_PRODUCTS");
    })

   }

   

   console.log("bidTimeStamp",now.format(),m,prod.bidTimeStamp,duration.asSeconds());

   })
   
   })
}




module.exports = { subscribe };