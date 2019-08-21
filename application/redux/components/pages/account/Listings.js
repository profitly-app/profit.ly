const AccountFooter = require('../../AccountFooter')
const AccountHeader = require('../../AccountHeader')
const CollectionSelection = require('../../CollectionSelection')
const CustomersGallery = require('../../CustomersGallery')
const DotsHero = require('../../DotsHero')
const DropdownFilter = require('../../DropdownFilter')
const ListingRibbon = require('../../ListingRibbon')
const ListingGrid = require('../../ListingGrid')
const React = require('react')
const StarRating = require('../../StarRating')
const TextFilter = require('../../TextFilter')

class Listings extends React.Component {

    constructor () {

        super()
        this.handleScroll = this.handleScroll.bind(this)
        this.state = {
            fixed: false
        }
        this.searchBarRef = React.createRef()
    }

    componentDidMount() {

        window.addEventListener('scroll', this.handleScroll)
        this.props.ajaxGetCategories({})
        this.props.ajaxGetCollections({})
        this.props.ajaxGetProducts({})
        this.props.ajaxGetSort({})
    }

    componentWillUnmount() {

        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll () {

        const bcr = this.searchBarRef.current.getBoundingClientRect()
        let fixed
        if(bcr.top - 75 <= 0) {
            fixed = true
        } else {
            fixed = false
        }
        this.setState({ fixed })
    }

    render () {

        const p = this.props
        const {
            activeProduct,
            categories = [],
            category,
            collections = [],
            dropdowns = {},
            listingType = 'listing-ribbon',
            newCollectionName = '',
            productId,
            products = [],
            savedProducts = [],
            search,
            showCollectionSelection,
            sort = [],
            sortBy
        } = p.profitly || {}

        const ListingComponent = listingType === 'listing-grid'
            ? ListingGrid
            : ListingRibbon

        const listingsClass = listingType === 'listing-grid'
            ? 'listings-grid'
            : 'listings-ribbon'

        return (
            <div>
                <AccountHeader />
                <DotsHero corners={true}>
                    <CustomersGallery />
                    <div className="typ-h1">
                        The best products, from the best sites, all in one app.
                    </div>
                    <StarRating />
                </DotsHero>
                <section className={`search ${this.state.fixed === true ? 'fixed' : ''}`}
                     ref={this.searchBarRef}
                    >
                    <div className="container">
                        <div className="row">
                            <div className="search-container">
                                <div className="search-bar">
                                    <TextFilter
                                        name="search"
                                        onChange={p.onChangeTextField}
                                        placeholder="e.g. Mens Stopwatch"
                                        title="Search"
                                        value={search}
                                    />
                                    <DropdownFilter
                                        isOpen={dropdowns.category}
                                        name="category"
                                        onClick={p.onClickCategoryDropdown}
                                        onSelection={p.onDropdownSelection}
                                        options={categories.map((obj) => {
                                            return obj.name
                                        })}
                                        selected={category}
                                        title="Category"
                                    />
                                    <DropdownFilter
                                        isOpen={dropdowns.sortBy}
                                        name="sortBy"
                                        onClick={p.onClickSortByDropdown}
                                        onSelection={p.onDropdownSelection}
                                        options={sort.map((obj) => {
                                            return obj.name
                                        })}
                                        selected={sortBy}
                                        title="Sort By"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="listings-filter-container">
                                <div className="listings-filter">
                                    <div>All Shipping</div>
                                    <div className="isActive">All Shipping</div>
                                </div>
                                <div className="listings-filter">
                                    <div className="isActive">Top 1,000</div>
                                    <div>Dropship</div>
                                </div>
                                <div className="listings-filter">
                                    <div className={`${listingType === 'listing-ribbon' ? 'isActive' : ''}`}
                                        onClick={p.onClickShowListView}
                                    >
                                        List View
                                    </div>
                                    <div className={`${listingType === 'listing-grid' ? 'isActive' : ''}`}
                                        onClick={p.onClickShowGridView}
                                    >
                                        Grid View
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="listings">
                    <div className="container">
                        <div className="row">
                            <div className={`listings-container ${listingsClass}`}>
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
                        onKeyPress={p.onKeyPressAddNewCollectionForProduct}
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

module.exports = Listings