const bunyan = require('bunyan')
const fs = require('fs')
const path = require('path')
const Product = require('../database/Product')
const Products = require('../redux/components/pages/mgmt/Products')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const {
    checkLoggedIn,
} = require('./helpers')

const log = bunyan.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    name: 'Profitly.Mgmt',
})

const router = (app, config) => {

    app.put('/mgmt/api/product', checkLoggedIn, (req, res, next) => {

        res.send({})
    })
    app.get('/mgmt/products', checkLoggedIn, (req, res, next) => {

        try {

            Product.find({}).then((result) => {
                const products = result.map((product, i) => {
                    return {
                        aliExpressUrl: product.aliExpressUrl,
                        blueRibbon: product.blueRibbon,
                        greenRibbon: product.greenRibbon,
                        imageUrl: product.imageUrl,
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
                fs.readFile(`${config.baseAppPath}/templates/mgmt.html`, 'utf8', (err, data) => {
                    if (err) {
                        log.error(err)
                        return res.status(500).send('An error occurred');
                    }

                    res.send(
                        data.replace(
                            '<div id="root"></div>',
                            `<div id="root">${ReactDOMServer.renderToString(React.createElement(Products))}</div>`
                        ).replace('PRODUCTS', JSON.stringify(products))
                    )
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
}

module.exports = router