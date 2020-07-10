const SchoolControllers = require('./controllers/SchoolControllers')
const TeacherControllers = require('./controllers/TeacherControllers')
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
}
