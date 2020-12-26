const express = require('express')
const path = require('path')
const mysql = require('mysql')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config({ path: './.env' })

const app = express()

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
})

db.connect( (error) => {
  if(error) console.log(error)
  else console.log("DATABASE connected...")
})
// const publicDirectory = path.join(__dirname, './public')
app.use(express.static("public"))

//grab the data from any forms
app.use(express.urlencoded({ extended: false }))
// parse json bodies 
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'hbs')


//define routes
// requiring index routes
app.use('/', require('./routes/pages')) 

app.use('/auth', require('./routes/auth'))

.listen(2000, () => {
  console.log('servidor iniciado/reiniciado...')
})