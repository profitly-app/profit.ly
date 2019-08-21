import fetch from 'isomorphic-fetch'
import * as types from '../../constants/ActionTypes'

const encodeQueryParams = (params) => {

    const result = []
    let param

    for (param in params) {
        if(typeof param !== 'undefined') {
            result.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]))
        }
    }

    return result.length > 0 ? '?' + result.join('&') : ''
}

export const fetchConfig = (url, method = 'GET') => {

    const config = {
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    }

    switch (method) {

    case 'POST':
    case 'PUT':
        return Object.assign(
            {},
            config,
            { url },
            {
                headers: Object.assign(
                    {},
                    config.headers,
                    { 'Content-Type': 'application/json' }
                ),
                method,
            }
        )

    default:
        return Object.assign(
            {},
            config,
            { url }
        )
    }
}

export const ajaxAsync = (baseUrl, method = 'GET') => {

    return async (action, dispatch, state) => {

        const {
            fail,
            next,
            payload
        } = action

        let url = baseUrl

        const config = fetchConfig(url, method)

        if(typeof config === 'undefined') {
            throw new Error(`No config provided for "${action.type}"`)
        }

        if(method === 'GET' && payload) {
            url = `${url}${encodeQueryParams(payload)}`
        } else if(config && payload) {
            config.body = JSON.stringify(payload)
        }

        let request
        let response

        try {
            request = await fetch(url, config)
        } catch(error) {

            dispatch(fail({
                config,
                error,
                url
            }))
        }

        if (request.ok === false) {
            const errorString = `Status: ${request.status}
Message: ${request.statusText}
URL: ${request.url}`
            dispatch(fail({
                config,
                error: new Error(errorString),
                url
            }))
            return
        }

        try {

            if(request.status === 204) {
                response = {}
            } else {
                response = await request.json()
            }
        } catch(error) {

            dispatch(fail({
                config,
                error,
                url
            }))
        }

        if(typeof next === 'function') {
            dispatch(next(response))
        }
    }
}

export const ajaxListener = {
    [types.AJAX_ADD_COLLECTION]: ajaxAsync('/api/account/collections/create'),
    [types.AJAX_ADD_PRODUCT_TO_COLLECTION]: ajaxAsync('/api/account/collections/products/add'),
    [types.AJAX_CREATE_SUBSCRIPTION]: ajaxAsync('/api/subscription', 'POST'),
    [types.AJAX_GET_CATEGORIES]: ajaxAsync('/api/catalog/categories'),
    [types.AJAX_GET_COLLECTION]: ajaxAsync('/api/account/collection'),
    [types.AJAX_GET_COLLECTIONS]: ajaxAsync('/api/account/collections'),
    [types.AJAX_GET_PRODUCTS]: ajaxAsync('/api/catalog/products'),
    [types.AJAX_GET_SAVED_PRODUCTS]: ajaxAsync('/api/account/saved-products'),
    [types.AJAX_GET_SORT]: ajaxAsync('/api/catalog/sort'),
    [types.AJAX_REMOVE_PRODUCT_FROM_COLLECTION]: ajaxAsync('/api/account/collections/products/remove'),
    [types.AJAX_SAVE_PRODUCT]: ajaxAsync('/api/account/product/save'),
    [types.AJAX_UNSAVE_PRODUCT]: ajaxAsync('/api/account/product/unsave'),
    [types.AJAX_UPDATE_PRODUCT]: ajaxAsync('/mgmt/api/product', 'PUT'),
}