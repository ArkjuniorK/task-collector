const {
  task,
  teacher,
  room,
  student,
  teacherTask,
  teacherRoom,
  studentTask,
} = require('../models')

module.exports = {
  async index(req, res) {
    try {
      const { type, idNumber } = req.params
      const { page } = req.query
      const perPage = 12
      let auth = null
      let tasks = null

      /* TODO:
       * Check the type of user
       * And verify the idNumber
       * Then set the themes */

      if (type === 'teacher') {
        auth = await teacher.findByPk(idNumber)
        tasks = await teacherTask.findAndCountAll({
          where: { teacherIdNumber: idNumber },
          limit: perPage,
          offset: perPage * (page - 1),
          include: ['task'],
          order: [[task, 'date', 'DESC']],
        })
      }

      if (type === 'student') {
        auth = await student.findByPk(idNumber)
        tasks = await studentTask.findAndCountAll({
          where: { studentIdNumber: idNumber },
          limit: perPage,
          offset: perPage * (page - 1),
          include: ['task'],
          order: [[task, 'date', 'DESC']],
        })
      }

      /* TODO: Send error message if user is undefined */
      if (!auth) {
        return res.status(401).send({
          error: 'Tidak dapat mengenali kredensial anda. Coba lagi!',
        })
      }

      /* TODO: Create new instance */
      const countTasks = tasks.count
      const Tasks = tasks.rows.map((val) => val.task)
      const pageTasks = parseInt(page) //Invert string into number

      /* TODO: Wrap the instances */
      const indexTasks = {
        tasks: Tasks,
        pagination: {
          totalTasks: countTasks,
          perPage: perPage,
          totalPages: Math.ceil(countTasks / perPage),
          currentPage: pageTasks,
        },
      }

      res.send(indexTasks)
    } catch (err) {
      res.send(err)
    }
  },
  async view(req, res) {
    try {
      const { type, idNumber } = req.params
      const { taskId } = req.query
      let auth = null

      /* TODO: Check user credential */
      if (type === 'teacher') auth = await teacher.findByPk(idNumber)
      if (type === 'student') auth = await student.findByPk(idNumber)

      /* TODO: Send error when credential is undifined */
      if (!auth) {
        return res.status(401).send({
          error: 'Tidak dapat mengenali kredensial anda. Coba lagi!',
        })
      }

      /* TODO:
       * Change the value of references and questions
       * from LONGTEXT into JSON/ARRAY */

      //viewTask.references = JSON.parse(viewTask.references)
      //viewTask.questions = JSON.parse(viewTask.questions)

      /* TODO: Get task and send the response */
      const viewTask = await task.findByPk(taskId)
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
            through: teacherRoom,
          },
        ],
      })

      /* TODO: If it's not teacher, then send error */
      if (!checkTeacher) {
        return res.status(500).send({
          error: 'Anda tidak memiliki kuasa untuk menambah Tema',
        })
      }

      /* TODO: Create new instances */
      const roomId = checkTeacher.class[0].idNumber
      const schoolId = checkTeacher.schoolIdNumber

      /* TODO: Find student by roomId and schoolid using room model */
      const studentsList = await room.findByPk(roomId, {
        include: [{ model: student, where: { schoolIdNumber: schoolId } }],
      })

      /* TODO: Create task */
      const tasks = await task.create(reqTask)

      /* TODO: Task for teacherTask */
      await teacherTask.create({
        teacherIdNumber: teacherId,
        taskId: tasks.id,
      })

      /* TODO:
       * Get the studentIdNumber from studentsList
       * Then create the studentThemes for each student */
      const studentId = await studentsList.students.map((data) => data.idNumber)
      const checkstudent = await studentId.forEach(async (id) => {
        await studentTask.create({
          studentIdNumber: id,
          taskId: tasks.id,
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
  },
}
