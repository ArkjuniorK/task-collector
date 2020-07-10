const { school } = require('../models')

module.exports = {
  async index(req, res) {
    try {
      const schoolList = await school.findAll()

      res.send(schoolList)
    } catch (err) {
      console.log(err)
    }
  },
}
