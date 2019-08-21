const Address = require('../redux/components/pages/settings/Address')
const bunyan = require('bunyan')
const Collection = require('../redux/components/pages/account/Collection')
const Collections = require('../redux/components/pages/account/Collections')
const Listings = require('../redux/components/pages/account/Listings')
const Notifications = require('../redux/components/pages/settings/Notifications')
const Payment = require('../redux/components/pages/settings/Payment')
const Profile = require('../redux/components/pages/settings/Profile')
const Saved = require('../redux/components/pages/account/Saved')
const Subscription = require('../redux/components/pages/account/Subscription')
const SupplyAccount = require('../redux/components/pages/settings/SupplyAccount')
const User = require('../database/User')

const {
    checkLoggedIn,
    serveTemplate
} = require('./helpers')

const log = bunyan.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    name: 'Profitly.Account',
})

const router = (app, config) => {
    app.get('/account', checkLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Listings, {
            page: 'listings'
        }, 'index')
    })
    app.get('/account/address', checkLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Address, {
            page: 'address'
        }, 'index')
    })
    app.get('/account/collections', checkLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Collections, {
            page: 'collections'
        }, 'index')
    })
    app.get('/account/collections/:collectionId', checkLoggedIn, (req, res, next) => {
        const {
            collectionId
        } = req.params
        serveTemplate(config, res, Collection, {
            collectionId,
            page: 'collection'
        }, 'index')
    })
    app.get('/account/notifications', checkLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Notifications, {
            page: 'notifications'
        }, 'index')
    })
    app.get('/account/payment', checkLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Payment, {
            page: 'payment'
        }, 'index')
    })
    app.get('/account/profile', checkLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Profile, {
            page: 'profile'
        }, 'index')
    })
    app.get('/account/saved', checkLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Saved, {
            page: 'saved'
        }, 'index')
    })
    app.get('/account/settings', checkLoggedIn, (req, res, next) => {
        serveTemplate(config, res, Settings, {
            page: 'settings'
        }, 'index')
    })
    app.get('/account/subscription', checkLoggedIn, (req, res, next) => {

        try {

            User.findOne({ _id: req.user._id })
                .then((user) => {

                    if(!user) {
                        throw new Error('User not found')
                    }

                    // Customer already has a subscription
                    if(user.type === 'PREMIUM') {
                        res.redirect('/account')
                        return
                    }

                    let name
                    if(user.facebook && user.facebook.name) {
                        name = user.facebook.name
                    } else if(user.google && user.google.name) {
                        name = user.google.name
                    }

                    if(typeof name === 'undefined') {

                        if(user.local && user.local.email) {
                            name = user.local.email
                        } else if(user.facebook && user.facebook.email) {
                            name = user.facebook.email
                        } else if(user.google && user.google.email) {
                            name = user.google.email
                        }
                    }

                    serveTemplate(config, res, Subscription, {
                        name,
                        page: 'subscription',
                        publishableKey: config.stripePublishableKey
                    }, 'payment')
                }).catch((err) => {
                    log.error(err)
                    res.status(500).send('Error')
                })
        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/account/supply-account', checkLoggedIn, (req, res, next) => {
        serveTemplate(config, res, SupplyAccount, {
            page: 'supplyAccount'
        }, 'index')
    })
}

module.exports = router