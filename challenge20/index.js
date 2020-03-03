const express = require('express');
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db_name = path.join(__dirname, 'data', 'bread.db');
let db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    };
    console.log(`Successful connection to the database 'bread.db'`)
});

const app = express();

// server configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    let result = [];
    let filterData = false;

    if (req.query.check_id && req.query.id) {
        result.push(`id = ${req.query.id}`);
        filterData = true;
    };

    let sql = `SELECT * FROM data`;
    if (filterData) {
        sql = sql + ` WHERE ${result.join(' AND ')}`;
        console.log(sql);
    };
    db.all(sql, (err, row) => {
        if (err) {
            return console.error(err.message);
        };
        res.render('index', {
            data: row,
            query: req.query
        });
    });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const sql = `INSERT INTO data (string, integer, float, date, boolean) VALUES (?, ?, ?, ?, ?)`;
    const input = [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean];

    db.run(sql, input, err => {
        if (err) {
            return console.error(err.message);
        };
    });
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM data WHERE id = ?`;

    db.get(sql, id, (err, row) => {
        if (err) {
            return console.error(err.message);
        };
        res.render('edit', {item:row});
    });
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const {string, integer, float, date, boolean} = req.body;
    const sql = `UPDATE data SET string = '${string}', integer = '${integer}', float = '${float}', date = '${date}', boolean = '${boolean}' WHERE id = ${id}`;

    db.run(sql, err => {
        if (err) {
            return console.error(err.message);
        };
        res.redirect('/');
    });
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM data WHERE id = ${id}`;

    db.run(sql, err => {
        if (err) {
            console.error(err.message);
        };
        res.redirect('/');
    });
});

app.listen(port, () => console.log(`This app working on port ${port}!`));