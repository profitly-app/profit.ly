const React = require('react')

const AccountFooter = (p) => (
    <footer className={`${p.isColorInverted === true ? 'isColorInverted' : ''}`}>
        <div className="footer-container">
            <ul className="menu-left">
                <li>
                    <a href="/link">Features</a>
                </li>
                <li>
                    <a href="/link">Pricing</a>
                </li>
                <li>
                    <a href="/link">Affiliates</a>
                </li>
                <li>
                    <a href="/link">Press</a>
                </li>
            </ul>
            <img src="https://profitly.app/wp-content/uploads/2019/05/logo-big.png" />
            <ul className="menu-right">
                <li>
                    <a href="/about">About Us</a>
                </li>
                <li>
                    <a href="/cookies">Cookies</a>
                </li>
                <li>
                    <a href="/terms-of-service">Terms of Service</a>
                </li>
                <li>
                    <a href="/privacy-policy">Privacy Policy</a>
                </li>
            </ul>
        </div>
    </footer>
)

module.exports = AccountFooter