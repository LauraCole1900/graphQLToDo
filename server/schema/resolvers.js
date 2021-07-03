const { ToDo, User } = require("../models");

const resolvers = {
  Query: {
    user: async () => {
      return User.findOne({});
    },
    todos: async () => {
      return ToDo.find({})
    }
  }
}

module.exports = resolvers;