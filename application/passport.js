const bunyan = require('bunyan')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const User = require('./database/User')

const log = bunyan.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    name: 'Profitly.Passport',
})

const passportRouter = (config, passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            if(err) {
                log.error(err)
            }
            done(err, user)
        })
    })
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {

        User.findOne({ 'local.email' :  email }, (err, user) => {
            if (err) {
                log.error('error')
                log.error(err)
                return done(err)
            }

            if (!user) {
                log.error('no user')
                return done(null, false, req.flash('authMessage', 'We could not find a user with that email or password.'))
            }

            if (!user.validPassword(password)) {
                log.info('wrong password')
                return done(null, false, req.flash('authMessage', 'We could not find a user with that email or password.'))
            }

            return done(null, user)
        })
    }))

    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {

        User.findOne({ 'local.email':  email }, (err, user) => {
            if (err) {
                log.error('error')
                log.error(err)
                return done(err)
            }

            if (user) {
                log.info('Email already in use')
                return done(null, false, req.flash('authMessage', 'An account with that email address is in use. Please try another one.'))
            } else {

                const newUser = new User()

                newUser.local.email = email
                newUser.local.password = newUser.generateHash(password)
                newUser.type = 'FREE'

                newUser.save((err) => {
                    if (err) {
                        log.error(err)
                        throw err
                    }

                    return done(null, newUser)
                })
            }
        })
    }))

    passport.use(new FacebookStrategy({
        clientID: config.facebookAuthClientID,
        clientSecret: config.facebookAuthClientSecret,
        callbackURL: `${config.baseAppDomain}${config.facebookAuthCallbackURL}`
    }, (token, refreshToken, profile, done) => {

        User.findOne({ 'facebook.id': profile.id }, (err, user) => {

            if (err) {
                log.error('error')
                log.error(err)
                return done(err)
            }

            if (user) {
                return done(null, user)
            } else {
                const newUser = new User();

                newUser.facebook.id = profile.id
                newUser.facebook.token = token
                newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
                newUser.type = 'FREE'

                if(typeof profile.emails !== 'undefined'
                    && profile.emails.length > 0
                    && profile.emails[0].value
                ) {
                    newUser.facebook.email = profile.emails[0].value
                }

                newUser.save((err) => {
                    if (err) {
                        log.lerror(err)
                        throw err
                    }

                    return done(null, newUser)
                });
            }
        })
    }))

    passport.use(new GoogleStrategy({
        clientID: config.googleAuthClientID,
        clientSecret: config.googleAuthClientSecret,
        callbackURL: `${config.baseAppDomain}${config.googleAuthCallbackURL}`
    }, (token, refreshToken, profile, done) => {

        User.findOne({ 'google.id': profile.id }, (err, user) => {
            if (err) {
                log.error('error')
                log.error(err)
                return done(err)
            }

            if (user) {
                return done(null, user)
            } else {
                const newUser = new User()

                newUser.google.id = profile.id
                newUser.google.token = token
                newUser.google.name = profile.displayName
                newUser.type = 'FREE'
                
                if(typeof profile.emails !== 'undefined'
                    && profile.emails.length > 0
                    && profile.emails[0].value
                ) {
                    newUser.google.email = profile.emails[0].value
                }

                newUser.save((err) => {
                    if (err) {
                        log.error(err)
                        throw err
                    }
                    return done(null, newUser)
                })
            }
        })
    }))
}

module.exports = passportRouter