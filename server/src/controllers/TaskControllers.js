const {
  task,
  teacher,
  teacherTask,
  room,
  student,
  studentTask,
} = require('../models')

module.exports = {
  // async index(req, res) {
  //   try {
  //     const { id } = req.query

  //     const schools = await school.findOne({
  //       where: {
  //         idNumber: id,
  //       },
  //       // include could use the model
  //       // and the 'as' field that defined
  //       // in the school model
  //       include: [{ model: teacher }],
  //     })

  //     res.send(schools)
  //   } catch (err) {
  //     console.log('Error', err)
  //     console.log('Error', err)
  //     console.log('Error', err)
  //     console.log('Error', err)
  //     console.log('Error', err)
  //   }
  // },
  async post(req, res) {
    try {
      // request from body
      const { name, subjectName, teacherIdNumber, roomId, schoolId } = req.body

      // find room and student
      const rooms = await room.findOne({
        where: {
          idNumber: roomId,
        },
        include: [
          {
            model: student,
            where: {
              schoolIdNumber: schoolId,
            },
          },
        ],
      })

      // create task
      const tasks = await task.create({
        name: name,
        subjectName: subjectName,
      })

      // if (task.idNumber) {
      console.log('idNumber', tasks.idNumber)
      console.log('idNumber', tasks.idNumber)
      console.log('idNumber', tasks.idNumber)
      console.log('idNumber', tasks.idNumber)
      console.log('idNumber', tasks.idNumber)
      // }

      // create the teacherTask
      await teacherTask.create({
        teacherIdNumber: teacherIdNumber,
        taskIdNumber: tasks.idNumber,
      })

      // find the student ID and create new array
      const studentId = await rooms.students.map((data) => data.idNumber)

      // create studentTask for each student in the same class
      studentId.forEach(async (id) => {
        await studentTask.create({
          taskIdNumber: tasks.idNumber,
          studentIdNumber: id,
        })
      })

      res.send(studentId)
    } catch (err) {
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
    }
  },
}
