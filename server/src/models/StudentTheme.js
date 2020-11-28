module.exports = (sequelize, DataTypes) => {
  const StudentTheme = sequelize.define('studentTheme')

  StudentTheme.associate = function (models) {
    StudentTheme.belongsTo(models.student, {
      foreignKey: 'studentIdNumber',
      onDelete: 'CASCADE'
    })
    StudentTheme.belongsTo(models.theme, {
      foreignKey: 'themeId',
      onDelete: 'CASCADE'
    })
  }

  return StudentTheme
}
