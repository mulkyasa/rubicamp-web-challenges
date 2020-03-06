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

  router.post("/", function(req, res, next) {
    const { string, integer, float, date, boolean } = req.body;
    const sql = `INSERT INTO data (string, integer, float, date, boolean) VALUES ('${string}', '${integer}', '${float}', '${date}', '${boolean}')`;
    pool.query(sql, (err, item) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ item: item.rows });
    });
  });

  router.put("/:id", function(req, res, next) {
    const id = req.params.id;
    const { string, integer, float, date, boolean } = req.body;
    const sql = `UPDATE data SET string = '${string}', integer = '${integer}', float = '${float}', date = '${date}', boolean = '${boolean}' WHERE id = ${id}`;
    pool.query(sql, (err, item) => {
      if (err) {
        throw err;
      };
      res.status(201).json({ item: item.rows });
    });
  });

  return router;
};
