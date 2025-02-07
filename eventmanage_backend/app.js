const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = require('./route')
const cors = require('cors')
require('dotenv').config()
let URL=process.env.DB_URL

mongoose.connect(URL, (err) => {
    if (err) console.log(err)
    else console.log("Mongo connected")
  })


const corsOptions = {
    origin: '*',
    Credentials: true,
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions))
app.use(express.json())
app.use("/api", route);

app.listen(process.env.PORT, (err) => {
    if (err) console.log(err)
    else console.log("server connected")
  })


  module.exports = app