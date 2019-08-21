const React = require('react')

const InputDropDown = (p) => (
    <div className="form-input">
        {p.children}
        <div className="form-input-dropdown">
            <select name={p.name}>
            {p.options.map((option, i) => (
                <option key={i}>{option}</option>
            ))}
            </select>
        </div>
    </div>
)

module.exports = InputDropDown