const React = require('react')
const Search = require('./icons/Search')

const TextFilter = (p) => (
    <div className="comp-form-control comp-form-control-text">
        <div className="comp-form-control-heading">
            {p.title}
        </div>
        <div className="comp-form-data">
            <input
                name={p.name}
                onChange={p.onChange}
                placeholder={p.placeholder}
                type="text"
                value={p.value}
            />
        </div>
        <div className="comp-form-control-icon">
            <Search fill="#c3c3c3" />
        </div>
    </div>
)

module.exports = TextFilter