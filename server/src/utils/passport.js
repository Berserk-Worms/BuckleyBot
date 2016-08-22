import passport from 'passport';
import rp from 'request-promise';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const server = 'http://localhost:8080';
// Where to find the jwt on the request
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
};

// Create Jwt strategy for passport to use
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // Check if user id exists in db 
  let slackUserId = payload.sub;

  rp(`${server}/api/users/${slackUserId}`)
  .then(user => {
    user = JSON.parse(user);
    if (user) {
      // if user exists, call done w/ that user
      done(null, user);
    } else {
      // otherwise, call done without a user object
      done(null, false);
    }
  })
  .catch(err => {
    console.log('There was an error finding a user.');
    done(err, false);
  });
});

// Wire up passport with the strategy created ^
passport.use(jwtLogin);