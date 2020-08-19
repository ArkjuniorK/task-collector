// the models use
const {
  sequelize,
  school,
  room,
  teacher,
  student,
  task,
  theme,
  subtheme,
  subject,
  schoolRoom,
  teacherRoom,
  teacherTheme,
  teacherSubtheme,
  teacherTask,
  studentRoom,
  studentTheme,
  studentSubtheme,
  studentTask,
} = require('../src/models')

const Promise = require('bluebird')

const Schools = require('./Schools.json')
const Rooms = require('./Rooms.json')
const Subjects = require('./Subject.json')
const Teachers = require('./Teachers.json')
const Tasks = require('./Tasks.json')
const Themes = require('./Theme.json')
const Subthemes = require('./Subtheme.json')
const TeacherThemes = require('./TeacherTheme.json')
const TeacherSubthemes = require('./TeacherSubtheme.json')
const TeacherTasks = require('./TeachersTask.json')
const TeacherRooms = require('./TeachersRoom.json')
const StudentRoom = require('./StudentsRoom.json')
const SchoolRooms = require('./SchoolsRoom.json')

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

  // School Room
  await Promise.all(
    SchoolRooms.map((Room) => {
      schoolRoom.create(Room)
    })
  )

  await Promise.all(
    Teachers.map((Teacher) => {
      teacher.create(Teacher)
    })
  )

  await Promise.all(
    Subjects.map((Subject) => {
      subject.create(Subject)
    })
  )

  await Promise.all(
    Themes.map((Theme) => {
      theme.create(Theme)
    })
  )

  await Promise.all(
    Subthemes.map((Subtheme) => {
      subtheme.create(Subtheme)
    })
  )

  await Promise.all(
    Tasks.map((Task) => {
      task.create(Task)
    })
  )

  // Teacher Room
  await Promise.all(
    TeacherRooms.map((Room) => {
      teacherRoom.create(Room)
    })
  )

  // Teacher Theme
  await Promise.all(
    TeacherThemes.map((Theme) => {
      teacherTheme.create(Theme)
    })
  )

  // Techer Subtheme
  await Promise.all(
    TeacherSubthemes.map((Subtheme) => {
      teacherSubtheme.create(Subtheme)
    })
  )

  // Teacher Task
  await Promise.all(
    TeacherTasks.map((Task) => {
      teacherTask.create(Task)
    })
  )
})
