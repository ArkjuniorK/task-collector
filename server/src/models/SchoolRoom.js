module.exports = (sequelize, DataTypes) => {
  const SchoolsRoom = sequelize.define('schoolRoom')

  SchoolsRoom.associate = function (models) {
    SchoolsRoom.belongsTo(models.school)
    SchoolsRoom.belongsTo(models.room)
  }

  return SchoolsRoom
}
