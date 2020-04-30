const express = require('express')
const router =  express.Router()

require('./routes/standup')(router)
require('./routes/employee')(router)
require('./routes/product')(router)

module.exports = router