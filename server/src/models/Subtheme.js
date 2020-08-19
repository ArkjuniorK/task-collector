module.exports = (sequelize, DataTypes) => {
  const Subtheme = sequelize.define('subtheme', {
    idNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    background: DataTypes.STRING,
  })

  Subtheme.associate = function (models) {
    Subtheme.belongsToMany(models.teacher, {
      through: 'teacherSubtheme',
    })
    Subtheme.belongsToMany(models.student, {
      through: 'studentSubtheme',
    })
    Subtheme.belongsTo(models.theme)
  }

  return Subtheme
}
