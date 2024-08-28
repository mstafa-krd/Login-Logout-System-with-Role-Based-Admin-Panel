const localStrategy = require("passport-local").Strategy;
const mongosse = require("mongoose");
const bcrypt = require("bcrypt");
const user = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      //match the user
      user
        .findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "user isn't regesterd" });
          }
          //Match the password

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "wrong password" });
            }
          });
        })
        .catch((e) => console.log(e));
    })
  );

  //this is standard just ctrl c v
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const User = await user.findById(id); // Use async/await to handle the promise
      done(null, User);
    } catch (err) {
      done(err, null);
    }
  });
};
