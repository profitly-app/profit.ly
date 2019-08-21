const React = require('react')
const StarRating = require('./StarRating')

const Footer = () => (
    <div className="sub-footer">
        <div className="container">
            <div className="row">
                <div className="sub-footer-container">
                    <div className="sub-footer-profitly">
                        <img className="profitly-logo" src="https://profitly.app/wp-content/uploads/2019/05/logo-big.png" />
                        <p>Profitly is an app that makes it easier for anyone to find the best products to sell online. The future of eCommerce.</p>
                        <img className="stripe" src="https://profitly.app/wp-content/uploads/2019/05/powered-by-stripe-lg.png" />
                    </div>
                    <div className="sub-footer-menu-listing">
                        <h5>FEATURES</h5>
                        <ul>
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
                    <div className="sub-footer-menu-listing">
                        <h5>PROFITLY</h5>
                        <ul>
                            <li>Pricing</li>
                            <li>
                                <a href="/about">About Us</a>
                            </li>
                            <li>
                                <a href="#">FAQ</a>
                            </li>
                            <li>
                                <a href="/press">Press</a>
                            </li>
                        </ul>
                    </div>
                    <div className="sub-footer-menu-listing">
                        <h5>PROFITLY INC.</h5>
                        <ul>
                            <li>75 Broadway</li>
                            <li>San Francisco, CA</li>
                            <li>94441</li>
                        </ul>
                    </div>
                    <div className="sub-footer-affiliates">
                        <StarRating />
                        <p>View a list of the world's 1,000 best-sellers.</p>
                        <button className="comp-button comp-button-white">
                            AFFILIATES
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

module.exports = Footer
