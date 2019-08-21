const React = require('react')

const InputTextField = (p) => (
    <div className="form-input">
        {p.children}
        <div className="form-input-text">
            <input
                onChange={p.onChange}
                name={p.name}
                type="text"
                placeholder={p.placeholder}
                value={p.value}
            />
        </div>
    </div>
)

module.exports = InputTextField