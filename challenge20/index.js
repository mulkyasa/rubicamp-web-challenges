const express = require('express');
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db_name = path.join(__dirname, 'data', 'bread.db');
let db = new sqlite3.Database(db_name, err => {
    if (err) throw err;

    console.log(`Successful connection to the database 'bread.db'`)
});

const app = express();

app.use('/', express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const sql = `SELECT * FROM data`;
    db.all(sql, (err, row) => {
        if (err) throw err;

        res.render('index', {row});
    });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const sql = `INSERT INTO data (string, integer, float, date, boolean) VALUES (?, ?, ?, ?, ?)`;
    const {string, integer, float, date, boolean} = req.body;

    db.run(sql, req.body, err => {
        if (err) throw err;

        res.redirect('/');
    });
});

app.listen(port, () => console.log(`This app working on port ${port}!`));