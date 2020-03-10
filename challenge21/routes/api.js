var express = require("express");
var router = express.Router();

module.exports = pool => {

  /* GET home page. */
  router.get("/", function(req, res, next) {
    const sqlGet = `SELECT * FROM data ORDER BY id`;

    // pagination
    // const limit = 5;
    // const currentPage = parseInt(req.query.page) || 1;
    // const offset = parseInt(currentPage - 1) * limit;

    pool.query(sqlGet, (err, data) => {
      if (err) {
        throw err;
      };
      res.status(200).json({ data: data.rows });
    });
  });

  router.get("/:id", (req, res, next) => {
    const sqlGetById = `SELECT * FROM data WHERE id = $1`;
    const id = [req.params.id];
    pool.query(sqlGetById, id, (err, data) => {
      if (err) {
        throw err;
      };
      res.status(200).json({ data: data.rows });
    });
  });

  router.post("/", (req, res, next) => {
    const { string, integer, float, date, boolean } = req.body;
    const sqlAdd = `INSERT INTO data (string, integer, float, date, boolean) VALUES ($1, $2, $3, $4, $5)`;
    const input = [string, integer, float, date, boolean];
    pool.query(sqlAdd, input, (err, data) => {
      if (err) {
        throw err;
      };
      res.status(201).json({
        string: string,
        integer: integer,
        float: float,
        date: date,
        boolean: boolean
      });
    });
  });

  router.put('/:id', (req, res, next) => {
    pool.query(`UPDATE data SET string = $2 , integer = $3 , float = $4, date = $5 , boolean = $6 WHERE id = $1`,
      [req.params.id, req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean], (err, data) => {
        if (err) return res.send(err);
        res.json(data);
      });
  });

  router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    const sqlDelete = `DELETE FROM data WHERE id = ${id}`;
    pool.query(sqlDelete, (err) => {
      if (err) {
        throw err;
      };
      res.status(201).json({
        id,
      });
    });
  });

  return router;
};
