const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');

const indexRouter = require('./routes/index.route');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// use router
app.use('/', indexRouter);

// mongodb connection
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/breaddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
})
.then(() => console.log('DB connected successfully'))
.catch((err) => console.error(err))

module.exports = app;
