/* eslint-disable linebreak-style */
const router = require('express').Router();
<<<<<<< HEAD
=======
<<<<<<< HEAD

>>>>>>> 48d3ee355ceec1b9bc05c73570f6f03d87953bcc
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
=======
const {
  getUsers, getUserById, updateProfile, updateAvatar, getProfile,
>>>>>>> 43116ed5c1a6c9d805419269014fd4f1dab033f6
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getProfile);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
