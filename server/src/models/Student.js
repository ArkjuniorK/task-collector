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
  // TODO: define columns and table`s function
  const Student = sequelize.define(
    'student',
    {
      idNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      frontName: DataTypes.STRING,
      backName: DataTypes.STRING,
      gender: DataTypes.STRING,
      born: DataTypes.STRING,
      securityKey: DataTypes.STRING
    },
    {
      hooks: {
        beforeSave: hashKey
      }
    }
  )

  // TODO: Verify password
  Student.prototype.compareKey = function (securityKey) {
    return bcrypt.compareAsync(securityKey, this.securityKey)
  }

  // TODO: Define association
  Student.associate = function (models) {
    Student.belongsTo(models.school, {
      foreignKey: 'schoolIdNumber',
      targetKey: 'idNumber'
    })
    Student.belongsToMany(models.room, {
      through: 'studentRoom',
      as: 'class'
    })
    Student.belongsToMany(models.theme, { through: 'studentTheme' })
    Student.belongsToMany(models.subtheme, { through: 'studentSubtheme' })
    Student.belongsToMany(models.task, { through: 'studentTask' })
  }

  return Student
}
