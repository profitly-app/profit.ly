const CustomersGallery = require('../../CustomersGallery')
const DotsHero = require('../../DotsHero')
const Footer = require('../../Footer')
const Header = require('../../Header')
const React = require('react')
const StarRating = require('../../StarRating')
const SubFooter = require('../../SubFooter')
const Wavy = require('../../Wavy')

const Press = () => (
    <div className="page">
        <Header />
        <section className="section-default hero">
            <img className="hero-dots" src="/images/Dots.svg" />
            <div className="container">
                <div className="row">
                    <div className="section-container">
                        <div className="group-1">
                            <img className="header-image"
                                src="https://profitly.app/wp-content/uploads/2019/04/drop-shape.png"
                            />
                            <div className="typ-h1">
                                Press Kit
                            </div>
                            <div className="typ-h4">
                                Writing about Profitly? Download our brand assets for use in web and print media.
                            </div>
                            <button className="comp-button comp-button-white">
                                Download
                            </button>
                            <div className="typ-h1">
                                Boiler Plate
                            </div>
                            <div className="typ-h4">
                                Profitly is an app makes it easier for anyone to find the best products to sell online. View a list of the world's best-selling products ranked from <span className="typ-emphasis">1-1,000</span> - with links to suppliers on <span className="typ-muted">AliExpress.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="section-default">
            <Wavy>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7 c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4 c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
                </svg>
            </Wavy>
            <div className="container">
                <div className="row">
                    <div className="section-container">
                        <div className="group-3">
                            <CustomersGallery />
                            <div className="typ-h1">
                                Start the Next Big Brand
                            </div>
                            <div className="typ-h4">
                                Join the eCommerce movement with Profitly and start maximizing your eCommerce potential.
                            </div>
                            <button className="comp-button comp-button-white">
                                Buy Now
                            </button>
                            <StarRating />
                            <img className="product-card-podium"
                                src="https://profitly.app/wp-content/uploads/2019/05/media-6.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <SubFooter />
        <Footer />
    </div>
)

module.exports = Press