const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../../../core/models/plugins');

const { priorities, difficulties } = require('../config/states');

const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    priority: {
      type: String,
      enum: priorities,
      default: 'low',
    },
    difficulty: {
      type: String,
      enum: difficulties,
      default: 'easy',
    },
    note: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
