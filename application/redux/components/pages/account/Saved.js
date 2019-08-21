const AccountFooter = require('../../AccountFooter')
const AccountHeader = require('../../AccountHeader')
const DropdownFilter = require('../../DropdownFilter')
const ListingRibbon = require('../../ListingRibbon')
const ListingGrid = require('../../ListingGrid')
const React = require('react')
const TextFilter = require('../../TextFilter')

class Saved extends React.Component {

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
        this.props.ajaxGetSavedProducts({})
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
            listingType = 'listing-ribbon',
            dropdowns = {},
            products = [],
            search,
            sort = [],
            sortBy
        } = p.profitly || {}

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
                                <div className="typ-h1">
                                    Saved Products
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
                <section className="listings">
                    <div className="container">
                        <div className="row">
                            <div className="listings-container">
                            {products.map((product, i) => (
                                <ListingComponent
                                    {...product}
                                    isActive={activeProduct === product.productId}
                                    key={i}
                                    onClickProduct={p.setActiveProduct.bind(this, product.productId)}
                                />
                            ))}
                            </div>
                        </div>
                    </div>
                </section>
                <AccountFooter isColorInverted={true} />
            </div>
        )
    }
}

module.exports = Saved