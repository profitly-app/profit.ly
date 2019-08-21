const classNames = require('classnames')
const Download = require('./icons/Download')
const Heart = require('./icons/Heart')
const Like = require('./icons/Like')
const Lock = require('./icons/Lock')
const Plus = require('./icons/Plus')
const React = require('react')
const RibbonCheck = require('./icons/RibbonCheck')
const Shield = require('./icons/Shield')
const Star = require('./icons/Star')
const Tag = require('./icons/Tag')
const numeral = require('numeral')

class ListingGrid extends React.Component {

    constructor () {

        super()
    }

    render () {

        const p = this.props
        const listingClasses = classNames(
            'listing-item-grid',
            {
                active: p.isActive === true,
                locked: p.locked === true,
                'view-aliexpress': typeof p.aliExpressUrl !== 'undefined'
            }
        )
        return (
            <div className={listingClasses}>
                {p.locked === true
                    ? (
                        <div className="listing-locked">
                            <a href="/account/subscription">
                                <div className="icon">
                                    <Lock fill="#c3c3c3" />
                                </div>
                                <div>
                                    Unlock This Product
                                </div>
                            </a>
                        </div>
                    ) : false}
                <div className="listing-image">
                    {p.locked === true
                    ? (
                        <div className="listing-favorite">
                            <a href="/account/subscription">
                                <Heart fill={p.isSaved === true ? '#e50b17' : '#c3c3c3'} />
                            </a>
                        </div>
                    ) : (
                        <div className="listing-favorite"
                            onClick={p.onClickProductRight1}
                        >
                            <Heart fill={p.isSaved === true ? '#e50b17' : '#c3c3c3'} />
                        </div>
                    )}
                    {p.locked === true
                    ? (
                        <div className="listing-collection">
                            <a href="/account/subscription">
                                <Plus fill="#c3c3c3" />
                            </a>
                        </div>
                    ) : (
                        <div className="listing-collection"
                            onClick={p.onClickProductRight2}
                        >
                            <Plus fill="#c3c3c3" />
                        </div>
                    )}
                    <a href={p.imageUrl} download={p.imageUrl}>
                        <img src={p.imageUrl} alt="image alt text" />
                    </a>
                    {p.locked === true
                        ? <div className="locked-mask" />
                        : false}
                </div>
                <div className="listing-info">
                    <div className="listing-title">
                        {p.title}
                    </div>
                    <div className="listing-price">
                        {numeral(p.price).format('$0,0')}
                    </div>
                </div>
                <div className="listing-badges">
                    {typeof p.orders !== 'undefined'
                        ? <div className="badge"><Tag fill="#c3c3c3" /> {numeral(p.orders).format('0,0')}</div>
                        : false}
                    {typeof p.reviewsCount !== 'undefined'
                        ? <div className="badge"><Star fill="#c3c3c3" /> {numeral(p.reviewsCount).format('0,0')}</div>
                        : false}
                    {typeof p.supplierScore !== 'undefined'
                        ? <div className="badge"><Shield fill="#c3c3c3" /> {numeral(p.supplierScore).format('0%')}</div>
                        : false}
                    {typeof p.reviewScore !== 'undefined'
                        ? <div className="badge"><Star fill="#c3c3c3" /> {p.reviewScore}</div> : false}
                </div>
            </div>
        )
    }
}

module.exports = ListingGrid