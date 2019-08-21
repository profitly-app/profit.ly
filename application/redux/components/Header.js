const HeaderContainer = require('./HeaderContainer')
const React = require('react')

const Header = () => (
    <header>
        <div className="container">
            <div className="row">
                <HeaderContainer />
            </div>
        </div>
    </header>
)

module.exports = Header