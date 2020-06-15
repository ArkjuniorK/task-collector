const { school, teacher } = require('../models')

module.exports = {
  async index(req, res) {
    try {
      const { id } = req.query

      const schools = await school.findOne({
        where: {
          idNumber: id,
        },
        // include could use the model
        // and the 'as' field that defined
        // in the school model
        include: [{ model: teacher }],
      })

      res.send(schools)
    } catch (err) {
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
    }
  },
  async post(req, res) {
    try {
      const { name, primaryId } = req.body

      const schools = await school.create({
        name: name,
        primaryId: primaryId,
      })
      res.send(schools)
    } catch (err) {
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
      console.log('Error', err)
    }
  },
}
