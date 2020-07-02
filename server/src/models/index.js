const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')
const db = {}

// create new instance
// on mysql the databse should be
// created manually
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options,
  { query: { raw: true } }
)

// create the table based on
// every model in models folder
// except index.js
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

// find the associate instance on every models
Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
