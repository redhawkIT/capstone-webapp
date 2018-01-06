/* Initializing passport.js */
import passport from 'passport'
import config from 'config'
import google from './google'
// import secondAuthMethod from './secondAuthMethod'

export default (app) => {
  /*
  Configure Passport authenticated session persistence.

  In order to restore authentication state across HTTP requests, Passport needs
  to serialize users into and deserialize users out of the session.  The
  typical implementation of this is as simple as supplying the user ID when
  serializing, and querying the user record by ID from the database when
  deserializing.
  */
  console.log('AUTH: Initializing authentication strategy')
  app.use(passport.initialize())
  app.use(passport.session())
  // Load strategies based on the env
  // tmobile(app, passport)
  config.has('prod')
    //  Add new auth strategies if necessary
    ? google(app, passport)
    : google(app, passport)
}
