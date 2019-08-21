const CustomersGallery = require('../../CustomersGallery')
const React = require('react')
const StarRating = require('../../StarRating')

const Entry = (p) => (
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
                    "The best products, from the best sites, all in one place."
                </div>
                <StarRating />
                <div className="login-form">
                    <a className="comp-button comp-button-green"
                        href="/continue"
                    >
                        Sign-Up Free
                    </a>
                    <button className="comp-button comp-button-white"
                        onClick={p.onClickPlayVideoButton}
                    >
                        Play Video
                    </button>
                    <p className="typ-body typ-muted">
                        Already have an account? <a href="/login">Sign in.</a>
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

module.exports = Entry