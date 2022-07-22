const express = require('express')
const app = express()
path = require('path')
const port = 3000
const mongoose = require('mongoose')
const linkRoute = require('./routes/linkeroutes')


//conectar ao banco e acessar
mongoose.connect('mongodb://localhost/newlinks')

let db = mongoose.connection;

db.on("error", () => {console.log("houve um error")});
db.once("open", () =>{ console.log("Banco carregado")})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.use('/', linkRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}`))