module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('theme', {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    background: DataTypes.STRING,
  })

  Theme.associate = function (models) {
    Theme.belongsToMany(models.teacher, {
      through: 'teacherTheme',
    })
    Theme.belongsToMany(models.student, {
      through: 'studentTheme',
    })
    /* XXX Create hasMany association so it can included XXX */
    Theme.hasMany(models.subtheme)
  }

  return Theme
}
