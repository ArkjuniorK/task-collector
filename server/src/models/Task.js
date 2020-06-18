module.exports = (sequelize, DataTypes) => {
  // define table's name and field
  const Task = sequelize.define('task', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   unique: true,
    //   autoIncrement: true,
    // },
    name: DataTypes.STRING,
    date: DataTypes.DATE(6),
    questions: DataTypes.JSON,
    references: DataTypes.JSON,
  })

  // defined association
  Task.associate = function (models) {
    Task.belongsToMany(models.student, {
      through: 'studentTask',
    })
    Task.belongsToMany(models.teacher, {
      through: 'teacherTask',
    })
    Task.belongsTo(models.subject)
  }

  return Task
}
