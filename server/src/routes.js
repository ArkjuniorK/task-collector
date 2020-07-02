const TeacherControllers = require('./controllers/TeacherControllers')
const SchoolControllers = require('./controllers/SchoolControllers')
const RoomControllers = require('./controllers/RoomControllers')
const TaskControllers = require('./controllers/TaskControllers')

module.exports = (app) => {
  /* login route */
  app.post('/login/teacher', TeacherControllers.post)

  /* index route */
  app.get('/teacher/:idNumber', TeacherControllers.index)

  // get the teacher or student data
  app.post('/teacher', TeacherControllers.create)
  app.put('/teacher/:idNumber', TeacherControllers.update)

  app.get('/schools', SchoolControllers.index)
  app.post('/schools', SchoolControllers.post)

  app.get('/rooms', RoomControllers.index)

  app.get('/task/:id', TaskControllers.index)
  app.post('/task', TaskControllers.post)
}
