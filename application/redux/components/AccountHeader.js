const MyAccountDropdown = require('./MyAccountDropdown')
const React = require('react')

const AccountHeader = () => (
    <header>
        <div className="container">
            <div className="row">
                <div className="header-container">
                    <img src="https://profitly.app/wp-content/uploads/2019/05/logo-big.png" />
                    <ul className="menu-left">
                        <li>
                            <a href="#">Features</a>
                        </li>
                        <li>
                            <a href="#">How It Works</a>
                        </li>
                        <li>
                            <a href="#">Pricing</a>
                        </li>
                    </ul>
                    <ul className="menu-right">
                        <li>
                            <a href="/about">About Us</a>
                        </li>
                        <li>
                            <a href="/affiliates">Affiliates</a>
                        </li>
                    </ul>
                    <MyAccountDropdown />
                </div>
            </div>
        </div>
    </header>
)

module.exports = AccountHeader