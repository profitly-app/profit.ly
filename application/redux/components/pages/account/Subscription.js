const CheckoutForm = require('../../CheckoutForm')
const CustomersGallery = require('../../CustomersGallery')
const {
    Elements,
    StripeProvider
} = require('react-stripe-elements')
const Footer = require('../../Footer')
const Header = require('../../Header')
const React = require('react')
const StarRating = require('../../StarRating')

class Subscription extends React.Component {

    constructor () {

        super()

        this.handlePaymentResult = this.handlePaymentResult.bind(this)
    }

    render () {

        const p = this.props
        const {
            paymentError,
            paymentSelection = '',
            paymentStep
        } = p.profitly || {}

        let name
        let publishableKey
        if(typeof window !== 'undefined') {

            if(typeof document !== 'undefined') {
                const tag = document.head.querySelector('meta[name="publishableKey"]')
                if(tag !== null) {
                    publishableKey = tag.getAttribute('content')
                }
            }

            if(typeof publishableKey === 'undefined' || publishableKey === '') {
                throw new Error('No publishable key found')
            }

            if(typeof document !== 'undefined') {
                const tag = document.head.querySelector('meta[name="name"]')
                if(tag !== null) {
                    name = tag.getAttribute('content')
                }
            }
        }

        const paymentSelectionContainer = (
            <div className="payment-container">
                <div className="typ-h1">
                    Unlimited Access
                </div>
                <div className="typ-h4">
                    Get access to the full list of products and suppliers to start selling the best products in your store.
                </div>
                <div className="payment-amount">
                    <span className="payment-currency">$</span>
                    <span className="payment-dollar-amount">
                        {paymentSelection === 'monthly' ? 10 : 5}
                    </span>
                    <span className="payment-frequency">/month</span>
                </div>
                <div className={`payment-selection ${paymentSelection}`}>
                    <div className="payment-selection-option monthly">
                        <div className="payment-selection-heading">
                            Billed Monthly
                        </div>
                        <div className="payment-selection-subheading">
                            Cancel Anytime
                        </div>
                    </div>
                    <div className="payment-selector-control"
                        onClick={p.togglePaymentSelection}
                    >
                        <div className="payment-selector" />
                    </div>
                    <div className="payment-selection-option yearly">
                        <div className="payment-selection-heading">
                            Billed Annually
                        </div>
                        <div className="payment-selection-subheading">
                            at $60 (Save 50%)
                        </div>
                    </div>
                </div>
                <button className="comp-button comp-button-white"
                    onClick={p.goToPayment}
                >
                    CONTINUE
                </button>
            </div>
        )
        const paymentContainer = (
            <div className="payment-container">
                <CustomersGallery />
                <div className="typ-h3">
                    "It's one of the best places on the web to find product ideas."
                </div>
                <StarRating />
                {typeof window !== 'undefined'
                ? (
                    <StripeProvider apiKey={publishableKey}>
                        <Elements>
                            <CheckoutForm
                                amount={paymentSelection === 'monthly' ? 10 : 5}
                                name={name}
                                handleResult={this.handlePaymentResult}
                            />
                        </Elements>
                    </StripeProvider>
                ) : false}
                {paymentError === true
                ? (
                    <div className="payment-error">
                        <div className="typ-h4">
                            Payment Error
                        </div>
                        <p className="typ-body">
                            There was an error while processing your payment - please try again
                        </p>
                    </div>
                ) : false}
                <img
                    className="stripe-logo"
                    src="https://profitly.app/wp-content/uploads/2019/01/powered-by-stripe.png"
                />
            </div>
        )
        const successContainer = (
            <div className="payment-container">
                <div className="typ-h1">
                    Thank You!
                </div>
                <div className="typ-h4">
                    Enjoy unlimited access.
                </div>
                <div className="payment-order-confirmation">
                    ORDER: P12345
                </div>
                <a className="comp-button comp-button-white"
                    href="/account"
                >
                    VIEW PRODUCTS
                </a>
            </div>
        )

        let container = false
        switch (paymentStep) {
            case 'payment':
                container = paymentContainer
                break;
            case 'selection':
                container = paymentSelectionContainer
                break;
            case 'success':
                container = successContainer
                break;
        }

        return (
            <div className="page">
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="section-container">
                                <img src="https://profitly.app/wp-content/uploads/2019/04/logo-profitly-2-1.png" />
                            </div>
                        </div>
                    </div>
                </header>
                <section>
                    <div className="container">
                        <div className="row">
                            {container}
                        </div>
                    </div>
                </section>
                <footer>
                    <img className="products-left" src="/images/payment-form-1.png" />
                    <img className="products-right" src="/images/payment-form-2.png" />
                    <div className="container">
                        <div className="row">
                            <div className="section-container">
                                <img className="shopify-logo"
                                    src="https://profitly.app/wp-content/uploads/2019/05/shopify-partners-lg.png"
                                />
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }

    handlePaymentResult ({ token }) {

        const p = this.props
        const plan = p.profitly.paymentSelection
        p.ajaxCreateSubscription({
            fail: p.subscriptionFailure,
            next: p.goToPaymentSuccess,
            payload: {
                plan,
                token,
            }
        })
    }
}

module.exports = Subscription