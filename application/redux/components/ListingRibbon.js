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

class ListingRibbon extends React.Component {

    constructor () {

        super()
    }

    render () {

        const p = this.props
        const listingClasses = classNames(
            'listing',
            {
                active: p.isActive === true,
                locked: p.locked === true,
                'view-aliexpress': typeof p.aliExpressUrl !== 'undefined'
            }
        )
        return (
            <div className={listingClasses}>
                <div className="listing-left-1">
                    {p.locked === true && p.isActive === false
                        ? <Lock fill="#c3c3c3" />
                        : false}
                    {p.isActive === true && p.locked !== true
                        ? <Download fill="#c3c3c3" />
                        : false}
                    {p.locked !== true && p.isActive === false
                        ? p.rank
                        : false}
                </div>
                <div className="listing-left-2">
                    <div className="listing-thumbnail">
                        <a href={p.imageUrl} download={p.imageUrl}>
                            <img src={p.imageUrl} alt="image alt text" />
                        </a>
                        {p.locked === true
                            ? <div className="locked-mask" />
                            : false}
                    </div>
                </div>
                {p.locked === true
                    ? (
                        <div className="listing-middle-locked">
                            <a href="/account/subscription">
                                <Lock fill="#c3c3c3" />
                                <span>Unlock This Product</span>
                            </a>
                        </div>
                    ) : false}
                <div className="listing-middle">
                    <div className="listing-details" onClick={p.onClickProduct}>
                        {p.isActive === true
                            ? (
                                <div className="listing-ranking">
                                    {p.rank}
                                </div>
                            ) : false}
                        {p.locked === true
                            ? <div className="listing-locked-mask" />
                            : false}
                        <div className="listing-main">
                            <div className="listing-title">
                                {p.title}
                            </div>
                            <div className="listing-badges">
                                <div className="badge">
                                {p.blueRibbon === true
                                    ? <RibbonCheck fill="#25D7FA" />
                                    : false}
                                {p.greenRibbon === true
                                    ? <RibbonCheck fill="#07DD95" />
                                    : false}
                                </div>
                            </div>
                            {typeof p.reviewScore !== 'undefined'
                                ? (
                                    <div className="listing-rating">
                                        <div className="badge">
                                            <Star fill="#c3c3c3" /> {p.reviewScore}
                                        </div>
                                    </div>
                                ) : false}
                        </div>
                        <div className="listing-secondary">
                            {typeof p.orders !== 'undefined'
                                ? <div className="badge"><Tag fill="#c3c3c3" /> {numeral(p.orders).format('0,0')}</div>
                                : false}
                            {typeof p.reviewsCount !== 'undefined'
                                ? <div className="badge"><Star fill="#c3c3c3" /> {numeral(p.reviewsCount).format('0,0')}</div>
                                : false}
                            {typeof p.supplierScore !== 'undefined'
                                ? <div className="badge"><Shield fill="#c3c3c3" /> {numeral(p.supplierScore).format('0%')}</div>
                                : false}
                        </div>
                        <div className="listing-price">
                            {numeral(p.price).format('$0,0')}
                        </div>
                    </div>
                    {typeof p.aliExpressUrl !== 'undefined' && p.isActive === false
                        ? <a href={p.aliExpressUrl} target="_blank">View On AliExpress</a>
                        : false}
                </div>
                {p.isActive === true
                    ? (
                        <div className="listing-ali-express">
                            <a href={p.aliExpressUrl} target="_blank">
                                View On AliExpress
                            </a>
                        </div>
                    ) : false}
                {p.locked === true
                ? (
                    <div className="listing-right-1">
                        <a href="/account/subscription">
                            <Heart fill={p.isSaved === true ? '#e50b17' : '#c3c3c3'} />
                        </a>
                    </div>
                ) : (
                    <div className="listing-right-1"
                        onClick={p.onClickProductRight1}
                    >
                        <Heart fill={p.isSaved === true ? '#e50b17' : '#c3c3c3'} />
                    </div>
                )}
                {p.locked === true
                ? (
                    <div className="listing-right-2">
                        <a href="/account/subscription">
                            <Plus fill="#c3c3c3" />
                        </a>
                    </div>
                ) : (
                    <div className="listing-right-2"
                        onClick={p.onClickProductRight2}
                    >
                        <Plus fill="#c3c3c3" />
                    </div>
                )}
            </div>
        )
    }
}

module.exports = ListingRibbon