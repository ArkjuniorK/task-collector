const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashKey(user, options) {
  const saltRound = 8

  if (!user.changed('securityKey')) {
    return
  }

  return bcrypt.genSaltAsync(saltRound).then((salt) => {
    bcrypt.hashAsync(user.securityKey, salt, null).then((hash) => {
      user.setDataValue('securityKey', hash)
    })
  })
}

module.exports = (sequelize, DataTypes) => {
  // define the table and field
  const Student = sequelize.define(
    'student',
    {
      idNumber: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      frontName: DataTypes.STRING,
      backName: DataTypes.STRING,
      gender: DataTypes.STRING,
      born: DataTypes.STRING,
      securityKey: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: hashKey,
      },
    }
  )

  Student.prototype.compareKey = function (securityKey) {
    return bcrypt.compareAsync(securityKey, this.securityKey)
  }

  // define the association
  Student.associate = function (models) {
    Student.belongsTo(models.school)
    Student.belongsToMany(models.room, {
      through: 'studentRoom',
      as: 'class',
    })
    Student.belongsToMany(models.task, {
      through: 'studentTask',
    })
  }

  return Student
}
