const AccountFooter = require('../../AccountFooter')
const AccountHeader = require('../../AccountHeader')
const React = require('react')
const Sidebar = require('./Sidebar')

const SupplyAccount = (p) => (
    <div className="page">
        <AccountHeader />
        <section>
            <div className="container">
                <div className="row">
                    <div className="settings-container">
                        <Sidebar activePage="supply" />
                        <div className="account-content">
                            <div className="account-heading">
                                Subscription
                            </div>
                            <div className="account-subheading">
                                There is no Supply subscription on this account.
                            </div>
                            <p>If you're trying to cancel an active subscription, log into another account or contact support.</p>
                            <p>If you would like to sign up to a new subscription, <a href="/account/payment">click here.</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <AccountFooter />
    </div>
)

module.exports = SupplyAccount