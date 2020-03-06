var express = require("express");
var router = express.Router();

module.exports = pool => {
  /* GET home page. */
  router.get("/", function(req, res, next) {
    const sqlGet = `SELECT * FROM data`;
    pool.query(sqlGet, (err, item) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ item: item.rows });
    });
  });

  router.post("/", function(req, res, next) {
    const { string, integer, float, date, boolean } = req.body;
    const sqlAdd = `INSERT INTO data (string, integer, float, date, boolean) VALUES ('${string}', '${integer}', '${float}', '${date}', '${boolean}')`;
    pool.query(sqlAdd, (err, item) => {
      if (err) {
        throw err;
      }
      res.status(201).json({
        string: string,
        integer: integer,
        float: float,
        date: date,
        boolean: boolean
      });
    });
  });

  router.put("/:id", function(req, res, next) {
    const id = req.params.id;
    const { string, integer, float, date, boolean } = req.body;
    const sqlEdit = `UPDATE data SET string = '${string}', integer = '${integer}', float = '${float}', date = '${date}', boolean = '${boolean}' WHERE id = ${id}`;
    pool.query(sqlEdit, (err, item) => {
      if (err) {
        throw err;
      };
      res.status(201).json({ item: item.rows });
    });
  });

  router.delete("/:id", function(req, res, next) {
    const id = req.params.id;
    const sqlDelete = `DELETE FROM data WHERE id = ${id}`;
    pool.query(sqlDelete, (err) => {
      if (err) {
        throw err;
      };
      res.status(201).json({
        id
      });
    });
  });

  return router;
};
