module.exports = (sequelize, DataTypes) => {
  const StudentTheme = sequelize.define('studentTheme')

  StudentTheme.associate = function (models) {
    StudentTheme.belongsTo(models.student)
    StudentTheme.belongsTo(models.theme)
  }

  return StudentTheme
}
