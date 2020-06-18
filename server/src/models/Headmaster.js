const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashing(user, options) {
  const saltRound = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt.genSaltAsync(saltRound).then((salt) => {
    bcrypt.hashAsync(user.password, salt, null).then((hash) => {
      user.setDataValue('password', hash)
    })
  })
}

module.exports = (sequelize, DataTypes) => {
  const Headmaster = sequelize.define(
    'headmaster',
    {
      idNumber: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: hashing,
        // beforeCreate: hashing,
        beforeUpdate: hashing,
        // beforeSave: hashing,
      },
    }
  )

  Headmaster.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return Headmaster
}
