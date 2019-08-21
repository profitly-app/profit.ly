const React = require('react')

const TextContentSection = (props) => (
    <section className="section-content">
        <div className="container">
            <div className="row">
                <div className="content-container">
                    {props.children}
                </div>
            </div>
        </div>
    </section>
)

module.exports = TextContentSection