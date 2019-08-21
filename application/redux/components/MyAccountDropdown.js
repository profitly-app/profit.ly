const ArrowDown = require('./icons/ArrowDown')
const React = require('react')
const Search = require('./icons/Search')

class MyAccountDropdown extends React.Component {

    constructor () {

        super()
        this.state = {
            isOpen: false
        }
        this.toggleDropdown = this.toggleDropdown.bind(this)
    }

    render () {

        return (
            <div className="my-acct-dropdown">
                <div className="my-acct-dropdown-title"
                    onClick={this.toggleDropdown}
                >
                    My Account
                </div>
                {this.state.isOpen === true
                ? (
                    <ul>
                        <li>
                            <a href="/account">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="/account/collections">
                                Collections
                            </a>
                        </li>
                        <li>
                            <a href="/account/saved">
                                Saved
                            </a>
                        </li>
                        <li>
                            <a href="/account/settings">
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="/logout">
                                Sign Out
                            </a>
                        </li>
                    </ul>
                ) : false}
                <div className="my-acct-dropdown-icon"
                    onClick={this.toggleDropdown}
                >
                    <ArrowDown stroke="#9dadff" />
                </div>
            </div>
        )
    }

    toggleDropdown () {

        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

module.exports = MyAccountDropdown