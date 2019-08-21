const React = require('react')

const HeaderContainer = () => (
    <div className="header-container">
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
        <img src="https://profitly.app/wp-content/uploads/2019/05/logo-big.png" />
        <ul className="menu-right">
            <li>
                <a href="/about">About Us</a>
            </li>
            <li>
                <a href="/affiliates">Affiliates</a>
            </li>
        </ul>
        <button className="comp-button comp-button-inverted">
            Get Profitly
        </button>
    </div>
)

module.exports = HeaderContainer