const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) { res.status(404).send({ message: 'Пользователь по указанному _id не найден.'});
  return;
    }
      res.status(200).send(user);
  })
    .catch(() => {res.status(500).send({ message: 'Произошла ошибка' });
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
      res.status(500).send({ message: 'Произошла ошибка' });
    })
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, {name, about })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    });
};

module.exports = { getUsers, getUserById, createUser, updateProfile, updateAvatar };