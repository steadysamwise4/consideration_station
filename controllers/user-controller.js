const mongoose = require('mongoose');
const { User, Thought } = require('../models');

const userController = {
// get all users -- /api/users
    getAllUsers(req, res) {
        User.find({})
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
      .populate({
        path: 'friends',
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
// delete a user and their thoughts -- /api/users/:id
    deleteUser({ params }, res) {
      if( !mongoose.Types.ObjectId.isValid( params.id) ) {
        res.status(404).json({ message: ' User not found!' });
        return;
      };
      User.findOneAndDelete({ _id: params.id })
        .then(deletedUser => {
          // res.json(deletedUser)
          console.log(deletedUser.username)
          return Thought.deleteMany({ username: deletedUser.username })
        })
        .then(deletedCount => {
          if(!deletedCount) {
            res.status(404).json({ message: 'something went wrong!'});
            return;
          }
          res.json(deletedCount)
        })
        
        .catch(err => res.json(err));
    },

    addFriend({ params }, res) {
      if( !mongoose.Types.ObjectId.isValid( params.userId) ) {
        res.status(404).json({ message: ' User not found!' });
        return;
      };
      User.findOne({ _id: params.userId }) 
        .then(userData => {
          const friendsArr = userData.friends
          const friendObjectId = mongoose.Types.ObjectId(params.friendId);
          const y = friendObjectId.toString();
          // validates user can't friend themself
          if (params.userId === params.friendId) {
            return 10;
            // validates user can't have a duplicate friend
          } else {
          for (let i=0;i<friendsArr.length;i++) {
            const x = friendsArr[i].toString();
            if (x === y) {
              return false
            } else {
              continue
            }
          }
          return true
        }
        })
      .then(userData => {
        if (!userData) {
          res.status(409).json({ message: "You're already friends with that user!"});
          return false
        }
        if (userData === 10) {
          res.status(409).json({ message: "This action is invalid!"});
        } else {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId} },
        { new: true }
      )
        }
      })
      .then(userWithFriend => {
        if (!userWithFriend) {
        return;
        }
        res.json(userWithFriend);
      })
      .catch(err => res.json(err))
    },

    removeFriend({ params }, res) {
      if( !mongoose.Types.ObjectId.isValid( params.userId) ) {
        res.status(404).json({ message: ' User not found!' });
        return;
      };
      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      )
      .then(userWithoutFriend => {
        if (!userWithoutFriend) {
          res.status(404).json({ message: 'User not found!' });
          return;
        }
        res.json(userWithoutFriend);
      })
      .catch(err => res.json(err));
      }



}


module.exports = userController;