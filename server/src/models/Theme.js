module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('theme', {
    idNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    background: DataTypes.STRING,
  })

  Theme.associate = function (models) {
    Theme.belongsToMany(models.teacher, {
      through: 'teacherTheme',
    })
    Theme.belongsToMany(models.student, {
      through: 'studentTheme',
    })
  }

  return Theme
}
