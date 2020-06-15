module.exports = (sequelize, DataTypes) => {
  const StudentsRoom = sequelize.define('studentRoom')

  StudentsRoom.associate = function (models) {
    StudentsRoom.belongsTo(models.student)
    StudentsRoom.belongsTo(models.room)
  }

  return StudentsRoom
}
