const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

app.use((req, res, next) => {
  req.user = {
    _id: '6102985e3d303929009bad65', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));
app.use('*', require('./routes/NotFound'));

app.listen(PORT, () => {
// eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
