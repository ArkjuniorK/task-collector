module.exports = (sequelize, DataTypes) => {
  const Subtheme = sequelize.define('subtheme', {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    background: DataTypes.STRING
  })

  Subtheme.associate = function (models) {
    Subtheme.belongsToMany(models.teacher, {
      through: 'teacherSubtheme'
    })
    Subtheme.belongsToMany(models.student, {
      through: 'studentSubtheme'
    })
    Subtheme.belongsTo(models.theme, {
      foreignKey: 'themeId',
      onDelete: 'CASCADE'
    })
    Subtheme.hasMany(models.task)
  }

  return Subtheme
}
