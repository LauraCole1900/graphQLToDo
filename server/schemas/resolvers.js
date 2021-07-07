const { ToDo, User } = require("../models");

const resolvers = {
  Query: {
    GetOneUser: async (_, email) => {
      return User.findOne(email);
    },
    ToDos: async () => {
      return ToDo.find({})
    },
    GetMyToDos: async (_, _id) => {
      return User.findOne(_id)
    }
  },

  Mutation: {
    addUser: async (_, { email, password }) => {
      return await User.create({ email, password })
    },
    addToDo: async (_, { name, description, due }) => {
      return await ToDo.create({ name, description, due })
    },
    editToDo: async (_, { name, description, due }) => {
      return await ToDo.updateOne({ name, description, due })
    },
    deleteToDo: async (_, { name, description, due }) => {
      return await ToDo.deleteOne({ name, description, due })
    },
    newToDo: async (_, { name, description, due }) => {
      return await ToDo.create({ name, description, due })
    }
  }
}

module.exports = resolvers;