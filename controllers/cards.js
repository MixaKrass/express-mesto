const Card = require('../models/card');
const BadReqError = require('../errors/bad-req-err');
const NotFoundError = require('../errors/not-found-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReqError('Проверьте обязательные поля');
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new Error('Некорректный id');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        res.status(401).send({ message: 'У тебя нет прав на удаление этой карточки' });
      } else {
        Card.findByIdAndDelete(req.params.cardId)
          .then(() => {
            res.status(200).send(card);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadReqError('Переданы некорректные данные');
      } else if (err.message === 'NotFound') {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new Error('Некорректный id');
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadReqError('Переданы некорректные данные для постановки/снятии лайка.');
      } else if (err.message === 'NotFound') {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      throw new Error('Некорректный id');
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadReqError('Переданы некорректные данные для постановки/снятии лайка.');
      } else if (err.message === 'NotFound') {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
