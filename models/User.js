const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'You must provide a username!',
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: 'email address required!',
            unique: true,
            match: [/^.+@(?:[\w-]+\.)+\w+$/, 'email address must be valid!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)




const User = model('User', UserSchema)

module.exports= User;