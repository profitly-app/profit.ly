import "core-js/stable"
import "regenerator-runtime/runtime"

const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const rootReducer = require('./reducers')
const Mgmt = require('./containers/Mgmt')
const configureStore = require('./store/ConfigureStore')

const products = window.products || []
const store = configureStore()

ReactDOM.hydrate(
    <Provider store={store}><Mgmt products={products} /></Provider>,
    document.getElementById('root')
)