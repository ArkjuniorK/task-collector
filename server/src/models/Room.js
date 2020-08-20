module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('room', {
    idNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  })

  Room.associate = function (models) {
    Room.belongsToMany(models.school, {
      through: 'schoolRoom',
    })
    Room.belongsToMany(models.teacher, {
      through: 'teacherRoom',
    })
    Room.belongsToMany(models.student, {
      through: 'studentRoom',
    })
  }

  return Room
}
