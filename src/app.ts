import createError, { HttpError } from 'http-errors';
import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import 'dotenv/config';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app: Express = express();

// set up mongoose connection
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI || process.env.dev_db_url;

main().catch((err: HttpError) => console.log(err));
async function main() {
  if (mongoDB) {
    await mongoose.connect(mongoDB);
  }
}

// view engine setup
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
