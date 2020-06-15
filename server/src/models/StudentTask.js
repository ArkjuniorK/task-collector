module.exports = (sequelize, DataTypes) => {
  const StudentsTask = sequelize.define('studentTask')

  StudentsTask.associate = function (models) {
    StudentsTask.belongsTo(models.student)
    StudentsTask.belongsTo(models.task)
  }

  return StudentsTask
}
