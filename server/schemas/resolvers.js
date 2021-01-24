const { AuthenticationError } = require('apollo-server-express');
const console = require('console');
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
      if (context.user) {
        const email = await context.user;
        const user = await User.findOne({ 'email': email }).populate({
          path: 'orders.products',
          populate: 'category'
        });
        return user;
      }

      throw new AuthenticationError('Not logged in a');
    },
    order: async (parent, { _id }, context) => {

      if (context.user) {
        const email = await context.user;
        const user = await User.findOne({ 'email': email }).populate({
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


      for (let i = 0; i < products.length; i++) {
  
    
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
     
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
      
      const isUser = await User.findOne({ 'email': args.email }).exec();
  

      if (!isUser) {
        const user = await User.create(args);
       
        return { user };
      }
      else {
        return (isUser);

      };

    },
    addOrder: async (parent, { products }, context) => {
      console.log("contect of the user");
      console.log(context.user);
      if (context.user) {
        const order = new Order({ products });

        const email = await context.user;
        await User.findOneAndUpdate({ 'email': email }, { $push: { orders: order } });
        return order;
      }

      throw new AuthenticationError('Not logged in c');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const email = await context.user;
        return await User.findOneAndUpdate({ 'email': email }, args, { new: true });
      }

      throw new AuthenticationError('Not logged in d');
    },
    updateProduct: async (parent, { _id, value, bidderId, bidderName, bidTimeStamp }) => {


      await Product.findOneAndUpdate({ _id: _id, bidValue: { $lt: value } }, { bidValue: value, bidTimeStamp: bidTimeStamp, bidderName: bidderName, bidderId: bidderId }, { returnOriginal: false });

      return Product.find();
      
    }

   
  }
};

module.exports = resolvers;