const bunyan = require('bunyan')
const fs = require('fs')
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const log = bunyan.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    name: 'Profitly.Helpers',
})

export const checkLoggedIn = (req, res, next) => {

    if(typeof req.user === 'undefined' || typeof req.user._id === 'undefined') {
        res.redirect('/')
        return
    }

    next()
}

export const checkNotLoggedIn = (req, res, next) => {

    if(typeof req.user !== 'undefined' && typeof req.user._id !== 'undefined') {
        res.redirect('/account')
        return
    }

    next()
}

export const serveTemplate = (config, res, Component, pageMeta, template) => {

    try {

        fs.readFile(`${config.baseAppPath}/templates/${template}.html`, 'utf8', (err, data) => {
            if (err) {
                log.error(err)
                return res.status(500).send('An error occurred');
            }

            const metaTags = Object.keys(pageMeta).reduce((curr, next) => {
                const metaValue = pageMeta[next]
                return `${curr}<meta name='${next}' content='${metaValue}' />`
            }, '')

            res.send(
                data.replace(
                    '<div id="root"></div>',
                    `<div id="root">${ReactDOMServer.renderToString(React.createElement(Component))}</div>`
                )
                .replace('styles.css', `${pageMeta.page}.css`)
                .replace('PAGE_META_TAGS', metaTags)
            )
        })
    } catch (e) {
        log.error(e)
        res.status(500).send('Error')
    }
}