// const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'room',
    user: process.env.DB_USER || 'postgres', // for postgres default user
    password: process.env.DB_PASSWORD || '12345678', // require password for postgres user
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 5432
      // storage: path.resolve(__dirname, '../db.sqlite')
    }
  },
  jwtSecret: process.env.JWT_SECRET || 'roomtaskcontroller'
}
