const express = require('express')
const app = express()
var path = require('path');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {data: 'data'})
})

app.listen(3000)