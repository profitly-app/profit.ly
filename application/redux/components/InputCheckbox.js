const React = require('react')

const InputCheckbox = (p) => (
    <div className="form-input">
        <div className="form-input-checkbox">
            <input type="checkbox" name={p.name} /> {p.children}
        </div>
    </div>
)

module.exports = InputCheckbox