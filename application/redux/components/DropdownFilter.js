const ArrowDown = require('./icons/ArrowDown')
const React = require('react')

const DropdownFilter = (p) => (
    <div className="comp-form-control comp-form-control-dropdown"
        onClick={p.onClick}
    >
        <div className="comp-form-control-heading">
            {p.title}
        </div>
        <div className="comp-form-data">
            Selected: {p.options[p.selected] || 'None selected'}
        </div>
        {p.isOpen === true
            ? (
                <ul className="comp-form-control-dropdown-options">
                {p.options.map((option, i) => (
                    <li onClick={p.onSelection.bind(this, i, p.name)}
                        key={i}
                    >
                        {option}
                    </li>
                ))}
                </ul>
            ) : false}
        <div className="comp-form-control-icon">
            <ArrowDown stroke="#c3c3c3" />
        </div>
    </div>
)

module.exports = DropdownFilter