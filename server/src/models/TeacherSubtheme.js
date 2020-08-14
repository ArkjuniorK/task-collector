module.exports = (sequelize, DataTypes) => {
  const TeacherSubtheme = sequelize.define('teacherSubtheme')

  TeacherSubtheme.associate = function (models) {
    TeacherSubtheme.belongsTo(models.teacher)
    TeacherSubtheme.belongsTo(models.subtheme)
  }

  return TeacherSubtheme
}
