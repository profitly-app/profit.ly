const CustomersGallery = require('../../CustomersGallery')
const React = require('react')
const StarRating = require('../../StarRating')

const Continue = () => (
    <div className="page">
        <div className="product-tile-background" />
        <header className="section-auth">
            <div className="auth-container">
                <img src="https://profitly.app/wp-content/uploads/2019/04/logo-profitly-2-1.png" />
            </div>
        </header>
        <section className="section-auth">
            <div className="auth-container">
                <CustomersGallery />
                <div className="typ-h3">
                    Sign-up to see the world's best-selling products.
                </div>
                <StarRating />
                <div className="login-form">
                    <a className="comp-button comp-button-green"
                        href="/register"
                    >
                        Continue with Email
                    </a>
                    <a className="comp-button comp-button-facebook"
                        href="/auth/facebook"
                    >
                        <span className="comp-button-prefix-icon">
                            <img src="/images/facebook-icon.png" />
                        </span>
                        Continue with Facebook
                    </a>
                    <a className="comp-button comp-button-google"
                        href="/auth/google"
                    >
                        <span className="comp-button-prefix-icon">
                            <img src="/images/google-icon.png" />
                        </span>
                        Continue with Google
                    </a>
                    <div className="login-form-sep" />
                    <a className="comp-button comp-button-white"
                        href="/login"
                    >
                        Login
                    </a>
                    <p className="typ-body typ-muted">
                        By continuing, you agree to Profitly's <a href="/terms-of-service">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>, and to receiving marketing emails from Profitly.
                    </p>
                </div>
            </div>
        </section>
        <footer className="section-auth">
            <div className="auth-container">
                <img src="https://profitly.app/wp-content/uploads/2019/05/shopify-partners-lg.png" />
            </div>
        </footer>
    </div>
)

module.exports = Continue