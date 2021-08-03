/* eslint-disable linebreak-style */
const router = require('express').Router();
<<<<<<< HEAD
=======
<<<<<<< HEAD

=======
>>>>>>> 43116ed5c1a6c9d805419269014fd4f1dab033f6
>>>>>>> 48d3ee355ceec1b9bc05c73570f6f03d87953bcc
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
