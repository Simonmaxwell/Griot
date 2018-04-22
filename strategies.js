const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const {User} = require('./user-schema');
const {secret} = require('./config');


const localStrategy = new LocalStrategy(
  function(username, password, done) {
    //console.log("in the authrouter");
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      user.comparePassword(password, function(err, matched) {
        if (matched) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  }
);

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    algorithms: ['HS256']
  },
  (payload, done) => {
    done(null, payload.user);
  }
);

module.exports = { localStrategy, jwtStrategy };
