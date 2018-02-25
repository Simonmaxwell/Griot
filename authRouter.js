const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('./user-schema');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }


      if (!user.comparePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
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
));
