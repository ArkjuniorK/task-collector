const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path') // path
const history = require('connect-history-api-fallback')
const { sequelize } = require('./models')

const config = require('./config')

const app = express()
// app.use(history()) // added

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../../client/dist'))) // <-- added

/*
 *
 * ----- HOW IT IS WORK -----
 *
 *
 * when the app is load, it will find the app.js
 * then it will load all the script from top of the line till end
 * let's say the app begin it's cycle from the app.use(morgan)
 *
 * then it should be work like
 *
 * -> app.use is defnine the all the plugin that is needed
 * -> then it will search for passport.js for auth, it'll skip that if we dont use auth
 * -> next the app would pass all the data into the routes.js and route work with the controllers
 * -> finally the sequelize will start it sync and listen from config.port that we have defined
 */

/* passport for the user */
require('./passport')

// api routes and the rest
require('./routes')(app)

sequelize.sync({ force: false }).then(() => {
  app.listen(config.port)
  console.log(`Running On ${config.port}`)
})
