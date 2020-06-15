module.exports = (sequelize, DataTypes) => {
  const TeachersRoom = sequelize.define('teacherRoom')

  TeachersRoom.associate = function (models) {
    TeachersRoom.belongsTo(models.teacher)
    TeachersRoom.belongsTo(models.room)
  }

  return TeachersRoom
}
