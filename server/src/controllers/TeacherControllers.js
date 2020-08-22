const { teacher, teacherRoom, schoolRoom } = require('../models')
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
  /* TODO: Login teacher */
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
      res.send(err)
    }
  },
  /* TODO: Create new teacher */
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
      res.send(err)
    }
  },
}
