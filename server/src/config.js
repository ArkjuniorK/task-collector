module.exports = {
  port: 8081,
  db: {
    database: process.env.DB_NAME || 'dbtesting',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      operatorAliasrses: false,
    },
  },
}
