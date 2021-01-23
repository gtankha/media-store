const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { findOneAndDelete, findOneAndUpdate } = require('../models/User');

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
      user: async (parent, {email}) => {
        console.log("email is",email)
          return await User.findOne({'email': email}
           ).populate({
            path: 'orders.products',
            populate: 'category'
           });
          
          
          //user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
         
        
  
       // throw new AuthenticationError('Not logged in');
      },
      order: async (parent, { _id }, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.products',
            populate: 'category'
          });
  
          return user.orders.id(_id);
        }
  
        throw new AuthenticationError('Not logged in');
      }
    },
    Mutation: {
      addUser: async (parent, args) => {
      
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
        console.log(context);
        if (context.user) {
          const order = new Order({ products });
  
          await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
  
          return order;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
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