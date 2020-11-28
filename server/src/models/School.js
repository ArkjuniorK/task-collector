module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('school', {
    idNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  })

  School.associate = function (models) {
    School.belongsToMany(models.room, {
      through: 'schoolRoom'
    })
    School.hasMany(models.teacher, {
      foreignKey: 'schoolIdNumber',
      sourceKey: 'idNumber'
      /*
        using 'as' in has many means
        that when you include the table
        you should write the field name
        ex: 'guru' instead of teachers
      */
      // as: 'guru',
    })
    School.hasMany(models.student, {
      foreignKey: 'schoolIdNumber',
      sourceKey: 'idNumber'
    })
  }

  return School
}
