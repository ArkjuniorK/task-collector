module.exports = (sequelize, DataTypes) => {
  const TeacherTheme = sequelize.define('teacherTheme')

  TeacherTheme.associate = function (models) {
    TeacherTheme.belongsTo(models.teacher)
    TeacherTheme.belongsTo(models.theme, {
      foreignKey: 'themeId',
      onDelete: 'CASCADE'
    })
  }

  return TeacherTheme
}
