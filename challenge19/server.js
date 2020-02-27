const express = require('express')
const app = express()
var path = require('path');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {data: 'data'})
})

app.get('/add', function (req, res) {
  res.render('add', {data: 'data'})
})

app.get('/edit', function (req, res) {
  res.render('edit' , {data: 'data'})
})

app.listen(3000)