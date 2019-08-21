const React = require('react')

const Heart = (p) => (
    <div className="icon">
        <svg width="32px" height="30px" viewBox="0 0 32 30">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g fill={p.fill} fillRule="nonzero">
                    <path d="M23.2,0 C20.4114286,0 17.7371429,1.30285714 16,3.33714286 C14.2628571,1.30285714 11.5885714,0 8.8,0 C3.86285714,0 0,3.86285714 0,8.8 C0,14.8342857 7.74857143,22.24 16,29.7142857 C24.2285714,22.24 32,14.8342857 32,8.8 C32,3.86285714 28.1371429,0 23.2,0 Z"></path>
                </g>
            </g>
        </svg>
    </div>
)

module.exports = Heart