/* data model */
const { teacher, student } = require('./models')

/* passport and jsonwebtoken plugin */
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

/* config file */
const config = require('./config')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
    },
    async function (jwtPayload, done) {
      try {
        const teacherLog = await teacher.findOne({
          where: {
            idNumber: jwtPayload.id,
          },
        })

        if (!teacherLog) {
          return done(new Error(), false)
        }

        return done(null, teacherLog)
      } catch (err) {
        return done(new Error(), false)
      }
    }
  )
)

module.exports = null
