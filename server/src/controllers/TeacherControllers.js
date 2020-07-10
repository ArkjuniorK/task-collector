const {
  teacher,
  teacherRoom,
  task,
  teacherTask,
  schoolRoom,
} = require('../models')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('../config')

function jwtSignTeacher(teacher) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(teacher, config.jwtSecret, {
    expiresIn: ONE_WEEK,
  })
}

module.exports = {
  /* login teacher */
  async post(req, res) {
    try {
      const { idNumber, securityKey } = req.body

      /* var name must be differernt with table name */
      const teacherLogin = await teacher.findByPk(idNumber, {
        include: ['class', 'school', 'students'],
      })

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

      const teacherJson = teacherLogin.toJSON()

      res.send({
        teacher: teacherJson,
        token: jwtSignTeacher(teacherJson),
      })
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
      const perPage = 12

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
        order: [[task, 'date', 'DESC']],
      })

      /* create new instance */
      const countTasks = teacherTasks.count
      const Tasks = teacherTasks.rows.map((tasks) => tasks.task)
      const pageTasks = parseInt(page)

      /* wrap all the instances */
      const teacherTaskRes = {
        tasks: Tasks,
        recents: Tasks,
        pagination: {
          totalTasks: countTasks,
          perPage: perPage,
          totalPages: Math.ceil(countTasks / perPage),
          currentPage: pageTasks,
        },
      }

      res.send(teacherTaskRes)
    } catch (err) {
      res.status(500).send({
        error: 'Kesalahan saat menghubungi server, periksa jaringan anda',
      })
      console.log(err)
      console.log(err)
      console.log(err)
      console.log(err)
    }
  },
  async create(req, res) {
    try {
      const {
        frontName,
        backName,
        idNumber,
        gender,
        born,
        schoolIdNumber,
        roomIdNumber,
      } = req.body

      const securityKey = idNumber.toString()

      const teacherValidation = await teacher.findByPk(idNumber)

      if (teacherValidation) {
        res.status(400).send({
          error: 'Nomor induk yang anda masukan telah digunakan',
        })
      }

      await teacher.create({
        idNumber: idNumber,
        securityKey: securityKey,
        frontName: frontName,
        backName: backName,
        gender: gender,
        born: born,
        schoolIdNumber: schoolIdNumber,
      })

      await schoolRoom.create({
        schoolIdNumber: schoolIdNumber,
        roomIdNumber: roomIdNumber,
      })

      await teacherRoom.create({
        roomIdNumber: roomIdNumber,
        teacherIdNumber: idNumber,
      })

      const teacherData = await teacher.findByPk(idNumber, {
        include: ['class', 'school', 'students'],
      })

      const teacherJson = teacherData.toJSON()

      res.send({
        teacher: teacherJson,
        token: jwtSignTeacher(teacherJson),
      })
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
