module.exports = (sequelize, DataTypes) => {
  const StudentSubtheme = sequelize.define('studentSubtheme')

  StudentSubtheme.associate = function (models) {
    StudentSubtheme.belongsTo(models.student)
    StudentSubtheme.belongsTo(models.subtheme)
  }

  return StudentSubtheme
}
