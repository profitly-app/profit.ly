import "core-js/stable"
import "regenerator-runtime/runtime"

const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const rootReducer = require('./reducers')
const App = require('./containers/App')
const configureStore = require('./store/ConfigureStore')

const store = configureStore()

ReactDOM.hydrate(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
)