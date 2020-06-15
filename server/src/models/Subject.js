module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('subject', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  })

  Subject.associate = function (models) {
    Subject.hasMany(models.task)
  }

  return Subject
}
