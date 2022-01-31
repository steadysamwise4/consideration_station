const { Thought, User} = require('../models');
const mongoose = require('mongoose');
const thoughtController = {

    // get all thoughts -- api/thoughts
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
// get one thought -- api/thoughts/:id
    getSingleThought({ params }, res) {
        if( !mongoose.Types.ObjectId.isValid( params.id) ) {
            res.status(404).json({ message: 'Thought not found!' });
            return;
        };
        Thought.findOne({ _id: params.id})
        .select('-__v')
        .then(dbSingleThought => res.json(dbSingleThought))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },

// create a thought -- api/thoughts/:userId
    addThought({ params, body }, res) {
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

    updateThought({ params, body }, res) {
        if( !mongoose.Types.ObjectId.isValid( params.id) ) {
            res.status(404).json({ message: 'Thought not found!' });
            return;
        };
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true, runValidators: true }
            )
            .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
        if( !mongoose.Types.ObjectId.isValid( params.id) ) {
            res.status(404).json({ message: 'Thought not found!' });
            return;
        };
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { username: dbThoughtData.username },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                  );
                })
                .then(UserMinusThought => {
                res.status(200).json(UserMinusThought)
                })
                .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        if( !mongoose.Types.ObjectId.isValid( params.thoughtId) ) {
            res.status(404).json({ message: 'Thought not found!' });
            return;
        };
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
          .then(ThoughtWithReaction => {
            if (!ThoughtWithReaction) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            console.log(ThoughtWithReaction);
            console.log(ThoughtWithReaction.createdAt);
            res.json(ThoughtWithReaction);
          })
          .catch(err => res.json(err));
      },

      removeReaction({ params }, res) {
        if( !mongoose.Types.ObjectId.isValid( params.thoughtId) ) {
            res.status(404).json({ message: 'Thought not found!' });
            return;
        };
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
          .then(ThoughtMinusReaction => res.json(ThoughtMinusReaction))
          .catch(err => res.json(err));
      }



}

module.exports = thoughtController;