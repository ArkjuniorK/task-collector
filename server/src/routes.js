const SchoolControllers = require('./controllers/SchoolControllers')
const TeacherControllers = require('./controllers/TeacherControllers')
const TaskControllers = require('./controllers/TaskControllers')
const StudentControllers = require('./controllers/StudentControllers')
const ThemeControllers = require('./controllers/ThemeControllers')

module.exports = (app) => {
  /* auth route */
  app.get('/api/register', SchoolControllers.index) // school list
  app.post('/api/register/teacher', TeacherControllers.create)
  app.post('/api/login/teacher', TeacherControllers.post)
  app.post('/api/register/student', StudentControllers.create)
  app.post('/api/login/student', StudentControllers.post)

  /* TODO:
   * only use teacher and student controller for auth
   * create theme, subtheme, and task controller
   */

  /* index route */
  /* app.get('/api/teacher/:idNumber', TeacherControllers.index) */
  /* app.get('/api/student/:idNumber', StudentControllers.index) */

  /* TODO: Theme routes */
  app.get('/api/theme/:type/:teacherId/:page', ThemeControllers.index)
  app.get('/api/theme/:type/:teacherId', ThemeControllers.post)

  /* task route */
  app.get('/api/task/:id', TaskControllers.index)
  app.post('/api/task', TaskControllers.post)
}
