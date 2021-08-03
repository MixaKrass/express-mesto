const router = require('express').Router();
<<<<<<< HEAD

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
