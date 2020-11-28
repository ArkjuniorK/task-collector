'use strict'

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

const serverErr = { error: 'Terjadi kesalahan pada server!' }
const authErr = { error: 'Pastikan kredensial kamu cocok!' }

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
      if (!auth) return res.status(401).send(authErr)

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
      console.log(err)
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
      if (!auth) return res.status(401).send(authErr)

      /* Get theme and send the response */
      const viewTheme = await theme.findByPk(id, {
        include: [{ model: subtheme, include: ['tasks'] }]
      })

      res.send(viewTheme)
    } catch (err) {
      res.send(err)
      console.log(err)
    }
  },

  // Post new theme
  async post(req, res) {
    try {
      const reqTheme = req.body
      const { teacherId } = req.params

      if (teacherId == undefined) return res.status(403).send(authErr)

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
      if (!checkTeacher) return res.status(401).send(authErr)

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
      studentId.forEach(async (id) => {
        await studentTheme.create({
          studentIdNumber: id,
          themeId: themes.id
        })
      })

      res.status(200).send({
        success: 'Tema telah berhasil ditambahkan!',
        theme: themes
      })
    } catch (err) {
      res.status(500).send(serverErr)
      console.log(err)
    }
  },

  // Deleting theme
  async remove(req, res) {
    try {
      const { teacherId, themeId } = req.query

      // Auth check
      const auth = await teacher.findByPk(teacherId)
      if (!auth) return authFalse(res)

      // Delete the data
      // Need to delete 2 tables
      const destroy = await teacherTheme.destroy({
        where: { teacherIdNumber: teacherId, themeId: themeId }
      })

      await theme.destroy({
        where: { id: themeId }
      })

      if (!destroy) {
        return res.status(404).send({
          error: 'Tema tidak ditemukan atau telah terhapus'
        })
      }

      res.status(200).send({
        success: `Tema berhasil dihapus`
      })
    } catch (err) {
      res.status(500).send(serverErr)
      console.log(err)
    }
  },
  async list(req, res) {
    try {
      const teacherId = req.params.teacherId
      if (!auth) return res.status(401).send(authErr)

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
