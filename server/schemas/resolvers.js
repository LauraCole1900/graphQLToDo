const { ToDo, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    GetMe: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      } else {
        throw new AuthenticationError("Must be logged in");
      }
    },
    GetMyToDos: async (_, __, context) => {
      if (context.user) {
        const todos = await ToDo.find({ userId: context.user._id })
        console.log({todos});
        return todos;
      } else {
        throw new AuthenticationError("Must be logged in");
      }
    },
    GetOneToDo: async (_, id) => {
      return await ToDo.findOne(id)
    },
    GetOneUser: async (_, email) => {
      return User.findOne(email);
    },
    GetToDos: async () => {
      return ToDo.find({})
    },
  },

  Mutation: {
    addUser: async (_, { email, password }) => {
      return await User.create({ email, password })
    },
    createToDo: async (_, { name, description, due, done }, context) => {
      return await ToDo.create({ userId: context.user._id, name: name, description: description, due: due, done: done })
    },
    deleteToDo: async (_, _id) => {
      return await ToDo.findOneAndDelete(_id)
    },
    editToDo: async (_, { _id, name, description, due }) => {
      return await ToDo.findOneAndUpdate({ _id: _id }, { name, description, due }, { new: true })
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
    },
    markDone: async (_, { _id, done }) => {
      return await ToDo.findOneAndUpdate({ _id: _id }, { done })
    }
  }
}

module.exports = resolvers;