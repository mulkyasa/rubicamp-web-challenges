const express = require('express');
const path = require('path');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const writeData = fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
const app = express();
var bodyParser = require('body-parser');

// parse json
app.use('/', express.static(path.join(__dirname, 'views')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render('index', {data:data})
})

app.get('/add', function (req, res) {
  res.render('add')
})

app.get('/edit', function (req, res) {
  res.render('edit')
})

app.listen(8000, () => {
  console.log('This web working on port 8000')
});