const { teacher, school, room, student, task } = require('../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const { id, schoolId } = req.query

      console.log(req.query)
      console.log(req.query)
      console.log(req.query)
      console.log(req.query)
      console.log(req.query)

      const teachers = await teacher.findOne({
        where: {
          idNumber: id,
          schoolIdNumber: schoolId,
        },
        include: [
          {
            model: room,
            as: 'class',
          },
          {
            model: school,
          },
          {
            model: student,
          },
          {
            model: task,
          },
        ],
      })

      if (!teachers) {
        return res.status(400).send({
          error: 'Data cannot be found',
        })
      }

      // if (!id || !schoolId) {
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

      res.send(teachers)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Error fetching teacher',
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
