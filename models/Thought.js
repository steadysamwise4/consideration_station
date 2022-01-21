const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Content required!',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Username required!'
        },
        reactions: []
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
)

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;