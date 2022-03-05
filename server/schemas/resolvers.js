const { ToDo, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {

  //===============//
  //    Queries    //
  //===============//
  Query: {

    //===================//
    //   To-Do Queries   //
    //===================//
    GetMyToDos: async (_, __, context) => {
      if (context.user) {
        return await ToDo.find({ userId: context.user._id })
      } else {
        throw new AuthenticationError("Must be logged in");
      }
    },

    GetOneToDo: async (_, { _id }) => {
      return await ToDo.findOne({ _id: _id });
    },

    GetToDos: async () => {
      return ToDo.find({})
    },


    //==================//
    //   User Queries   //
    //==================//
    GetMe: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      } else {
        throw new AuthenticationError("Must be logged in");
      }
    },

    GetOneUser: async (_, email) => {
      return User.findOne(email);
    },
  },


  //===============//
  //   Mutations   //
  //===============//
  Mutation: {

    //===================//
    //  To-Do Mutations  //
    //===================//
    createToDo: async (_, { name, description, due, done }, context) => {
      return await ToDo.create({ userId: context.user._id, name: name, description: description, due: due, done: done })
    },

    deleteToDo: async (_, { _id }) => {
      return await ToDo.findOneAndDelete({ _id: _id });
    },

    editToDo: async (_, { _id, name, description, due }) => {
      return await ToDo.findOneAndUpdate({ _id: _id }, { name, description, due }, { new: true })
    },

    markDone: async (_, { _id, done }) => {
      return await ToDo.findOneAndUpdate({ _id: _id }, { done }, { new: true });
    },


    //==================//
    //  User Mutations  //
    //==================//
    addUser: async (_, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new AuthenticationError("Login failed. Try again");
      }
      // Check password
      const correctPassword = await user.isCorrectPassword(password);
      // If incorrect password, throw auth error
      if (!correctPassword) {
        throw new AuthenticationError("Login failed. Try again");
      }
      const token = signToken(user);
      return { token, user };
    }
  }
}

module.exports = resolvers;