const AccountFooter = require('../../AccountFooter')
const AccountHeader = require('../../AccountHeader')
const Plus = require('../../icons/Plus')
const React = require('react')

class Collections extends React.Component {

    constructor () {

        super()
    }

    componentDidMount() {

        this.props.ajaxGetCollections({})
    }

    render () {

        const p = this.props
        const {
            collections = [],
            newCollectionName = '',
            showAddNewCollection
        } = p.profitly || {}

        return (
            <div>
                <AccountHeader />
                <section className="hero">
                    <img className="hero-dots" src="/images/Dots.svg" />
                    <div className="container">
                        <div className="row">
                            <div className="section-container">
                                <div className="typ-h1">
                                    My Collections
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-rpg">
                    <div className="container">
                        <div className="row">
                            <div className="rpg-container">

                            </div>
                        </div>
                    </div>
                </section>
                <section className="collections">
                    <div className="container">
                        <div className="row">
                            <div className="collections-container">
                            {showAddNewCollection === true
                            ? (
                                <div className="listing-item-grid">
                                    <div className="collection-item">
                                        <div className="collection-item-image">

                                        </div>
                                        <div className="collection-item-title">
                                            <input type="text"
                                                name="newCollectionName"
                                                onChange={p.onChangeTextField}
                                                onKeyPress={p.onKeyPressAddNewCollection}
                                                value={newCollectionName}
                                            />
                                        </div>
                                        <div className="collection-item-product-count"
                                            onClick={p.toggleAddNewCollection}
                                        >
                                            Cancel
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="listing-item-grid"
                                    onClick={p.toggleAddNewCollection}
                                >
                                    <div className="collection-item collection-item-new">
                                        <Plus fill="#c3c3c3" />
                                        <div className="collection-item-new-heading">
                                            ADD NEW
                                        </div>
                                    </div>
                                </div>
                            )}
                            {collections.map((collection, i) => (
                                <div className="listing-item-grid" key={i}>
                                    <div className="collection-item">
                                        <div className="collection-item-image">
                                            <a href={`/account/collections/${collection.id}`}>
                                                <img src={collection.imageUrl} />
                                            </a>
                                        </div>
                                        <a className="collection-item-title"
                                            href={`/account/collections/${collection.id}`}
                                        >
                                            {collection.name}
                                        </a>
                                        <div className="collection-item-product-count">
                                            <a href={`/account/collections/${collection.id}`}>
                                                {collection.products.length} Products
                                            </a>
                                        </div>
                                    </div>
                                </div>
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

module.exports = Collections