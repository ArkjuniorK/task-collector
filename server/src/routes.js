const TeacherControllers = require('./controllers/TeacherControllers')
const SchoolControllers = require('./controllers/SchoolControllers')
const RoomControllers = require('./controllers/RoomControllers')
const TaskControllers = require('./controllers/TaskControllers')
const StudentControllers = require('./controllers/StudentControllers')

module.exports = (app) => {
  /* auth route */
  app.get('/register', SchoolControllers.index)
  app.post('/register/teacher', TeacherControllers.create)
  app.post('/login/teacher', TeacherControllers.post)
  app.post('/register/student', StudentControllers.create)
  app.post('/login/student', StudentControllers.post)

  /* index route */
  app.get('/teacher/:idNumber', TeacherControllers.index)
  app.get('/student/:idNumber', StudentControllers.index)

  /* task route */
  app.get('/task/:id', TaskControllers.index)
  app.post('/task', TaskControllers.post)

  /* test route */
  app.get('/room', RoomControllers.test)

  // get the teacher or student data
  app.post('/teacher', TeacherControllers.create)
  app.put('/teacher/:idNumber', TeacherControllers.update)

  app.get('/schools', SchoolControllers.index)
  app.post('/schools', SchoolControllers.post)

  app.get('/rooms', RoomControllers.index)
}
