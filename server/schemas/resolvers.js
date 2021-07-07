const { ToDo, User } = require("../models");

const resolvers = {
  Query: {
    GetMyToDos: async (_, userId) => {
      return ToDo.find(userId)
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
    addToDo: async (_, { name, description, due }) => {
      return await ToDo.create({ name, description, due })
    },
    createToDo: async (_, { userId, name, description, due }) => {
      return await ToDo.create({ userId, name, description, due })
    },
    deleteToDo: async (_, { name, description, due }) => {
      return await ToDo.deleteOne({ name, description, due })
    },
    editToDo: async (_, { name, description, due }) => {
      return await ToDo.updateOne({ name, description, due })
    },
  }
}

module.exports = resolvers;