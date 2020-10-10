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
      let { type, idNumber } = req.params
      const { page } = req.query
      const perPage = 6
      let userType, userTheme

      let options = {
        include: [{ model: theme, include: [{ model: subtheme }] }],
        order: [['createdAt', 'DESC']], // order correctly by removing theme model
        limit: perPage,
        offset: perPage * (page - 1)
      }

      // type recognition
      if (type === 'teacher') {
        userType = teacher
        userTheme = teacherTheme
        options.where = { teacherIdNumber: idNumber }
      } else if (type === 'student') {
        userType = student
        userTheme = studentTheme
        options.where = { studentIdNumber: idNumber }
      } else {
        return res.status(401).send({
          error: 'Terjadi kesalahan!'
        })
      }

      /* Check user */
      const auth = await userType.findByPk(idNumber)
      if (!auth) {
        return res.status(401).send({
          error: 'Tidak dapat mengenali kredensial anda. Coba lagi!'
        })
      }

      /* Find Themes */
      const themes = await userTheme.findAndCountAll(options)

      // Create new instances
      const countThemes = themes.count - 1
      const Themes = themes.rows.map((val) => {
        let theme = val.theme
        theme = {
          id: theme.id,
          name: theme.name,
          title: theme.title,
          background: theme.background,
          date: theme.createdAt,
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
    }
  },

  /* View one theme */
  async view(req, res) {
    try {
      const { type, idNumber } = req.params
      const { id } = req.query
      let auth

      /* Check user credential */
      if (type === 'teacher') auth = await teacher.findByPk(idNumber)
      if (type === 'student') auth = await student.findByPk(idNumber)

      /* Send error when credential is undifiend */
      if (!auth) {
        return res.status(401).send({
          error: 'Tidak dapat mengenali kredensial anda. Coba lagi!'
        })
      }

      /* Get theme and send the response */
      const viewTheme = await theme.findByPk(id, {
        include: [{ model: subtheme, include: ['tasks'] }]
      })

      res.send(viewTheme)
    } catch (err) {
      res.send(err)
    }
  },

  // Post new theme
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

      // If it's not teacher, then send error
      if (!checkTeacher) {
        return res.status(500).send({
          error: 'Tidak mengenali Nomor Induk anda, coba lagi'
        })
      }

      // Create new instances
      const roomId = checkTeacher.class[0].idNumber
      const schoolId = checkTeacher.schoolIdNumber

      /* Find student by roomId and schoolid using room model */
      const studentsList = await room.findByPk(roomId, {
        include: [{ model: student, where: { schoolIdNumber: schoolId } }]
      })

      /* Create the theme*/
      const themes = await theme.create(reqTheme) // For themes table`s

      /* Create teacherThemes */
      await teacherTheme.create({
        teacherIdNumber: teacherId,
        themeId: themes.id
      })

      /* Get the studentIdNumber from studentsList
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
  },
  async list(req, res) {
    try {
      const teacherId = req.params.teacherId
      const auth = await teacher.findByPk(teacherId)
      if (!auth) {
        return res.status(401).send({
          error: 'Masalah Otentifikasi'
        })
      }

      const themes = await teacherTheme
        .findAll({
          where: { teacherIdNumber: teacherId },
          order: [['createdAt', 'DESC']],
          include: [{ model: theme, attributes: ['id', 'name', 'title'] }]
        })
        .map((val) => val.theme)

      res.send(themes)
    } catch (e) {
      res.send(e)
    }
  }
}
