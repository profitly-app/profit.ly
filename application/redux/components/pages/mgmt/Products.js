const React = require('react')

class TextField extends React.Component {

    constructor (props) {

        super()
        this.state = {
            isFocus: false,
            prevVal: props.value,
            val: props.value
        }
    }

    render () {

        const p = this.props
        return (
            <td
                onClick={() => {
                    this.setState({
                        isFocus: true
                    })
                }}
            >
                {this.state.isFocus === true
                    ? (
                        <input
                            onBlur={() => {
                                if(this.state.val !== ''
                                    && this.state.val !== this.state.prevVal
                                ) {
                                    p.onChange(p.name, this.state.val)
                                }
                                this.setState({
                                    isFocus: false
                                })
                            }}
                            onChange={(e) => {
                                this.setState({
                                    val: e.target.value
                                })
                            }}
                            type="text"
                            value={this.state.val}
                        />
                    ) : this.state.val}
            </td>
        )
    }
}

class Product extends React.Component {

    constructor () {

        super()
        this.onChange = this.onChange.bind(this)
    }

    render () {

        const p = this.props
        return (
            <tr>
                <TextField
                    name="orders"
                    onChange={this.onChange}
                    value={p.orders}
                />
                <TextField
                    name="price"
                    onChange={this.onChange}
                    value={p.price}
                />
                <TextField
                    name="rank"
                    onChange={this.onChange}
                    value={p.rank}
                />
                <TextField
                    name="reviewScore"
                    onChange={this.onChange}
                    value={p.reviewScore}
                />
                <TextField
                    name="reviewsCount"
                    onChange={this.onChange}
                    value={p.reviewsCount}
                />
                <TextField
                    name="supplierScore"
                    onChange={this.onChange}
                    value={p.supplierScore}
                />
                <TextField
                    name="title"
                    onChange={this.onChange}
                    value={p.title}
                />
            </tr>
        )
    }

    onChange (name, value) {

        const product = Object.assign(
            {},
            this.props
        )
        product[name] = value

        this.props.ajaxUpdateProduct({
            payload: {
                id: this.props.productId,
                product
            }
        })
    }
}

class Products extends React.Component {

    constructor () {

        super()
    }

    render () {

        const p = this.props
        const products = p.products || []
        return (
            <section>
                <div className="container">
                    <div className="row">
                        <table>
                            <thead>
                                <tr>
                                    <th>Orders</th>
                                    <th>Price</th>
                                    <th>Rank</th>
                                    <th>Review Score</th>
                                    <th>Reviews Count</th>
                                    <th>Suppliers Score</th>
                                    <th>Title</th>
                                </tr>
                            </thead>
                            <tbody>
                            {products.map((product, i) => (
                                <Product
                                    {...product}
                                    key={i}
                                    ajaxUpdateProduct={p.ajaxUpdateProduct}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        )
    }
}

module.exports = Products