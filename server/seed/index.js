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
const Students = require('./Students.json')
const Tasks = require('./Tasks.json')
const Themes = require('./Theme.json')
const Subthemes = require('./Subtheme.json')
const TeachersThemes = require('./TeachersTheme.json')
const TeachersSubthemes = require('./TeachersSubtheme.json')
const TeachersTasks = require('./TeachersTask.json')
const TeachersRooms = require('./TeachersRoom.json')
const StudentsRooms = require('./StudentsRoom.json')
const StudentsThemes = require('./StudentsTheme.json')
const StudentsSubthemes = require('./StudentsSubtheme.json')
const StudentsTasks = require('./StudentsTask.json')
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
    TeachersRooms.map((Room) => {
      teacherRoom.create(Room)
    })
  )

  // Teacher Theme
  await Promise.all(
    TeachersThemes.map((Theme) => {
      teacherTheme.create(Theme)
    })
  )

  // Techer Subtheme
  await Promise.all(
    TeachersSubthemes.map((Subtheme) => {
      teacherSubtheme.create(Subtheme)
    })
  )

  // Teacher Task
  await Promise.all(
    TeachersTasks.map((Task) => {
      teacherTask.create(Task)
    })
  )

  await Promise.all(Students.map((Student) => student.create(Student)))

  // Student Room
  await Promise.all(StudentsRooms.map((Room) => studentRoom.create(Room)))

  // Student Theme
  await Promise.all(StudentsThemes.map((Theme) => studentTheme.create(Theme)))

  // Student Subtheme
  await Promise.all(
    StudentsSubthemes.map((Subtheme) => studentSubtheme.create(Subtheme))
  )

  // Student Task
  await Promise.all(StudentsTasks.map((Task) => studentTask.create(Task)))
})
