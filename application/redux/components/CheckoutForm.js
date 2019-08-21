const React = require('react')
const {
    CardElement,
    injectStripe
} = require('react-stripe-elements')

const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                fontFamily: 'Open Sans, sans-serif',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#c23d4b',
            },
        }
    }
}

class CheckoutForm extends React.Component {

    constructor(props) {

        super(props)
        this.state = {}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange ({ error }) {

        if (error) {
            this.setState({
                errorMessage: error.message
            })
        }
    }

    handleSubmit (evt) {

        evt.preventDefault()
        if (this.props.stripe) {
            this.props.stripe.createToken({
                name: this.props.name
            }).then(this.props.handleResult)
        }
    }

    render() {

        return (
            <div className="payment-form">
                <CardElement
                    onChange={this.handleChange}
                    {...createOptions()}
                />
                <button onClick={this.handleSubmit}
                    className="comp-button comp-button-green"
                >
                    Pay ${this.props.amount}
                </button>
                <div className="error" role="alert">
                    {this.state.errorMessage}
                </div>
            </div>
        )
    }
}

module.exports = injectStripe(CheckoutForm)