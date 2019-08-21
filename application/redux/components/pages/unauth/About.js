const CustomersGallery = require('../../CustomersGallery')
const DotsHero = require('../../DotsHero')
const Footer = require('../../Footer')
const Header = require('../../Header')
const ItemReasonsHoriz = require('../../ItemReasonsHoriz')
const React = require('react')
const StarRating = require('../../StarRating')
const SubFooter = require('../../SubFooter')
const Wavy = require('../../Wavy')

const About = () => (
    <div className="page">
        <Header />
        <section className="section-default">
            <div className="container">
                <div className="row">
                    <div className="section-container">
                        <div className="group-1">
                            <div className="typ-h1">
                                Our Mission
                            </div>
                            <div className="typ-h4">
                                Our goal is to make it easier for entrepreneurs all around the world to start an online business by helping them find the best products to sell online.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="section-default">
            <Wavy inverted={true}
                imgLeft="https://profitly.app/wp-content/uploads/2019/04/set3-floating-img-159x300.png"
                imgRight="https://profitly.app/wp-content/uploads/2019/04/set3-floating-img2-123x300.png"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3 c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3 c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z"></path>
                </svg>
            </Wavy>
            <div className="container">
                <div className="row">
                    <div className="section-container">
                        <div className="group-2">
                            <div className="typ-h1">
                                $4 Trillion by 2020
                            </div>
                            <div className="typ-h4">
                                With eCommerce sales projected to grow to 4.1 trillion by 2020, and with only 3% of all global retail sales happening online, it’s safe to say that this is just te beginning. Checkout Shopify’s recent BFCM sales statistics.
                            </div>
                            <img className="profitly-map"
                                src="https://profitly.app/wp-content/uploads/2019/04/map-with-icons.png"
                            />
                            <div className="percentages-horiz">
                                <div className="percentage">
                                    <div className="typ-h1">23%</div>
                                    <div className="typ-h5">Year over year growth for<br/>eCommerce</div>
                                </div>
                                <div className="percentage">
                                    <div className="typ-h1">46%</div>
                                    <div className="typ-h5">Yet 46% of small businesses<br/>do not have a website</div>
                                </div>
                                <div className="percentage">
                                    <div className="typ-h1">3%</div>
                                    <div className="typ-h5">eCommerce is still only 3% of<br/>all global commerce</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="section-default">
            <Wavy
                imgLeft="https://profitly.app/wp-content/uploads/2019/04/set3-floating-img3-207x300.png"
                imgRight="https://profitly.app/wp-content/uploads/2019/04/set3-floating-img4-1.png"
            >
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

module.exports = About