const React = require('react')

const Footer = () => (
    <footer>
        <div className="container">
            <div className="row">
                <div className="footer-container">
                    <p>
                        Copyright <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> 2018 Profitly. All Rights reserved.
                    </p>
                    <img src="https://profitly.app/wp-content/uploads/2019/05/shopify-partners-lg.png" />
                    <ul className="menu-right">
                        <li>
                            <a href="#">Contact Us</a>
                        </li>
                        <li>
                            <a href="/terms-of-service">Terms of Service</a>
                        </li>
                        <li>
                            <a href="/privacy-policy">Privacy Policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
)

module.exports = Footer
