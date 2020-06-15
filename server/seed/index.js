// the models use
const {
  sequelize,
  school,
  room,
  teacher,
  student,
  subject,
  task,
  studentTask,
  studentRoom,
  teacherRoom,
  schoolRoom,
} = require('../src/models')

const Promise = require('bluebird')
const Schools = require('./Schools.json')
const Rooms = require('./Rooms.json')
const Teachers = require('./Teachers.json')
const Students = require('./Students.json')
const Subjects = require('./Subject.json')
const Tasks = require('./Tasks.json')
const StudentTask = require('./StudentTask.json')
const StudentsRoom = require('./StudentsRoom.json')
const TeachersRoom = require('./TeachersRoom.json')
const SchoolsRoom = require('./SchoolsRoom.json')

sequelize.sync({ force: true }).then(async function () {
  await Promise.all(
    Schools.map((School) => {
      school.create(School)
    })
  )

  await Promise.all(
    Rooms.map((Room) => {
      room.create(Room)
    })
  )

  await Promise.all(
    Teachers.map((Teacher) => {
      teacher.create(Teacher)
    })
  )

  await Promise.all(
    Students.map((Student) => {
      student.create(Student)
    })
  )

  await Promise.all(
    SchoolsRoom.map((Room) => {
      schoolRoom.create(Room)
    })
  )

  await Promise.all(
    TeachersRoom.map((Room) => {
      teacherRoom.create(Room)
    })
  )

  await Promise.all(
    StudentsRoom.map((Room) => {
      studentRoom.create(Room)
    })
  )

  await Promise.all(
    Subjects.map((Subject) => {
      subject.create(Subject)
    })
  )

  await Promise.all(
    Tasks.map((Task) => {
      task.create(Task)
    })
  )

  await Promise.all(
    StudentTask.map((tasks) => {
      studentTask.create(tasks)
    })
  )
})
