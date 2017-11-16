const passport = require('passport');
const User = require('../models/User');
const FbStrategy = require('passport-facebook').Strategy;


passport.use(new FbStrategy({
  clientID: "296039634221662",
  clientSecret: "d89ffe14f55ca8c0947bcd35375e9cff",
  callbackURL: "/"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));
