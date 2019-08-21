const AccountFooter = require('../../AccountFooter')
const AccountHeader = require('../../AccountHeader')
const CollectionSelection = require('../../CollectionSelection')
const ListingRibbon = require('../../ListingRibbon')
const ListingGrid = require('../../ListingGrid')
const React = require('react')

class Collection extends React.Component {

    constructor () {

        super()
    }

    componentDidMount() {

        let collectionId
        if(typeof document !== 'undefined') {
            const tag = document.head.querySelector('meta[name="collectionId"]')
            if(tag !== null) {
                collectionId = tag.getAttribute('content')
            }
        }
        this.props.ajaxGetCollection({
            payload: {
                collectionId
            }
        })
    }

    render () {

        const p = this.props
        const {
            activeProduct,
            collection = {},
            listingType = 'listing-ribbon',
            savedProducts = [],
            showCollectionSelection
        } = p.profitly || {}

        const {
            imageUrl,
            name,
            products = [],
        } = collection

        const ListingComponent = listingType === 'listing-grid'
            ? ListingGrid
            : ListingRibbon

        return (
            <div>
                <AccountHeader />
                <section className="hero">
                    <img className="hero-dots" src="/images/Dots.svg" />
                    <div className="container">
                        <div className="row">
                            <div className="section-container">
                                <div className="typ-h4">
                                    Collection {name}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="listings">
                    <div className="container">
                        <div className="row">
                            {products.length === 0
                            ? (
                                <div className="listings-container listings-container-empty">
                                    <div className="listings-empty-indicator">
                                        No products in this collection
                                    </div>
                                </div>
                            ) : (
                                <div className="listings-container">
                                    {products.map((product, i) => (
                                        <ListingComponent
                                            {...product}
                                            isActive={activeProduct === product.productId}
                                            key={i}
                                            onClickProduct={p.setActiveProduct.bind(this, product.productId)}
                                            onClickProductRight1={p.clickProductRight1.bind(this, product.productId)}
                                            onClickProductRight2={p.clickProductRight2.bind(this, product.productId)}
                                            isSaved={savedProducts.indexOf(product.productId) >= 0}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <AccountFooter isColorInverted={true} />
                {showCollectionSelection === true
                    ? <div className="backdrop" />
                    : false}
                {showCollectionSelection === true
                ? (
                    <CollectionSelection
                        addProductToCollection={p.addProductToCollection}
                        collections={collections}
                        onChangeTextField={p.onChangeTextField}
                        onKeyPress={p.onKeyPressAddNewCollection}
                        newCollectionName={newCollectionName}
                        removeProductFromCollection={p.removeProductFromCollection}
                        selectedProductId={productId}
                        showNewCollectionNameControl={p.showNewCollectionNameControl}
                    />
                )
                : false}
            </div>
        )
    }
}

module.exports = Collection