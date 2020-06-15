module.exports = (sequelize, DataTypes) => {
  // define the table and field
  const Student = sequelize.define('student', {
    idNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
  })

  // define the association
  Student.associate = function (models) {
    Student.belongsTo(models.school)
    Student.belongsToMany(models.room, {
      through: 'studentRoom',
    })
    Student.belongsToMany(models.task, {
      through: 'studentTask',
    })
    Student.belongsTo(models.teacher, {
      foreignKey: 'teacherIdNumber',
      targetKey: 'idNumber',
    })
  }

  return Student
}
