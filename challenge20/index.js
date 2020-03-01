const express = require('express');
const port = 3000;
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db_name = path.join(__dirname, 'data', 'bread.db');
const db = new sqlite3.Database(db_name, err => {
    if (err) throw err;

    console.log(`Successful connection to the database 'bread.db'`)
});

const app = express();

app.use('/', express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    db.serialize(() => {
        let sql = `SELECT * FROM data`;
        db.all(sql, (err, row) => {
            if (err) throw err;

            res.render('index', { row });
        })
    })
});

app.listen(port, () => console.log(`This app working on port ${port}!`));