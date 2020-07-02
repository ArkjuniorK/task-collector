const { task, teacherTask, room, student, studentTask } = require('../models')

module.exports = {
  async index(req, res) {
    try {
      const { id } = req.params

      const viewTask = await task.findOne({
        where: { id: id },
      })

      //change the value of references and questions
      //from LONGTEXT into JSON/ARRAY
      viewTask.references = JSON.parse(viewTask.references)
      viewTask.questions = JSON.parse(viewTask.questions)

      res.send(viewTask)
    } catch (err) {
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
    }
  },
  async post(req, res) {
    try {
      // request from body
      const {
        name,
        date,
        background,
        subjectName,
        teacherIdNumber,
        roomIdNumber,
        schoolIdNumber,
        references,
        questions,
      } = req.body

      // find room and student
      const rooms = await room.findOne({
        where: {
          idNumber: roomIdNumber,
        },
        include: [
          {
            model: student,
            where: {
              schoolIdNumber: schoolIdNumber,
            },
          },
        ],
      })

      // create task
      const tasks = await task.create({
        name: name,
        date: date,
        background: background,
        references: references,
        questions: questions,
        subjectName: subjectName,
      })

      // create the teacherTask
      await teacherTask.create({
        teacherIdNumber: teacherIdNumber,
        taskId: tasks.id,
      })

      // find the student ID and create new array
      const studentId = await rooms.students.map((data) => data.idNumber)

      // create studentTask for each student in the same class
      studentId.forEach(async (id) => {
        await studentTask.create({
          taskId: tasks.id,
          studentIdNumber: id,
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
