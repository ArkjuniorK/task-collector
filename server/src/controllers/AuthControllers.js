const {
  school,
  teacher,
  student,
  room,
  teacherRoom,
  studentRoom,
  schoolRoom
} = require('../models')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('../config')

function jwtSign(user) {
  const ONE_HOUR = 60 * 60
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: ONE_HOUR
  })
}

/* XXX Second argument for teacher.findByPk XXX */
let teacherAttribute = {
  attributes: { exclude: ['updatedAt', 'createdAt'] },
  include: [
    {
      model: school,
      attributes: { exclude: ['updatedAt', 'createdAt', 'idNumber'] }
    },
    {
      model: room,
      as: 'class',
      through: teacherRoom,
      attributes: {
        exclude: ['updatedAt', 'createdAt', { model: teacherRoom }]
      }
    },
    {
      model: student,
      attributes: {
        exclude: [
          'securityKey',
          'teacherIdNumber',
          'schoolIdNumber',
          'updatedAt',
          'createdAt'
        ]
      }
    }
  ]
}

let studentAttribute = {
  attributes: { exclude: ['updatedAt', 'createdAt'] },
  include: [
    {
      model: school,
      attributes: { exclude: ['updatedAt', 'createdAt', 'idNumber'] }
    },
    {
      model: room,
      as: 'class',
      through: studentRoom,
      attributes: {
        exclude: ['updatedAt', 'createdAt', { model: teacherRoom }]
      }
    }
  ]
}

module.exports = {
  /* TODO Get schools list */
  async index(req, res) {
    try {
      const schoolList = await school.findAll()

      res.send(schoolList)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Terjadi Kesalahan, Periksa Koneksi Anda'
      })
    }
  },
  async create(req, res) {
    try {
      const authReq = req.body
      const { type } = req.params

      let authId = null
      let auth = null
      let authErr = {
        error: 'Nomor Induk Telah Digunakan, Harap Memasukkan Nomor Induk Lain'
      }

      /* TODO Validate the idNumber */
      if (type === 'teacher') authId = await teacher.findByPk(authReq.idNumber)
      if (type === 'student') authId = await student.findByPk(authReq.idNumber)

      /* TODO Send err when idNumber already used */
      if (authId) return res.status(403).send(authErr)

      /* TODO Execute the req */
      switch (type) {
        case 'teacher':
          /* TODO Create teacher instance and it's association */
          await teacher.create(authReq)
          await schoolRoom.create({
            roomIdNumber: authReq.roomIdNumber,
            schoolIdNumber: authReq.schoolIdNumber
          })
          await teacherRoom.create({
            teacherIdNumber: authReq.idNumber,
            roomIdNumber: authReq.roomIdNumber
          })
          auth = await teacher.findByPk(authReq.idNumber, teacherAttribute)
          break

        case 'student':
          /* TODO Create student instance and it's association */
          await student.create(authReq)
          await studentRoom.create({
            roomIdNumber: authReq.roomIdNumber,
            studentIdNumber: authReq.idNumber
          })
          auth = await student.findByPk(authReq.idNumber, studentAttribute)
          break
      }

      /* TODO Turn auth into JSON and add the token */
      const user = auth.toJSON()
      const token = jwtSign(user)

      /* TODO Send the response */
      res.send({
        user: user,
        token: token
      })
    } catch (err) {
      console.log(err)
    }
  },
  async post(req, res) {
    try {
      const { idNumber, securityKey } = req.body
      const { type } = req.params
      let authId = null
      let authPass = null
      const authError = {
        error: 'Masalah pada nomor induk atau kata sandi anda, periksa kembali'
      }

      /* -----TODO-----
       * Veriy type of the user
       * When verify, also include the association table
       * Then verify the password that user is using */
      switch (type) {
        case 'teacher':
          authId = await teacher.findByPk(idNumber, teacherAttribute)
          authPass = await authId.compareKey(securityKey)
          if (!authId || !authPass) return res.status(401).send(authError)
          break

        case 'student':
          authId = await student.findByPk(idNumber, studentAttribute)
          authPass = await authId.compareKey(securityKey)
          if (!authId || !authPass) return res.status(401).send(authError)
          break
      }

      /* TODO Turn auth into JSON and add the token */
      const user = authId.toJSON()
      const token = jwtSign(user)

      /* TODO: Send the response */
      res.send({
        user: user,
        token: token
      })
    } catch (err) {
      console.log(err)
    }
  }
}
