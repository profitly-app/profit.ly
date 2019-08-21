const React = require('react')

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const Products = require('../components/pages/mgmt/Products')

class App extends React.Component {

    render () {

        const boundActions = bindActionCreators(
            Actions,
            this.props.dispatch
        )

        return (
            <Products
                {...this.props}
                {...boundActions}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const ConnectedApp = connect(mapStateToProps)(App)

module.exports = ConnectedApp