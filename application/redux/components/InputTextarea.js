const React = require('react')

const InputTextarea = (p) => (
    <div className="form-input">
        {p.children}
        <div className="form-input-textarea">
            <textarea name={p.name} onChange={p.onChange}>
                {p.value}
            </textarea>
        </div>
    </div>
)

module.exports = InputTextarea