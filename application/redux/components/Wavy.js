const React = require('react')

const Wavy = (props) => (
    <div className={`wavy-element ${props.inverted === true ? 'inverted' : ''}`}>
        {typeof props.imgLeft !== 'undefined'
            ? (
                <div className="wavy-img-left">
                    <img src={props.imgLeft} />
                </div>
            ) : false}
        {React.Children.map(props.children, (child) => {
            if(child.type === 'svg') {
                return (
                    <div className="svg-container">
                        {child}
                    </div>
                )
            }
            return false
        })}
        {typeof props.imgRight !== 'undefined'
            ? (
                <div className="wavy-img-right">
                    <img src={props.imgRight} />
                </div>
            ) : false}
    </div>
)

module.exports = Wavy