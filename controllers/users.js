const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => {
      if (res.status(400)) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.'});
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      if (res.status(404)) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.'});
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch(() => {
      if (res.status(400)) {
        res.status(400).send({ message: 'Переданы некорректные данные для создания пользователя.' });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      if (res.status(400)) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else if (res.status(404)) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.'});
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      if (res.status(400)) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else if (res.status(404)) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.'});
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports = { getUsers, getUserById, createUser, updateProfile, updateAvatar };