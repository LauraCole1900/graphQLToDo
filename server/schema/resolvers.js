const { ToDo, User } = require("../models");

const resolvers = {
  Query: {
    user: async () => {
      return User.findOne({});
    },
    todos: async () => {
      return ToDo.find({})
    }
  },

  Mutation: {
    createUser: async (_, { email, password }) => {
      return await User.create({ email, password })
    },
    createToDo: async (_, { name, description, due }) => {
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