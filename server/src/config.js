module.exports = {
  port: 8081,
  db: {
    database: process.env.DB_NAME || 'task_controller',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: '../db.sqlite',
    },
  },
  jwtSecret: process.env.JWT_SECRET || 'roomtaskcontroller',
}
