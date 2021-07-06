const { ToDo, User } = require("../models");

const resolvers = {
  Query: {
    GetOneUser: async () => {
      return User.findOne({ email });
    },
    todos: async () => {
      return ToDo.find({})
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
    }
  }
}

module.exports = resolvers;