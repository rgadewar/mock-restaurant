const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require('path');
const db = require(path.join(__dirname, '../models'));
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Corrected to "email"
    },
    (email, password, done) => {
      db.User.findOne({
        where: {
          email: email, // Corrected to "email"
        },
      }).then((dbUser) => {
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email.",
          });
        } else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        return done(null, dbUser);
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
