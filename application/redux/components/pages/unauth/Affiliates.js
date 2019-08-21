const CustomersGallery = require('../../CustomersGallery')
const Footer = require('../../Footer')
const Header = require('../../Header')
const EasyAsHoriz = require('../../EasyAsHoriz')
const ItemReasonsHoriz = require('../../ItemReasonsHoriz')
const React = require('react')
const StarRating = require('../../StarRating')
const SubFooter = require('../../SubFooter')
const Wavy = require('../../Wavy')

const Affiliates = () => (
    <div className="page">
        <Header />
        <section className="section-default">
            <div className="container">
                <div className="row">
                    <div className="section-container">
                        <div className="group-1">
                            <img className="header-image"
                                src="https://profitly.app/wp-content/uploads/2019/04/drop-shape.png"
                            />
                            <div className="typ-h1">
                                Become a Partner
                            </div>
                            <div className="typ-h4">
                                Empower your audience and earn a <span className="typ-emphasis">20% commission</span> on every sale made, and up to a <span className="typ-emphasis">$5K Bonus</span> for finishing all of your scheduled challenges.
                            </div>
                            <button className="comp-button comp-button-green">
                                Join Now
                            </button>
                            <StarRating />
                            <img className="header-image"
                                src="https://profitly.app/wp-content/uploads/2019/04/drop-shape.png"
                            />
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
                            <ItemReasonsHoriz />
                            <div className="typ-h1">
                                It’s as Easy as...
                            </div>
                            <div className="typ-h4">
                                Getting started is easy. Get your unique referral link, share that link with your audience, and start earning cash.
                            </div>
                            <EasyAsHoriz />
                            <button className="comp-button comp-button-green">
                                Join Now
                            </button>
                            <StarRating />
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
                                Unlimited Earnings
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

module.exports = Affiliates