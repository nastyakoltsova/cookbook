require('@babel/register');
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const dbCheck = require('./db/dbCheck');

const ssr = require('./src/middlewares/ssr');
const isAuth = require('./src/middlewares/isAuth');

const app = express();

const favouriteRouter = require('./src/routes/favouritePage.router');
const authRoutes = require('./src/routes/auth.routes');
const mainRouter = require('./src/routes/mainPage.router');
const recipeRouter = require('./src/routes/recipePage.router');

const { PORT = 3111, COOKIE_SECRET = 'secretik' } = process.env;

app.locals.title = 'CookBook';

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(ssr);
app.use(morgan('dev'));
app.use(express.json());
app.use(
  session({
    name: 'UserAuth',
    store: new FileStore(),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // false - только для http, true - только для https
      maxAge: 1000 * 60 * 60 * 24 * 2,
      httpOnly: true,
    },
  }),
);

app.use('/', mainRouter);
app.use('/login', authRoutes);
app.use(isAuth);
app.use('/recipe', recipeRouter);
app.use('/favourites', favouriteRouter);

app.get('*', (req, res) => {
  res.redirect('/');
})

dbCheck();
app.listen(PORT, (err) => {
  if (err) return console.log('Ошибка запуска сервера.', err.message);
  console.log(`🤖 Сервер запущен на http://localhost:${PORT}`);
});
