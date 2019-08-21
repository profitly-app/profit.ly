const React = require('react')

const Sidebar = (p) => (
    <div className="account-sidebar">
        <ul>
            <li className={`${p.activePage === 'profile' ? 'active' : ''}`}>
                <a href="/account/profile">
                    Profile
                </a>
            </li>
            <li className={`${p.activePage === 'notifications' ? 'active' : ''}`}>
                <a href="/account/notifications">
                    Notifications
                </a>
            </li>
            <li className={`${p.activePage === 'address' ? 'active' : ''}`}>
                <a href="/account/address">
                    Address
                </a>
            </li>
            <li className={`${p.activePage === 'payment' ? 'active' : ''}`}>
                <a href="/account/payment">
                    Payment
                </a>
            </li>
            <li className={`${p.activePage === 'supply' ? 'active' : ''}`}>
                <a href="/account/supply-account">
                    Supply Account
                </a>
            </li>
        </ul>
    </div>
)

module.exports = Sidebar