module.exports = (sequelize, DataTypes) => {
  const teacherTask = sequelize.define('teacherTask')

  teacherTask.associate = function (models) {
    teacherTask.belongsTo(models.teacher)
    teacherTask.belongsTo(models.task)
  }

  return teacherTask
}
