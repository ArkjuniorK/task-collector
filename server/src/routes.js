const ThemeControllers = require('./controllers/ThemeControllers')
const SubthemeControllers = require('./controllers/SubthemeControllers')
const TaskControllers = require('./controllers/TaskControllers')
const AuthControllers = require('./controllers/AuthControllers')

/* 
  req.query = url?query=queryData
  req.params = url/:params
  req.body = from body
*/

module.exports = (app) => {
  /* XXX Auth routes XXX */
  app.get('/api/register', AuthControllers.index)
  app.post('/api/register/:type', AuthControllers.create)
  app.post('/api/login/:type', AuthControllers.post)

  /* XXX Theme routes XXX*/
  app.get('/api/theme/:type/:idNumber', ThemeControllers.index)
  app.get('/api/theme/:type/:idNumber/view', ThemeControllers.view)
  app.post('/api/theme/:teacherId', ThemeControllers.post)

  /* XXX Subtheme routes XXX */
  app.get('/api/subtheme/:type/:idNumber', SubthemeControllers.index)
  app.get('/api/subtheme/:type/:idNumber/view', SubthemeControllers.view)
  app.post('/api/subtheme/:teacherId', SubthemeControllers.post)

  /* XXX Task routes XXX */
  app.get('/api/task/:type/:idNumber', TaskControllers.index)
  app.get('/api/task/:type/:idNumber/recents', TaskControllers.recents)
  app.get('/api/task/:type/:idNumber/view', TaskControllers.view)
  app.post('/api/task/:teacherId', TaskControllers.post)
}
