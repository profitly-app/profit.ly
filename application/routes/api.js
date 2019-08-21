const bunyan = require('bunyan')
const Category = require('../database/Category')
const Collection = require('../database/Collection')
const Product = require('../database/Product')
const Stripe = require('stripe')
const User = require('../database/User')

const {
    checkLoggedIn,
} = require('./helpers')

const log = bunyan.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    name: 'Profitly.Api',
})

const parseSubscription = (subscription = {}) => {

    const items = subscription.items || []

    const data = items.data || []
    let planDataObj = {},
        planInfo = {}
    if(data.length > 0) {
        planDataObj = data[0] || {}
    }

    planInfo = planDataObj.plan || {}

    let dt,
        readableRenewalDate = ''
    if(typeof subscription.current_period_end !== 'undefined') {
        dt = new Date(subscription.current_period_end * 1000)
    }

    if(typeof dt !== 'undefined') {
        readableRenewalDate = `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`
    }

    const parsedSubscription = {
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        currentPeriodEnd: subscription.current_period_end,
        currentPeriodEndDt: dt,
        id: subscription.id,
        items: subscription.items,
        planAmount: planInfo.amount,
        planId: planInfo.id,
        planInterval: planInfo.interval,
        planIntervalCount: planInfo.interval_count,
        planName: planInfo.name,
        readableRenewalDate,
        status: subscription.status,
    }

    return parsedSubscription
}

const sortList = [
    { id: 0, key: 'rank', name: 'Ranking' },
    { id: 1, key: 'orders', name: 'Orders' },
    { id: 2, key: 'reviewsCount', name: 'Reviews Count' },
    { id: 3, key: 'supplierScore', name: 'Supplier Score' },
    { id: 4, key: 'price', name: 'Price' },
    { id: 5, key: 'reviewScore', name: 'Review Score' },
]

const router = (app, config) => {

    const stripeInst = Stripe(config.stripeSecretKey)

    app.get('/api/account/collection', checkLoggedIn, (req, res, next) => {

        try {

            const {
                collectionId,
            } = req.query

            // TODO: Add check that the user owns this collection

            let isLocked = false

            User.findOne({ _id: req.user._id })
                .then((user) => {

                    if(!user) {
                        throw new Error('User not found')
                    }

                    isLocked = user.type === 'FREE'

                    return Collection.findOne({ _id: collectionId })
                        .populate('products')
                        .exec()
                }).then((collection) => {

                    let imageUrl
                    if(collection.products.length > 0) {
                        imageUrl = collection.products[0].imageUrl
                    }

                    const products = collection.products.map((product, i) => {
                        return {
                            aliExpressUrl: product.aliExpressUrl,
                            blueRibbon: product.blueRibbon,
                            greenRibbon: product.greenRibbon,
                            imageUrl: product.imageUrl,
                            locked: isLocked === true && i >= 25,
                            orders: product.orders,
                            price: product.price,
                            productId: product['_id'],
                            rank: product.rank,
                            reviewScore: product.reviewScore,
                            reviewsCount: product.reviewsCount,
                            supplierScore: product.supplierScore,
                            title: product.title,
                        }
                    })

                    res.send({
                        collection: {
                            imageUrl,
                            name: collection.name,
                            products,
                        },
                    })
                })
                .catch((err) => {
                    log.error(err)
                    res.status(500).send('Error')
                })

        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })

    app.get('/api/account/collections', checkLoggedIn, (req, res, next) => {

        try {

            User.findOne({ _id: req.user._id })
                .populate('collections')
                .exec()
                .then(({ collections }) => {
                    res.send({
                        collections: collections.map((collection) => {
                            return {
                                id: collection._id,
                                name: collection.name,
                                products: collection.products
                            }
                        })
                    })
                })
                .catch((err) => {
                    log.error(err)
                    res.status(500).send('Error')
                })
        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/api/account/product/save', checkLoggedIn, (req, res, next) => {

        const {
            id
        } = req.query

        try {

            User.updateOne(
                { _id: req.user._id },
                { $push: { products: [id] }}
            ).then((user) => {
                res.status(204).send()
            }).catch((err) => {
                log.error(err)
                res.status(500).send('Error')
            })
        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/api/account/product/unsave', checkLoggedIn, (req, res, next) => {

        const {
            id
        } = req.query

        try {

            User.updateOne(
                { _id: req.user._id },
                { $pullAll: { products: [id] }}
            ).then((user) => {
                res.status(204).send()
            }).catch((err) => {
                log.error(err)
                res.status(500).send('Error')
            })
        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/api/account/collections/create', checkLoggedIn, (req, res, next) => {

        const {
            newCollectionName
        } = req.query

        try {

            const collection = new Collection({
                name: newCollectionName
            })

            collection.save().then((result) => {

                return User.updateOne(
                    { _id: req.user._id },
                    { $push: { collections: [result._id] }}
                )
            }).then((user) => {
                res.status(204).send()
            }).catch((err) => {
                log.error(err)
                res.status(500).send('Error')
            })
        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/api/account/collections/delete', checkLoggedIn, (req, res, next) => {

        const {
            collectionId,
        } = req.query

        try {

            // no-op for now
            res.status(204).send()
        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/api/account/collections/products/add', checkLoggedIn, (req, res, next) => {

        const {
            collectionId,
            productId
        } = req.query

        try {

            Collection.updateOne(
                { _id: collectionId },
                { $push: { products: [productId] }}
            ).then((result) => {
                res.status(204).send()
            }).catch((err) => {
                log.error(err)
                res.status(500).send('Error')
            })
        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/api/account/collections/products/remove', checkLoggedIn, (req, res, next) => {

        const {
            collectionId,
            productId
        } = req.query

        try {

            Collection.updateOne(
                { _id: collectionId },
                { $pullAll: { products: [productId] }}
            ).then((result) => {
                res.status(204).send()
            }).catch((err) => {
                log.error(err)
                res.status(500).send('Error')
            })
        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/api/account/saved-products', checkLoggedIn, (req, res, next) => {

        try {

            User.findOne({ _id: req.user._id })
                .populate('products')
                .exec()
                .then(({ products }) => {
                    res.send({ products })
                })
                .catch((err) => {
                    log.error(err)
                    res.status(500).send('Error')
                })

        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.post('/api/subscription', checkLoggedIn, (req, res, next) => {

        try {

            const {
                plan,
                token
            } = req.body

            let customerObj = {}

            const planMap = {
                monthly: 'plan_FJCu3aiJrw0u5C',
                yearly: 'plan_FJCudOXT4iRNEd'
            }

            // {
            //     "name": "Steven Wright",
            //     "email": "stevus06@gmail.com",
            //     "phone": "5207057895",
            //     "token": {
            //         "id": "tok_1DUMwsJhQj0ZpPZdMx2f3XZS",
            //         "object": "token",
            //         "card": {
            //             "id": "card_1DUMwsJhQj0ZpPZdrWjieDk0",
            //             "object": "card",
            //             "address_city": null,
            //             "address_country": null,
            //             "address_line1": null,
            //             "address_line1_check": null,
            //             "address_line2": null,
            //             "address_state": null,
            //             "address_zip": "12334",
            //             "address_zip_check": "unchecked",
            //             "brand": "Visa",
            //             "country": "US",
            //             "cvc_check": "unchecked",
            //             "dynamic_last4": null,
            //             "exp_month": 12,
            //             "exp_year": 2022,
            //             "funding": "unknown",
            //             "last4": "1111",
            //             "metadata": {},
            //             "name": "Steven Wright",
            //             "tokenization_method": null
            //         },
            //         "client_ip": "98.244.46.16",
            //         "created": 1541719806,
            //         "livemode": false,
            //         "type": "card",
            //         "used": false
            //     }
            // }

            User.findOne({ _id: req.user._id })
                .then((user) => {

                    let email
                    if(user.local && user.local.email) {
                        email = user.local.email
                    } else if(user.facebook && user.facebook.email) {
                        email = user.facebook.email
                    } else if(user.google && user.google.email) {
                        email = user.google.email
                    }

                    if(typeof email === 'undefined' || email === '') {
                        throw new Error('No email provided - cannot create subscription')
                    }

                    // https://stripe.com/docs/api#create_customer
                    return stripeInst.customers.create({
                        email,
                        source: token.id,
                    })
                }).then((customer) => {

                    customerObj = customer

                    // https://stripe.com/docs/api#create_subscription
                    return stripeInst.subscriptions.create({
                        customer: customer.id,
                        items: [
                            {
                                plan: planMap[plan],
                            }
                        ]
                    })
                }).then((subscription) => {

                    return User.updateOne(
                        { _id: req.user._id },
                        {
                            $set: {
                                stripe: {
                                    customer: customerObj,
                                    subscription,
                                    token
                                }
                            }
                        }
                    )
                }).then((user) => {
                    res.status(204).send()
                }).catch((err) => {
                    log.error(err)
                    res.status(500).send('Error')
                })

        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/api/catalog/categories', checkLoggedIn, (req, res, next) => {

        try {

            Category.find((err, categories) => {
                res.send({ categories })
            })
        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/api/catalog/products', checkLoggedIn, (req, res, next) => {

        try {

            const {
                q,
                category,
                sort = 0
            } = req.query

            const findParms = {}
            let isLocked = false
            let products = []

            const sortKey = sortList[sort].key

            const sortParms = {}
            sortParms[sortKey] = 1

            if(typeof q !== 'undefined' && q !== '') {
                findParms.title = new RegExp(q, 'i')
            }
            if(typeof category !== 'undefined' && category !== '' && category !== '0') {
                findParms.categories = category
            }

            User.findOne({ _id: req.user._id })
                .then((user) => {

                    if(!user) {
                        throw new Error('User not found')
                    }

                    isLocked = user.type === 'FREE'

                    return Product.find(findParms, null, { sort: sortParms })
                }).then((result) => {
                    products = result.map((product, i) => {
                        return {
                            aliExpressUrl: product.aliExpressUrl,
                            blueRibbon: product.blueRibbon,
                            greenRibbon: product.greenRibbon,
                            imageUrl: product.imageUrl,
                            locked: isLocked === true && i >= 25,
                            orders: product.orders,
                            price: product.price,
                            productId: product['_id'],
                            rank: product.rank,
                            reviewScore: product.reviewScore,
                            reviewsCount: product.reviewsCount,
                            supplierScore: product.supplierScore,
                            title: product.title,
                        }
                    })
                    return User.findOne({ _id: req.user._id })
                })
                .then((user) => {
                    res.send({
                        products,
                        savedProducts: user.products
                    })
                })
                .catch((err) => {
                    log.error(err)
                    res.status(500).send('Error')
                })

        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/api/catalog/sort', checkLoggedIn, (req, res, next) => {

        try {

            res.send({ sort: sortList })
        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.get('/api/catalog/initialize', checkLoggedIn, (req, res, next) => {

        try {
            const categories = require('../database/initialization/Categories.json')
            const products = require('../database/initialization/Products.json')
            Category.deleteMany({}).exec()
            Collection.deleteMany({}).exec()
            Product.deleteMany({}).exec()
            User.deleteMany({}).exec()

            for(let i = 0; i < categories.length; i++) {
            	new Category(categories[i]).save()
            }
            for(let i = 0; i < products.length; i++) {
            	new Product(products[i]).save()
            }
            res.send({})
        } catch (e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
    app.post(config.stripeWebhookUrl, (req, res, next) => {

        // Stripe WebHook endpoint
        try {

            const {
                data,
                type,
            } = req.body || {}

            const eventData = data || {}
            const subscription = parseSubscription(eventData.object || {})

            if(typeof subscription.id === 'undefined') {
                throw new Error('Stripe subscription did not contain a subscription id')
            }

            // https://stripe.com/docs/api#event_types
            switch (type) {
                case 'customer.subscription.created':

                    User.findOne({ 'stripe.ubscription.id': subscription.id })
                        .then((user) => {

                            if(!user) {
                                throw new Error('Could not find user associated with subscription')
                            }

                            const autoRenew = ['monthly', 'yearly'].indexOf(subscription.planId) >= 0

                            return User.update({ _id: user._id }, { $set: {
                                stripe: {
                                    paidUntilDate: new Date(subscription.currentPeriodEnd * 1000),
                                    subscription,
                                    autoRenew,
                                },
                                type: 'PREMIUM',
                            }})
                        }).then(() => {
                            res.status(204).send()
                        }).catch((err) => {
                            log.error(err)
                            res.status(500).send('Error')
                        })
                    break
                case 'invoice.payment_failed':
                case 'customer.subscription.deleted':

                    User.findOne({ 'stripe.ubscription.id': subscription.id })
                        .then((user => {

                            if(!user) {
                                throw new Error('Could not find user associated with subscription')
                            }

                            return User.update({ _id: user._id }, { $set: {
                                stripe: {
                                    customer: undefined,
                                    subscription: undefined
                                },
                                type: 'FREE',
                            }})
                        })).then(() => {
                            res.status(204).send()
                        }).catch((err) => {
                            log.error(err)
                            res.status(500).send('Error')
                        })
                    break
                case 'customer.subscription.updated':

                    //  https://stripe.com/docs/subscriptions/webhooks#tracking
                    User.findOne({ 'stripe.ubscription.id': subscription.id })
                        .then((user) => {

                            if(!user) {
                                throw new Error('Could not find user associated with subscription')
                            }

                            //  pastdue/canceled/unpaid - make sure the user subscription is set to free until it is made current
                            //  active - make sure we activate the subscription here
                            const newType = subscription.status === 'active'
                                ? 'PREMIUM'
                                : 'FREE';

                            return User.update({ _id: user._id }, { $set: {
                                stripe: {
                                    paidUntilDate: new Date(subscription.currentPeriodEnd * 1000),
                                    subscription: subscription.status === 'active'
                                        ? subscription
                                        : undefined
                                },
                                type: newType,
                            }})
                        }).then(() => {
                            res.status(204).send()
                        }).catch((err) => {
                            log.error(err)
                            res.status(500).send('Error')
                        })
                    break
                case 'invoice.upcoming':
                    // Will receive this a few days prior to subscription renewal
                    // TODO: Possible oppo to remind customer
                    res.status(204).send()
                    break
                case 'invoice.payment_succeeded':
                    // Successful payment of subscription
                    // TODO: go in and update the date the user is allowed to use their subscription until
                    res.status(204).send()
                    break
                case 'invoice.created':
                    // I think Stripe just looks for a successful response from this that shows
                    // the app support webhooks (same as the `ping` event)
                    res.status(204).send()
                    break;
                case 'payout.paid':
                    // TODO: Implement this
                    // Stripe sent in a test payload of:
                    // {
                    //   "object": {
                    //     "id": "po_1B3WFcJhQj0ZpPZd6w3PK3v9",
                    //     "object": "payout",
                    //     "amount": 941,
                    //     "arrival_date": 1505779200,
                    //     "balance_transaction": "txn_1B3WFcJhQj0ZpPZd25EO5wSE",
                    //     "created": 1505768036,
                    //     "currency": "usd",
                    //     "description": "STRIPE TRANSFER",
                    //     "destination": "ba_1AgopSJhQj0ZpPZdTA9RSw8L",
                    //     "failure_balance_transaction": null,
                    //     "failure_code": null,
                    //     "failure_message": null,
                    //     "livemode": false,
                    //     "metadata": {
                    //     },
                    //     "method": "standard",
                    //     "source_type": "card",
                    //     "statement_descriptor": null,
                    //     "status": "in_transit",
                    //     "type": "bank_account"
                    //   },
                    //   "previous_attributes": null
                    // }
                    // From: https://dashboard.stripe.com/test/events/evt_1B3WFcJhQj0ZpPZdGuP0vEaX
                    res.status(204).send()
                    break
                case 'ping':
                    res.status(204).send()
                    break
                default:
                    // Stripe sent us an unexpected WebHook
                    res.status(404).send()
                    break
            }

        } catch(e) {
            log.error(e)
            res.status(500).send('Error')
        }
    })
}

module.exports = router