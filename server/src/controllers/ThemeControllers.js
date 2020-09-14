const {
  room,
  teacher,
  student,
  theme,
  subtheme,
  teacherTheme,
  teacherRoom,
  studentTheme
} = require('../models')

module.exports = {
  /* Get themes iteration */
  async index(req, res) {
    try {
      const { type, idNumber } = req.params
      const { page } = req.query
      const perPage = 6
      let auth
      let themes

      /* Check the type of user
       * And verify the idNumber
       * Then set the themes */
      if (type === 'teacher') {
        auth = await teacher.findByPk(idNumber)
        // FIXME countAll add 1 more item to themes, use All instead
        themes = await teacherTheme.findAndCountAll({
          where: { teacherIdNumber: idNumber },
          limit: perPage,
          offset: perPage * (page - 1),
          include: [{ model: theme, include: [{ model: subtheme }] }], //FIXED: including subtheme would create 1 invisible count
          order: [[theme, 'updatedAt', 'ASC']]
        })
      }

      if (type === 'student') {
        auth = await student.findByPk(idNumber)
        themes = await studentTheme.findAndCountAll({
          where: { studentIdNumber: idNumber },
          limit: perPage,
          offset: perPage * (page - 1),
          include: [{ model: theme, include: [{ model: subtheme }] }],
          order: [[theme, 'updatedAt', 'DESC']]
        })
      }

      /* Send error message if user is undefined */
      if (!auth) {
        return res.status(401).send({
          error: 'Tidak dapat mengenali kredensial anda. Coba lagi!'
        })
      }

      // Create new instances
      const countThemes = themes.count - 1 // FIXED
      const Themes = themes.rows.map((val) => {
        let theme = val.theme
        theme = {
          id: theme.id,
          name: theme.name,
          title: theme.title,
          background: theme.background,
          date: theme.updatedAt,
          subthemes: theme.subthemes.length // display subthemes length
        }

        return theme
      })

      /* Wrap the instances */
      const indexThemes = {
        themes: Themes,
        pagination: {
          totalThemes: countThemes,
          perPage: perPage,
          totalPage: Math.ceil(countThemes / perPage), // to the largest number
          currentPage: parseInt(page)
        }
      }

      /* Send the response */
      res.send(indexThemes)
    } catch (err) {
      res.send(err)
      console.log(err)
    }
  },

  /* View one theme */
  async view(req, res) {
    try {
      const { type, idNumber } = req.params
      const { themeId } = req.query
      let auth = null

      /* TODO: Check user credential */
      if (type === 'teacher') auth = await teacher.findByPk(idNumber)
      if (type === 'student') auth = await student.findByPk(idNumber)

      /* TODO: Send error when credential is undifiend */
      if (!auth) {
        return res.status(401).send({
          error: 'Tidak dapat mengenali kredensial anda. Coba lagi!'
        })
      }

      /* TODO: Get theme and send the response */
      const viewTheme = await theme.findByPk(themeId, {
        include: [{ model: subtheme }]
      })
      res.send(viewTheme)
    } catch (err) {
      res.send(err)
    }
  },

  /* TODO: Post new theme */
  async post(req, res) {
    try {
      const reqTheme = req.body
      const { teacherId } = req.params

      /* TODO:
       * Check if the user is teacher
       * Also get the roomId and schoolId */
      const checkTeacher = await teacher.findByPk(teacherId, {
        include: [
          {
            model: room,
            as: 'class',
            through: teacherRoom
          }
        ]
      })

      /* TODO: If it's not teacher, then send error */
      if (!checkTeacher) {
        return res.status(500).send({
          error: 'Anda tidak memiliki kuasa untuk menambah Tema'
        })
      }

      /* TODO: Create new instances */
      const roomId = checkTeacher.class[0].idNumber
      const schoolId = checkTeacher.schoolIdNumber

      /* TODO: Find student by roomId and schoolid using room model */
      const studentsList = await room.findByPk(roomId, {
        include: [{ model: student, where: { schoolIdNumber: schoolId } }]
      })

      /* TODO: Create the theme*/
      const themes = await theme.create(reqTheme) // For themes table`s

      /* TODO: Create teacherThemes */
      await teacherTheme.create({
        teacherIdNumber: teacherId,
        themeId: themes.id
      })

      /* TODO:
       * Get the studentIdNumber from studentsList
       * Then create the studentThemes for each student */
      const studentId = await studentsList.students.map((data) => data.idNumber)
      await studentId.forEach(async (id) => {
        await studentTheme.create({
          studentIdNumber: id,
          themeId: themes.id
        })
      })

      res.send(themes)
    } catch (err) {
      res.send(err)
    }
  }
}
