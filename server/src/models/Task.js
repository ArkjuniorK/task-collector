module.exports = (sequelize, DataTypes) => {
  // define table's name and field
  const Task = sequelize.define('task', {
    name: DataTypes.STRING,
    date: DataTypes.DATE(6),
    questions: DataTypes.JSON,
    references: DataTypes.JSON,
    background: DataTypes.STRING
  })

  // defined association
  Task.associate = function (models) {
    Task.belongsTo(models.subject)
    Task.belongsTo(models.subtheme, {
      foreignKey: 'subthemeId',
      onDelete: 'CASCADE'
    })
    Task.belongsToMany(models.student, {
      through: 'studentTask'
    })
    Task.belongsToMany(models.teacher, {
      through: 'teacherTask'
    })
  }

  return Task
}
