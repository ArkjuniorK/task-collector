const TeacherControllers = require('./controllers/TeacherControllers')
const SchoolControllers = require('./controllers/SchoolControllers')
const RoomControllers = require('./controllers/RoomControllers')
const TaskControllers = require('./controllers/TaskControllers')

module.exports = (app) => {
  app.get('/teachers', TeacherControllers.index)
  app.post('/teachers', TeacherControllers.post)

  app.get('/schools', SchoolControllers.index)
  app.post('/schools', SchoolControllers.post)

  app.get('/rooms', RoomControllers.index)

  app.post('/task', TaskControllers.post)
}
