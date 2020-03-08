var express = require("express");
var router = express.Router();
let title = 'BREAD (Browse, Read, Edit, Add, Delete)';

router.get("/", (req, res, next) => {
    res.render("index", { title });
});

router.get("/add", (req, res, next) => {
    res.render("add", { title });
});

router.get("/edit:id", (req, res, next) => {
    res.render("add", { title });
});

module.exports = router;
