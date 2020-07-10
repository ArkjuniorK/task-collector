// the models use
const { sequelize, school, room, subject } = require('../src/models')

const Promise = require('bluebird')
const Schools = require('./Schools.json')
const Rooms = require('./Rooms.json')
const Subjects = require('./Subject.json')

sequelize.sync({ force: true }).then(async function () {
  await Promise.all(
    Schools.map((School) => {
      school.create(School)
    })
  )

  await Promise.all(
    Rooms.map((Room) => {
      room.create(Room)
    })
  )

  await Promise.all(
    Subjects.map((Subject) => {
      subject.create(Subject)
    })
  )
})
