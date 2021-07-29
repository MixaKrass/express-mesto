const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserById= (req, res) => {
  const { userId } = req.body;
  return User.findById ({ userId })
    .then(user => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
};

const createUser = (req, res) => {
  const { name, about, avatar} = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { getUsers, getUserById, createUser };