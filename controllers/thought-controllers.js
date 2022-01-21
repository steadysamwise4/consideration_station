const { Thought, User} = require('../models');

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
      });
    },


    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUser => {
                console.log(dbUser);
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.json(err));
    },





}

module.exports = thoughtController;