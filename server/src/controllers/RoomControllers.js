const { teacher, school, room, student } = require('../models')
// const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const { id, schoolId } = req.query

      console.log(req.query)
      console.log(req.query)
      console.log(req.query)
      console.log(req.query)
      console.log(req.query)

      const rooms = await room.findOne({
        where: {
          idNumber: id,
        },
        include: [
          {
            model: school,
            where: {
              idNumber: schoolId,
            },
          },
          {
            model: teacher,
            where: {
              schoolIdNumber: schoolId,
            },
          },
          {
            model: student,
            where: {
              schoolIdNumber: schoolId,
            },
          },
        ],
      })

      // if (!school) {
      //   res.status(400).send({
      //     error: 'School Table is Null',
      //   })
      // }
      // .map((teacher) => teacher.toJSON())
      // .map((teacher) =>
      //   _.extend(
      //     {
      //       schoolName: teacher.School.name,
      //     },
      //     teacher
      //   )
      // )

      res.send(rooms)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Error fetching user',
      })
    }
  },
  async post(req, res) {
    try {
      const { name, gender, status, schoolId } = req.body

      if (name == null) {
        return res.status(400).send({
          error:
            'The authentication information was not provided in the correct format. Verify the value of Authorization header.',
        })
      }

      const teachers = await teacher.create({
        name: name,
        gender: gender,
        status: status,
        // teacherSchoolPrimaryId: schoolId,
        schoolPrimaryId: schoolId,
      })

      res.send(teachers)
    } catch (err) {
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
    }
  },
}
