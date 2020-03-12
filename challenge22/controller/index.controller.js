const moment = require('moment');
const dataModels = require('../models/index.models');
moment.locale('id');

const getData = (req, res) => {
  // logic filter
  let querySearch = {}

  if (req.query.check_string && req.query.string) {
      querySearch.string = req.query.string
  };
  if (req.query.check_integer && req.query.integer) {
    querySearch.integer = req.query.integer
  };
  if (req.query.check_float && req.query.float) {
    querySearch.float = req.query.float
  };
  if (req.query.check_date) {
    querySearch.date = {$gte: req.query.startDate, $lte: req.query.endDate}
  };
  if (req.query.check_boolean && req.query.boolean) {
    querySearch.boolean = req.query.boolean
  };

  // pagination
  const page = req.query.page || 1;
  const limit = 3;
  const offset = (page - 1) * limit;
  const url = req.url === '/' ? '/?page=1' : req.url;

  dataModels.find(querySearch, (err, data) => {
    let totalData = data.length;
    dataModels.find(querySearch, (err, data) => {
      if (err) {
        console.error(err.message);
      };
      res.json({
        result: data,
        url,
        page,
        pages: Math.ceil(totalData / limit),
        query: req.query
      });
    })
    .skip(offset).limit(limit);
  });
};

const getById = (req, res) => {
  dataModels.findById(req.params.id, (err, data) => {
    if (err) {
      console.error(err.message);
    };
    res.json({
      result: data
    })
  });
};

const addData = (req, res) => {
  dataModels.create(req.body, (err, post) => {
    if (err) {
      console.error(err.message);
    };
    res.json(post);
  });
};

const editData = (req, res) => {
  dataModels.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) {
      console.error(err.message);
    };
    res.json(post);
  });
};

const deleteData = (req, res) => {
  dataModels.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) {
      console.error(err.message);
    };
    res.json(post);
  });

};

module.exports = {
  getData,
  addData,
  getById,
  editData,
  deleteData
};