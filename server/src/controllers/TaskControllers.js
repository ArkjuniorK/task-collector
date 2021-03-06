const {
  task,
  subtheme,
  theme,
  teacher,
  room,
  student,
  teacherTask,
  teacherRoom,
  studentTask
} = require('../models')

module.exports = {
  async index(req, res) {
    try {
      const { type, idNumber } = req.params
      const { page } = req.query
      const perPage = 12
      let userType, userTask

      let options = {
        include: ['task'],
        order: [['createdAt', 'DESC']], // order correctly by removing theme model
        limit: perPage,
        offset: perPage * (page - 1)
      }

      // type recognition
      if (type === 'teacher') {
        userType = teacher
        userTask = teacherTask
        options.where = { teacherIdNumber: idNumber }
      } else if (type === 'student') {
        userType = student
        userTask = studentTask
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

      /* Find tasks */
      const tasks = await userTask.findAndCountAll(options)

      /* Create new instance */
      const countTasks = tasks.count
      const Tasks = tasks.rows.map((val) => val.task)
      const pageTasks = parseInt(page) //Invert string into number

      /* Wrap the instances */
      const indexTasks = {
        tasks: Tasks,
        pagination: {
          totalTasks: countTasks,
          perPage: perPage,
          totalPages: Math.ceil(countTasks / perPage),
          currentPage: pageTasks
        }
      }

      res.send(indexTasks)
    } catch (err) {
      res.send(err)
    }
  },
  async recents(req, res) {
    try {
      const { type, idNumber } = req.params
      let userType, userTask

      let options = {
        include: [
          {
            model: task,
            attributes: [
              'name',
              'date',
              'background',
              'subjectName',
              'subthemeId'
            ]
          }
        ],
        limit: 2,
        order: [['task', 'date', 'DESC']]
      }

      // type recognition
      if (type === 'teacher') {
        userType = teacher
        userTask = teacherTask
        options.where = { teacherIdNumber: idNumber }
        options.attributes = ['taskId', 'teacherIdNumber']
      } else if (type === 'student') {
        userType = student
        userTask = studentTask
        options.where = { studentIdNumber: idNumber }
        options.attributes = ['taskId', 'studentIdNumber']
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

      /* Find recent tasks */
      const recents = await userTask.findAll(options)

      /* TODO Send the recents task */
      res.send(recents)
    } catch (err) {
      res.send(err)
    }
  },
  async view(req, res) {
    try {
      const { type, idNumber } = req.params
      const { id } = req.query
      let auth

      /* TODO: Check user credential */
      if (type === 'teacher') auth = await teacher.findByPk(idNumber)
      if (type === 'student') auth = await student.findByPk(idNumber)

      /* TODO: Send error when credential is undifined */
      if (!auth) {
        return res.status(401).send({
          error: 'Tidak dapat mengenali kredensial anda. Coba lagi!'
        })
      }

      // from MySQL
      // viewTask.references = JSON.parse(viewTask.references)
      // viewTask.questions = JSON.parse(viewTask.questions)

      // Get task and send the response
      let viewTask = await task.findByPk(id, {
        include: [{ model: subtheme, include: ['theme'] }]
      })

      res.send(viewTask)
    } catch (err) {
      res.send(err)
    }
  },
  async post(req, res) {
    try {
      const reqTask = req.body
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

      /* TODO: Create task */
      const tasks = await task.create(reqTask)

      /* TODO: Task for teacherTask */
      await teacherTask.create({
        teacherIdNumber: teacherId,
        taskId: tasks.id
      })

      /* TODO:
       * Get the studentIdNumber from studentsList
       * Then create the studentThemes for each student */
      const studentId = await studentsList.students.map((data) => data.idNumber)
      const checkstudent = await studentId.forEach(async (id) => {
        await studentTask.create({
          studentIdNumber: id,
          taskId: tasks.id
        })
      })

      res.send(tasks)
    } catch (err) {
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
    }
  }
}
