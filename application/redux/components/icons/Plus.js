const React = require('react')

const Plus = (p) => (
    <div className="icon">
        <svg width="32px" height="32px" viewBox="0 0 32 32">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g fill={p.fill} fillRule="nonzero">
                    <polygon points="14 0 14 14 0 14 0 18 14 18 14 32 18 32 18 18 32 18 32 14 18 14 18 0"></polygon>
                </g>
            </g>
        </svg>
    </div>
)

module.exports = Plus