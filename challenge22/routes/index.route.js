const express = require('express');
const router = express.Router();
const dataController = require('../controller/index.controller');
const title = 'BREAD (Browse, Read, Edit, Add, Delete)';


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title });
});

router.get("/add", (req, res, next) => {
  res.render("add", { title });
});

router.get('/api', dataController.getData);
router.get('/api/:id', dataController.getById);
router.post('/api', dataController.addData);
router.put('/api/:id', dataController.editData);
router.delete('/api/:id', dataController.deleteData);

module.exports = router;
