module.exports = {
  async index(req, res) {
    try {
      const { type, idNumber } = req.params
      const { page } = req.query
      const perPage = 12
    } catch (err) {}
  },
}
