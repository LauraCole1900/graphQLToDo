const { Schema, model } = require("mongoose");

const toDoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
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
  done: {
    type: Boolean,
    required: true
  },
  created_At: {
    type: Date,
    default: Date.now,
    required: true
  }
})

const ToDo = model("ToDo", toDoSchema);

module.exports = ToDo;