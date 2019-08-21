const React = require('react')

let message
if(typeof document !== 'undefined') {
    const tag = document.head.querySelector('meta[name="message"]')
    if(tag !== null) {
        message = tag.getAttribute('content')
    }
}

const Login = (p) => (
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
                    <form action="/login" method="POST">
                        <div className="form-input-label">
                            Enter your Email Address:
                        </div>
                        <div className="form-text-input">
                            <input name="email"
                                type="text"
                                placeholder="johnsmith@gmail.com"
                            />
                        </div>
                        <div className="form-input-label">
                            Password:
                        </div>
                        <div className="form-text-input">
                            <input name="password"
                                type="password"
                                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            />
                        </div>
                        <button className="comp-button comp-button-green"
                            type="submit"
                        >
                            Login
                        </button>
                        <a className="typ-body typ-muted"
                            href="/forgot-password"
                        >
                            Forgot your password?
                        </a>
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

module.exports = Login