const router = require('express').Router();

const {
    addThought,
    getAllThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controllers');

router.route('/').get(getAllThoughts);

router.route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:userId').post(addThought);

router.route('/:thoughtId/reactions')
    .post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;