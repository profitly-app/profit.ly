const React = require('react')

let message
if(typeof document !== 'undefined') {
    const tag = document.head.querySelector('meta[name="message"]')
    if(tag !== null) {
        message = tag.getAttribute('content')
    }
}

const Register = (p) => (
    <div className="page">
        <div className="product-tile-background" />
        <header className="section-auth">
            <div className="auth-container">
                <img src="https://profitly.app/wp-content/uploads/2019/04/logo-profitly-2-1.png" />
            </div>
        </header>
        <section className="section-auth">
            <div className="auth-container">
                <div className="login-form">
                    {typeof message !== 'undefined' && message !== ''
                        ? (
                            <div className="auth-message">
                                {message}
                            </div>
                        ) : false}
                    <form action="/register" method="POST">
                        <div className="form-input-label">
                            Enter your First and Last Name:
                        </div>
                        <div className="form-col-2">
                            <div className="form-col">
                                <div className="form-text-input">
                                    <input
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                    />
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="form-text-input">
                                    <input
                                        name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-input-label">
                            Enter your Email Address:
                        </div>
                        <div className="form-text-input">
                            <input
                                name="email"
                                type="text"
                                placeholder="johnsmith@gmail.com"
                            />
                        </div>
                        <div className="form-input-label">
                            Create password:
                        </div>
                        <div className="form-text-input">
                            <input
                                name="password"
                                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                type="password"
                            />
                        </div>
                        <div className="form-input-label">
                            Confirm password:
                        </div>
                        <div className="form-text-input">
                            <input
                                name="confirmPassword"
                                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                type="password"
                            />
                        </div>
                        <button className="comp-button comp-button-green"
                            type="submit"
                        >
                            Sign-Up
                        </button>
                        <p className="typ-body typ-muted">
                            By continuing, you agree to Profitly's Terms of Service and Privacy Policy, and to receiving marketing emails from Profitly.
                        </p>
                    </form>
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

module.exports = Register