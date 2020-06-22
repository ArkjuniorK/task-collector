const {
  teacher,
  school,
  room,
  student,
  task,
  headmaster,
  teacherTask,
} = require('../models')
const _ = require('lodash')

module.exports = {
  async post(req, res) {
    try {
      const { idNumber, securityKey } = req.body

      /* var name must be differernt with table name */
      const teacherLogin = await teacher.findByPk(idNumber)

      /* if is not teacher send 403 status */
      if (!teacherLogin) {
        return res.status(403).send({
          error: 'Nomor Induk Tidak Cocok, Coba Periksa Kembali',
        })
      }

      const checkId = await teacherLogin.compareKey(securityKey)

      if (!checkId) {
        return res.status(403).send({
          error: 'Kunci Keamanan Salah, Coba Periksa Kembali',
        })
      }

      const jsonData = teacherLogin.toJSON()

      res.send(jsonData)
    } catch (err) {
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
    }
  },
  async index(req, res) {
    try {
      /* 
      req.query = url?query=queryData
      req.params = url/:params
      req.body = from body
      */
      const { idNumber } = req.params
      const { page } = req.query
      const perPage = 7

      const teacherTasks = await teacherTask.findAndCountAll({
        where: {
          teacherIdNumber: idNumber,
        },
        limit: perPage,
        /* offset by default use 0 as the first number of paginating */
        offset: perPage * (page - 1),
        include: [
          {
            model: task,
          },
        ],
      })

      /* create new instance */
      const countTasks = teacherTasks.count
      const indexTasks = teacherTasks.rows.map((tasks) => tasks.task)

      /* recent tasks */
      const recentTasks = await teacherTask
        .findAll({
          where: {
            teacherIdNumber: idNumber,
          },
          limit: 2,
          include: [
            {
              model: task,
            },
          ],
          order: [[task, 'date', 'DESC']],
        })
        .map((item) => item.task)

      /* wrap all the instances */
      const teacherTaskRes = {
        count: countTasks,
        tasks: indexTasks,
        recents: recentTasks,
      }

      res.send(teacherTaskRes)
    } catch (err) {
      console.log(err)
      console.log(err)
      console.log(err)
      console.log(err)
    }
  },
  async create(req, res) {
    try {
      const { name, idNumber, gender, status, age } = req.body

      const teacherRegister = await teacher.create({
        idNumber: idNumber,
        name: name,
        gender: gender,
        status: status,
        age: age,
      })

      res.send(teacherRegister)
    } catch (err) {
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
    }
  },
  async update(req, res) {
    try {
      const { name, gender, status, age, schoolIdNumber } = req.body

      // const data = [name, idNumber, gender, status, age, schoolId]

      // console.log(data)
      const verifyTeacher = await teacher.findByPk(req.params.idNumber)

      // const verifyPass = await verifyTeacher.compareId(gender)

      // if (!verifyPass) {
      //   return res.status(403).send({
      //     error: 'Cannot Verify Your Gender',
      //   })
      // }

      const teacherUpdate = await verifyTeacher.update(req.body)

      console.log(teacherUpdate)
      console.log(teacherUpdate)
      console.log(teacherUpdate)
      console.log(teacherUpdate)

      res.send(teacherUpdate)
    } catch (err) {
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
    }
  },
}
