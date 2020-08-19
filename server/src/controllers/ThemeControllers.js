const {
  room,
  teacher,
  student,
  theme,
  subtheme,
  teacherTheme,
  teacherRoom,
  studentTheme,
} = require('../models')

module.exports = {
  /* TODO: Get themes iteration */
  async index(req, res) {
    try {
      const { type, idNumber, page } = req.params
      const perPage = 12
      let themes = null

      /* TODO: check the type of user  */
      if (type === 'teacher') {
        themes = await teacherTheme.findAndCountAll({
          where: { teacherIdNumber: idNumber },
          limit: perPage,
          offset: perPage * (page - 1),
          /* TODO: include themes and their subthemes*/
          include: [{ model: theme, include: [{ model: subtheme }] }],
          order: [[theme, 'updatedAt', 'DESC']],
        })
      }

      if (type === 'student') {
        themes = await studentTheme.findAndCountAll({
          where: { studentIdNumber: idNumber },
          limit: perPage,
          offset: perPage * (page - 1),
          /* TODO: include themes and their subthemes*/
          include: [{ model: theme, include: [{ model: subtheme }] }],
          order: [[theme, 'updatedAt', 'DESC']],
        })
      }

      /* TODO: Create new instances  */
      const countThemes = themes.count
      const Themes = themes.rows.map((val) => {
        const theme = val.theme
        const instances = {
          idNumber: theme.idNumber,
          name: theme.name,
          title: theme.title,
          background: theme.background,
          date: theme.updatedAt,
          subthemes: theme.subthemes.length, // display subthemes length
        }

        return instances
      })
      const pageThemes = parseInt(page) //invert string to number

      /* TODO: Wrap the instances */
      const indexThemes = {
        themes: Themes,
        pagination: {
          totalThemes: countThemes,
          perPage: perPage,
          totalPage: Math.ceil(countThemes / perPage),
          currentPage: pageThemes,
        },
      }

      /* TODO: Send the response */
      res.send(indexThemes)
    } catch (err) {
      console.log('Error:', err)
    }
  },
  /* TODO: Post new theme */
  async post(req, res) {
    try {
      const { name, title } = req.body
      const { type, teacherId } = req.params
      let checkTeacher = null

      /* TODO:
       * Check if the user is teacher
       * Also get the roomId and schoolId */
      if (type === 'teacher') {
        checkTeacher = await teacher.findByPk(teacherId, {
          include: [
            {
              model: room,
              as: 'class',
              through: teacherRoom,
            },
          ],
        })
      } else {
        res.status(500).send({
          error: 'Anda tidak memiliki kuasa untuk menambah Tema',
        })
      }

      /* TODO: Create new instances */
      const roomId = checkTeacher.class[0].idNumber
      const schoolId = checkTeacher.schoolIdNumber

      console.log('Room:', roomId)
      console.log('Room:', roomId)

      /* TODO: Find student by roomId and schoolid using room model */
      /* const checkStudents = await room.findByPk(roomId, {
        include: [{ model: student, where: { schoolIdNumber: schoolId } }],
      }) */

      /* const checkStudents = await room.findByPk(roomId) */

      /* TODO: Create the theme*/
      res.send(checkStudents)
    } catch (err) {
      res.status(500).send({
        error: err,
      })
      console.log(err)
    }
  },
}
