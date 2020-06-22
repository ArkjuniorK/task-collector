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
  // define table's name and field
  const Teacher = sequelize.define(
    'teacher',
    {
      idNumber: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      status: DataTypes.STRING,
      age: DataTypes.INTEGER,
      securityKey: DataTypes.STRING,
    },
    {
      hooks: {
        beforeUpdate: hashKey,
        beforeSave: hashKey,
      },
    }
  )

  Teacher.prototype.compareKey = function (securityKey) {
    return bcrypt.compareAsync(securityKey, this.securityKey)
  }

  // define the table's association
  Teacher.associate = function (models) {
    Teacher.belongsTo(models.school, {
      /*
        using belongsTo would make new field
        from the foreignKey target table
        ex: this will generate schoolIdNumber field
        where school => name of the model
        and primaryId => foreignKey from the model
      */
      foreignKey: 'schoolIdNumber',
      targetKey: 'idNumber',
      /*
        ==> as is used to replace the name in belongsTo
        association. ex: field 'schoolIdNumber' would
        become 'teacherSchoolPrimaryId'
        
        ==> but it will double the field if the 
        target model create 1:n association with the 
        source so the 'schoolIdNumber' will still exists same with the 'teacherSchoolPrimaryId'
      */
      // constraints: false,
    })
    Teacher.hasMany(models.student, {
      foreignKey: 'teacherIdNumber',
      sourceKey: 'idNumber',
    })
    Teacher.belongsToMany(models.room, {
      through: 'teacherRoom',
      as: 'class',
    })
    Teacher.belongsToMany(models.task, {
      through: 'teacherTask',
    })
  }

  return Teacher
}
