const React = require('react')

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const About = require('../components/pages/unauth/About')
const Address = require('../components/pages/settings/Address')
const Affiliates = require('../components/pages/unauth/Affiliates')
const Collections = require('../components/pages/account/Collections')
const Collection = require('../components/pages/account/Collection')
const Cookies = require('../components/pages/unauth/Cookies')
const Continue = require('../components/pages/auth/Continue')
const Entry = require('../components/pages/auth/Entry')
const Listings = require('../components/pages/account/Listings')
const Login = require('../components/pages/auth/Login')
const Notifications = require('../components/pages/settings/Notifications')
const Payment = require('../components/pages/settings/Payment')
const Press = require('../components/pages/unauth/Press')
const PrivacyPolicy = require('../components/pages/unauth/PrivacyPolicy')
const Profile = require('../components/pages/settings/Profile')
const Register = require('../components/pages/auth/Register')
const Saved = require('../components/pages/account/Saved')
const Subscription = require('../components/pages/account/Subscription')
const SupplyAccount = require('../components/pages/settings/SupplyAccount')
const TermsOfService = require('../components/pages/unauth/TermsOfService')

const components = {
    about: About,
    address: Address,
    affiliates: Affiliates,
    collection: Collection,
    collections: Collections,
    cookies: Cookies,
    'continue': Continue,
    entry: Entry,
    listings: Listings,
    login: Login,
    notifications: Notifications,
    payment: Payment,
    press: Press,
    privacy: PrivacyPolicy,
    profile: Profile,
    register: Register,
    saved: Saved,
    subscription: Subscription,
    supplyAccount: SupplyAccount,
    terms: TermsOfService,
}

const tag = document.head.querySelector('meta[name="page"]')
const Component = components[tag.getAttribute('content')]

class App extends React.Component {

    render () {

        const boundActions = bindActionCreators(
            Actions,
            this.props.dispatch
        )

        return (
            <Component
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