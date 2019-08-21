const bodyParser = require('body-parser')
const bunyan = require('bunyan')
const cookieParser = require('cookie-parser')
const express = require('express')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const mongoDbSession = require('connect-mongodb-session')
const passport = require('passport')
const passportRouter = require('./passport')
const path = require('path')
const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')
const mainRouter = require('./routes/main')
const mgmtRouter = require('./routes/mgmt')
const session = require('express-session')

const log = bunyan.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    name: 'Profitly - Root',
})

const config = {
    baseAppDomain: process.env.BASE_APP_DOMAIN,
    baseAppPath: process.env.BASE_APP_PATH,
    nodePort: process.env.NODE_PORT,
    facebookAuthClientID: process.env.FACEBOOK_CLIENT_ID,
    facebookAuthClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    facebookAuthCallbackURL: process.env.FACEBOOK_CALLBACK_URL,
    googleAuthClientID: process.env.GOOGLE_CLIENT_ID,
    googleAuthClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleAuthCallbackURL: process.env.GOOGLE_CALLBACK_URL,
    mongoDbConnectionString: process.env.MONGO_DB_CONNECTION_STRING,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookUrl: process.env.STRIPE_WEBHOOK_URL
}

let i
for (i in config) {
    if (typeof config[i] === 'undefined') {
        log.error(`Configuration error: missing ${i}`)
        process.exit(1)
    }
}

const app = express()

const MongoDBStore = mongoDbSession(session)
const sessionStore = new MongoDBStore({
    uri: config.mongoDbConnectionString,
    collection: 'mySessions'
});

mongoose.connect(config.mongoDbConnectionString, { useNewUrlParser: true });

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'profitly',
    name: 'profitly',
    store: sessionStore,
    proxy: true,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

accountRouter(app, config)
apiRouter(app, config)
mainRouter(app, config, passport)
mgmtRouter(app, config)
passportRouter(config, passport)

app.use(express.static(`${config.baseAppPath}/public`))
app.listen(config.nodePort, () => {
    log.info(`Server running on port ${config.nodePort}`)
})