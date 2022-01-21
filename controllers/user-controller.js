const { User } = require('../models');

const userController = {

    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            path: 'friends',
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

    createUser({ body }, res) {
        User.create(body)
        .then(createdUser => res.json(createdUser))
        .catch(err => res.json(err));
    },

}


module.exports = userController;