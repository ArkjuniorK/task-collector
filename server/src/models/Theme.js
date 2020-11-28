module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('theme', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      onDelete: 'CASCADE'
    },
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    background: DataTypes.STRING
  })

  Theme.associate = function (models) {
    Theme.belongsToMany(models.teacher, {
      through: 'teacherTheme',
      foreingKey: 'themeId',
      onDelete: 'CASCADE'
    })
    Theme.belongsToMany(models.student, {
      through: 'studentTheme'
    })
    Theme.hasMany(models.subtheme)
  }

  return Theme
}
