const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  todos: {
    type: Schema.Types.ObjectId,
    ref: "ToDo"
  }
})

const User = model("User", userSchema)

module.exports = User;