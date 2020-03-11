const moment = require('moment');
const dataModels = require('../models/index.models');
moment.locale('id');

const getData = (res, data) => {
  res.json({
    result: data
  });
};

module.exports = {
  getData
};