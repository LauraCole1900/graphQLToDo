const { Schema, model } = require('mongoose');

const toDoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  due: {
    type: String
  },
  created_At: {
    type: Date,
    default: Date.now,
    required: true
  }
})

const ToDo = model("ToDo", toDoSchema);

module.exports = ToDo;