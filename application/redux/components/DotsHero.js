const React = require('react')

const DotsHero = (props) => (
    <section className={`hero ${props.corners === true ? 'corners' : ''}`}>
        <img className="hero-dots" src="/images/Dots.svg" />
        <div className="container">
            <div className="row">
                <div className="section-container">
                    {props.children}
                </div>
            </div>
        </div>
    </section>
)

module.exports = DotsHero