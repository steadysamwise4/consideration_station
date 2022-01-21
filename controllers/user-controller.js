const mongoose = require('mongoose');
const { User } = require('../models');

const userController = {
// get all users -- /api/users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
// create a new user -- /api/users
    createUser({ body }, res) {
        User.create(body)
        .then(createdUser => res.json(createdUser))
        .catch(err => res.json(err));
    },
// get a single user -- /api/users/:id
    getSingleUser({ params }, res) {
      User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(singleUserData => res.json(singleUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },
// update a user -- /api/users/:id
    updateUser({ params, body }, res) {
      if( !mongoose.Types.ObjectId.isValid( params.id) ) {
        res.status(404).json({ message: ' User not found!' });
        return;
      };
      User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
        .then(singleUser => {
          console.log(singleUser._id);
          
        
          res.json(singleUser);
        })
        .catch(err => res.json(err));
    },
// delete a user -- /api/users/:id
    deleteUser({ params }, res) {
      if( !mongoose.Types.ObjectId.isValid( params.id) ) {
        res.status(404).json({ message: ' User not found!' });
        return;
      };
      User.findOneAndDelete({ _id: params.id })
        .then(deletedUser => res.json(deletedUser))
        .catch(err => res.json(err));
    },

}


module.exports = userController;