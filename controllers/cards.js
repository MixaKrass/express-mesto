const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      if (res.status(400)) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.'});
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(() => {
      if (res.status(400)) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.'});
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(() => {
      if (res.status(404)) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена..'});
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(() => {
      if (res.status(400)) {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.'});
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(() => {
      if (res.status(400)) {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.'});
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };