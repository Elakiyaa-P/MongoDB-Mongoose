const express = require('express')
const app = express()
const api = require('./api')
const morgan = require('morgan')    //morgan is a module used to logging (logger)
const bodyParser = require('body-parser')
const cors = require('cors')

app.set('port', (process.env.PORT || 5118))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

app.use('/api', api)
app.use(express.static('static'))   //expose public folder

app.use(morgan('dev'))

app.use(function (req, res) {
    const err = new Error('not found')
    err.status = 404
    res.json(err)
})

//Mongo Connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/standupDatabase', { useNewUrlParser: true })
mongoose.connect('mongodb://localhost:27017/EmployeeDatabase', { useNewUrlParser: true })
mongoose.connect('mongodb://localhost:27017/ProductDatabase', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))  // error event

db.once('open', function () {
    console.log('Connected to MongoDB')

    app.listen(app.get('port'), function () {
        console.log('API Server Listening on port ' + app.get('port') + '!')
    })

})

//Use the following Link in the postman canary:
//http://localhost:5118/api/standup