const {
  teacher,
  student,
  subtheme,
  task,
  room,
  teacherSubtheme,
  studentSubtheme,
  teacherRoom,
} = require('../models')

module.exports = {
  /* TODO: Index subthemes  */
  async index(req, res) {
    try {
      const { type, idNumber } = req.params
      const { page } = req.query
      const perPage = 12
      let auth = null
      let subthemes = null

      /* TODO:
       * Check the type of user
       * And verify the idNumber
       * Then set the themes */
      if (type === 'teacher') {
        auth = await teacher.findByPk(idNumber)
        subthemes = await teacherSubtheme.findAndCountAll({
          where: { teacherIdNumber: idNumber },
          limit: perPage,
          offset: perPage * (page - 1),
          /* TODO: include themes and their subthemes*/
          include: [{ model: subtheme, include: [{ model: task }] }],
          order: [[subtheme, 'updatedAt', 'DESC']],
        })
      }

      if (type === 'student') {
        auth = await student.findByPk(idNumber)
        subthemes = await studentSubtheme.findAndCountAll({
          where: { studentIdNumber: idNumber },
          limit: perPage,
          offset: perPage * (page - 1),
          /* TODO: include themes and their subthemes*/
          include: [{ model: subtheme, include: [{ model: task }] }],
          order: [[subtheme, 'updatedAt', 'DESC']],
        })
      }

      /* TODO: Send error message if user is undefined */
      if (!auth) {
        return res.status(401).send({
          error: 'Tidak dapat mengenali kredensial anda. Coba lagi!',
        })
      }

      /* TODO: Create new instances  */
      const countSubthemes = subthemes.count
      const Subthemes = subthemes.rows.map((val) => {
        let subtheme = val.subtheme
        let instances = {
          id: subtheme.id,
          name: subtheme.name,
          title: subtheme.title,
          background: subtheme.background,
          date: subtheme.updatedAt,
          tasks: subtheme.tasks.length, // display subthemes length
        }

        return instances
      })
      const pageSubthemes = parseInt(page) // invert string to number */

      /* TODO: Wrap the instances */
      const indexSubthemes = {
        subthemes: Subthemes,
        pagination: {
          totalSubthemes: countSubthemes,
          perPage: perPage,
          totalPage: Math.ceil(countSubthemes / perPage),
          currentPage: pageSubthemes,
        },
      }

      /* TODO: Send the response */
      res.send(indexSubthemes)
    } catch (err) {
      console.log(err)
    }
  },

  /* TODO: View subtheme */
  async view(req, res) {
    try {
      const { type, idNumber } = req.params
      const { subthemeId } = req.query
      let auth = null

      /* TODO: Check user credential */
      if (type === 'teacher') auth = await teacher.findByPk(idNumber)
      if (type === 'student') auth = await student.findByPk(idNumber)

      /* TODO: Send error when credential is undifiend */
      if (!auth) {
        return res.status(401).send({
          error: 'Tidak dapat mengenali kredensial anda. Coba lagi!',
        })
      }

      /* TODO: Get theme and send the response */
      const viewSubtheme = await subtheme.findByPk(subthemeId, {
        include: [{ model: task }],
      })
      res.send(viewSubtheme)
    } catch (err) {
      console.log(err)
    }
  },

  /* TODO: Post subtheme */
  async post(req, res) {
    try {
      const reqSubtheme = req.body
      const { teacherId } = req.params

      /* TODO:
       * Check if the user is teacher
       * Also get the roomId and schoolId */
      const checkTeacher = await teacher.findByPk(teacherId, {
        include: [
          {
            model: room,
            as: 'class',
            through: teacherRoom,
          },
        ],
      })

      /* TODO: If it's not teacher, then send error */
      if (!checkTeacher) {
        return res.status(500).send({
          error: 'Anda tidak memiliki kuasa untuk menambah Subtema',
        })
      }

      /* TODO: Create new instances */
      const roomId = checkTeacher.class[0].idNumber
      const schoolId = checkTeacher.schoolIdNumber

      /* TODO: Find student by roomId and schoolid using room model */
      const studentsList = await room.findByPk(roomId, {
        include: [{ model: student, where: { schoolIdNumber: schoolId } }],
      })

      /* TODO: Create the theme*/
      const subthemes = await subtheme.create(reqSubtheme) // For themes table`s

      /* TODO: Create teacherThemes */
      await teacherSubtheme.create({
        teacherIdNumber: teacherId,
        subthemeId: subthemes.id,
      })

      /* TODO:
       * Get the studentIdNumber from studentsList
       * Then create the studentThemes for each student */
      const studentId = await studentsList.students.map((data) => data.idNumber)
      await studentId.forEach(async (id) => {
        await studentSubtheme.create({
          studentIdNumber: id,
          subthemeId: subthemes.id,
        })
      })

      res.send(subthemes)
    } catch (err) {
      console.log(err)
    }
  },
}
