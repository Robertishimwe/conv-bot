import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
const host = process.env.HOST;


passport.serializeUser(function ser(user, done) {
  done(null, user);
});

passport.deserializeUser(function deser(user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SEC,
      callbackURL: `${host}/api/auth/google/callback`,
      passReqToCallback: true,
    },
    function strat(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
