const { teacher, student, studentRoom, room } = require('../models')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('../config')

function jwtSignStudent(student) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(student, config.jwtSecret, {
    expiresIn: ONE_WEEK,
  })
}

module.exports = {
  /* TODO: Login student */
  async post(req, res) {
    try {
      const { idNumber, securityKey } = req.body

      /* var name must be differernt with table name */
      const studentLogin = await student.findByPk(idNumber, {
        include: ['class', 'school'],
      })

      /* if is not student send 403 status */
      if (!studentLogin) {
        return res.status(403).send({
          error: 'Nomor Induk Tidak Cocok, Coba Periksa Kembali',
        })
      }

      const checkId = await studentLogin.compareKey(securityKey)

      if (!checkId) {
        return res.status(403).send({
          error: 'Kunci Keamanan Salah, Coba Periksa Kembali',
        })
      }

      const studentJson = studentLogin.toJSON()

      res.send({
        student: studentJson,
        token: jwtSignStudent(studentJson),
      })
    } catch (err) {
      res.send(err)
    }
  },
  /* TODO: Create student */
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

      /* change idNumber to securityKey as String */
      const securityKey = idNumber.toString()

      /* validating student account, if account exist send response with status 400 */
      const studentValidation = await student.findByPk(idNumber)

      if (studentValidation) {
        res.status(400).send({
          error:
            'Nomor Induk telah digunakan, harap menggunakan nomor induk asli anda',
        })
      }

      /* find the teacherIdNumber from roomIdNumber with schoolIdNumber as parameter */
      const roomData = await room.findOne({
        where: { idNumber: roomIdNumber },
        include: [
          {
            model: teacher,
            where: { schoolIdNumber: schoolIdNumber },
          },
        ],
      })

      /* take the teacher idNumber */
      const teacherId = roomData.teachers[0].idNumber

      /* create account for student */
      await student.create({
        idNumber: idNumber,
        securityKey: securityKey,
        frontName: frontName,
        backName: backName,
        gender: gender,
        born: born,
        schoolIdNumber: schoolIdNumber,
        teacherIdNumber: teacherId,
      })

      /* create studentRoom association */
      await studentRoom.create({
        roomIdNumber: roomIdNumber,
        studentIdNumber: idNumber,
      })

      /* after create the student, init the student data that would be send to the Front End */
      const studentData = await student.findByPk(idNumber, {
        include: ['class', 'school'],
      })

      const studentJson = studentData.toJSON()

      res.send({
        student: studentJson,
        token: jwtSignStudent(studentJson),
      })
    } catch (err) {
      console.log('Error', err)
    }
  },
}
