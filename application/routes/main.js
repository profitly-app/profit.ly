const About = require('../redux/components/pages/unauth/About')
const Affiliates = require('../redux/components/pages/unauth/Affiliates')
const Cookies = require('../redux/components/pages/unauth/Cookies')
const Continue = require('../redux/components/pages/auth/Continue')
const Entry = require('../redux/components/pages/auth/Entry')
const Login = require('../redux/components/pages/auth/Login')
const Press = require('../redux/components/pages/unauth/Press')
const PrivacyPolicy = require('../redux/components/pages/unauth/PrivacyPolicy')
const Register = require('../redux/components/pages/auth/Register')
const TermsOfService = require('../redux/components/pages/unauth/TermsOfService')

const {
    checkNotLoggedIn,
    serveTemplate
} = require('./helpers')

const router = (app, config, passport) => {
    app.get('/', checkNotLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Entry, {
            page: 'entry'
        }, 'index')
    })
    app.get('/about', (req, res, next) => {
        serveTemplate(config, res, About, {
            page: 'about'
        }, 'index')
    })
    app.get('/affiliates', (req, res, next) => {
        serveTemplate(config, res, Affiliates, {
            page: 'affiliates'
        }, 'index')
    })
    app.get('/cookies', (req, res, next) => {
        serveTemplate(config, res, Cookies, {
            page: 'cookies'
        }, 'index')
    })
    app.get('/continue', checkNotLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Continue, {
            page: 'continue'
        }, 'index')
    })
    app.get('/login', checkNotLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Login, {
            message: req.flash('authMessage'),
            page: 'login'
        }, 'index')
    })
    app.get('/press', (req, res, next) => {
        serveTemplate(config, res, Press, {
            page: 'press'
        }, 'index')
    })
    app.get('/privacy-policy', (req, res, next) => {
        serveTemplate(config, res, PrivacyPolicy, {
            page: 'privacy'
        }, 'index')
    })
    app.get('/register', checkNotLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Register, {
            message: req.flash('authMessage'),
            page: 'register'
        }, 'index')
    })
    app.get('/terms-of-service', (req, res, next) => {
        serveTemplate(config, res, TermsOfService, {
            page: 'terms'
        }, 'index')
    })
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/account',
        failureRedirect: '/login',
        failureFlash: true
    }))
    app.post('/register', passport.authenticate('local-register', {
        successRedirect: '/account',
        failureRedirect: '/register',
        failureFlash: true
    }))
    app.get('/forgot-password', (req, res, next) => {
       res.send('Forgot Password')
    })
    app.get('/logout', (req, res, next) => {
       req.logout()
       res.redirect('/')
    })
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }))
    app.get(config.facebookAuthCallbackURL, passport.authenticate('facebook', {
        successRedirect: '/account',
        failureRedirect: '/'
    }))
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))
    app.get(config.googleAuthCallbackURL, passport.authenticate('google', {
        successRedirect: '/account',
        failureRedirect: '/'
    }))
}

module.exports = router