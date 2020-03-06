var express = require("express");
var router = express.Router();

module.exports = pool => {
  /* GET home page. */
  router.get("/", function(req, res, next) {
    const sql = `SELECT * FROM data`;
    pool.query(sql, (err, item) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ item: item.rows });
    });
  });

  return router;
};
