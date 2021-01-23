const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { findOneAndDelete, findOneAndUpdate } = require('../models/User');
// const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
      categories: async () => {
        return await Category.find();
      },
      products: async (parent, { category, name }) => {
        const params = {};

        params.sold = false;
  
        if (category) {
          params.category = category;
        }
  
        if (name) {
          params.name = {
            $regex: name
          };
        }
  
        return await Product.find(params).populate('category');
      },
      product: async (parent, { _id }) => {
        return await Product.findById(_id).populate('category');
      },
      user: async (parent, args, context) => {
        console.log ("abcdefg");
        console.log(context.user);
        if (context.user) {
          const email = await context.user;
          console.log ("email is >>> " +  email);
          const user = await User.findOne({'email':email}).populate({
             path: 'orders.products',
             populate: 'category'
             });
             console.log ("user is ..." + user);
            return user;
        }
            

      // user: async (parent, {email}) => {
      //   console.log("email is",email)
      //     return await User.findOne({'email': email}
      //      ).populate({
      //       path: 'orders.products',
      //       populate: 'category'
      //      });
          
          
          //user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate)
  
        throw new AuthenticationError('Not logged in a');
      },
      order: async (parent, { _id }, context) => {
        console.log(context.user);
        if (context.user) {
          const email = await context.user;
          const user = await User.findOne({'email': email}).populate({
            path: 'orders.products',
            populate: 'category'
          });
  
          return user.orders.id(_id);
        }
  
        throw new AuthenticationError('Not logged in b');
      },
      checkout: async (parent, args, context) => {
        const url = new URL(context.headers.referer).origin;
        const order = new Order({ products: args.products });
        const { products } = await order.populate('products').execPopulate();
        const line_items = [];
  
        console.log ("productssss");
        console.log (products);

  for (let i = 0; i < products.length; i++) {
    // generate product id
    console.log("URL   " + url);
    //console.log("prdimg" + product[i].image);
    
    const product = await stripe.products.create({
      name: products[i].name,
      description: products[i].description,
      images: [`${url}/images/${products[i].image}`],
       //images: ["http://localhost:3000/images/acMovie.jpg"]
    });
  
    // generate price id using the product id
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: products[i].price * 100,
      currency: 'usd',
    });
  
    // add price id to the line items array
    line_items.push({
      price: price.id,
      quantity: 1
    });
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}/`
  });
  
  return { session: session.id };
      }
    }
    ,
    Mutation: {
      addUser: async (parent, args) => {
        console.log(context.user);
      
        console.log ('args');
        console.log (args);
       const isUser = await User.findOne({'email': args.email}).exec();
       
       console.log ('isUser');
       console.log(isUser);
      
        
       if (!isUser) {
       const user = await User.create(args) ;
       return {user};
       }
       else {
      return (isUser);

       };
        
      },
      addOrder: async (parent, { products }, context) => {
        console.log ("contect of the user");
        console.log(context.user);
        if (context.user) {
          const order = new Order({ products });
          
          const email = await context.user;
          await User.findOneAndUpdate({'email': email}, { $push: { orders: order } });
  
          console.log ('order');
          console.log (order);
          return order;
        }
  
        throw new AuthenticationError('Not logged in c');
      },
      updateUser: async (parent, args, context) => {
        console.log(context.user);
        if (context.user) {
          const email = await context.user;
          return await User.findOneAndUpdate({'email': email}, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in d');
      },
      updateProduct: async (parent, { _id, value, bidderId, bidderName, bidTimeStamp }) => {

        
      await Product.findOneAndUpdate({_id:_id,bidValue:{$lt:value}},{bidValue:value,bidTimeStamp:bidTimeStamp,bidderName:bidderName,bidderId:bidderId}, { returnOriginal:false });
      
      return Product.find();
       // return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
      }
      // login: async (parent, { email, password }) => {
      //   const user = await User.findOne({ email });
  
      //   if (!user) {
      //     throw new AuthenticationError('Incorrect credentials');
      //   }
  
      //   const correctPw = await user.isCorrectPassword(password);
  
      //   if (!correctPw) {
      //     throw new AuthenticationError('Incorrect credentials');
      //   }
  
      //   const token = signToken(user);
  
      //   return { token, user };
      // }
    }
  };
  
  module.exports = resolvers;