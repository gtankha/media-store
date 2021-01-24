const EventEmitter = require('eventemitter3');
const emitter = new EventEmitter();
const {Product,User,Order} = require("./models");
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
        Find();

        
	};
	const hbt = setInterval(nln, 5000);

	const onEvent = function(data,type) {
		res.write('retry: 500\n');
        res.write(`event: UPDATE_PRODUCTS\n`);
        res.write(`type: ${type}\n`);
		res.write(`data: ${JSON.stringify(data)}\n\n`);
    };
    
    const onEvent2 = function(data,type) {
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
        emitter.removeListener("UPDATE_MESSAGES", onEvent2);
	});
}

  function Find(){
 
   Product.find({sold:false})
   .then(data=>{
   
   const auctions = data.filter(product => {return product.bidTimeStamp != null && product.sold == false} )
   auctions.forEach(prod => {

   const now = moment(); //todays date
   const m = moment(prod.bidTimeStamp).format(); // another date
   const duration = moment.duration(now.diff(m));

   const expire = Math.floor(120 - duration.asSeconds());

   if(expire <=0){

    const message = `You won the action for ${prod.name} on ${moment(prod.bidTimeStamp).format('MMMM Do YYYY, h:mm:ss a')}`;
    const products = [prod._id];
    const order = new Order({products});
  
    //await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
    User.findOneAndUpdate({email:prod.bidderId}, { $addToSet: { "orders": order} }, { returnOriginal:false })
    .then(data=> console.log("new orders:",data))
    .catch(err=> console.log("the error is",error))

    User.findOneAndUpdate({email:prod.bidderId}, { $addToSet: { "messages": message} }, { returnOriginal:false },

    function (err, raw) {
        if (err) return handleError(err);
    })
    .then(user_data => {

     emitter.emit("UPDATE_MESSAGES",user_data,"UPDATE_MESSAGES");

    Product.findOneAndUpdate({_id:prod._id}, {$set:{sold:true}} )

   
    .then(product_data => {
        

        Product.find({sold:false})
        .then(updated_products => {
       
        emitter.emit("UPDATE_PRODUCTS",updated_products ,"UPDATE_PRODUCTS");
        })
    
    })
    .catch(err=> console.log(err))
   })

   

   }
   else if(expire > 0)
   {

    Product.find({sold:false})
    .then(updated_products => {
    emitter.emit("UPDATE_PRODUCTS",updated_products ,"UPDATE_PRODUCTS");
    })

   }

   })
   
   })
}
module.exports = { subscribe };