import rootReducer from '../reducers'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { ajaxListener } from '../middleware/listeners/Ajax'
import eventListener from '../middleware/listeners/Event'
import listenerMiddleware from '../middleware/Listener'

const configureStore = (initialState) => {

    let middleware = [
        listenerMiddleware(
            ajaxListener,
            eventListener
        ),
    ]

    if (process.env.NODE_ENV !== 'production') {
        middleware = [
            ...middleware,
            createLogger()
        ]
    }

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    )

    return store
}

module.exports = configureStore
