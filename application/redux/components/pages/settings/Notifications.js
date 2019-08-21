const AccountFooter = require('../../AccountFooter')
const AccountHeader = require('../../AccountHeader')
const React = require('react')
const Sidebar = require('./Sidebar')

const Notifications = (p) => (
    <div className="page">
        <AccountHeader />
        <section>
            <div className="container">
                <div className="row">
                    <div className="settings-container">
                        <Sidebar activePage="notifications" />
                        <div className="account-content">

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <AccountFooter />
    </div>
)

module.exports = Notifications