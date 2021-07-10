const { ToDo, User } = require("../models");

const resolvers = {
  Query: {
    GetMyToDos: async (_, userId) => {
      return await ToDo.find(userId)
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
    createToDo: async (_, { userId, name, description, due, done }) => {
      return await ToDo.create({ userId, name, description, due, done })
    },
    deleteToDo: async (_, _id) => {
      return await ToDo.findOneAndDelete(_id)
    },
    editToDo: async (_, { _id, name, description, due, done}) => {
      return await ToDo.findOneAndUpdate({ _id, name, description, due, done })
    },
  }
}

module.exports = resolvers;