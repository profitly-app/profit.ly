const React = require('react')

const CollectionSelection = (p) => (
    <div className="collection-selection">
        <div className="collection-selection-heading">
            Collections
        </div>
        <button
            className="comp-button"
            onClick={p.showNewCollectionNameControl}
        >
            Add
        </button>
        <input
            name="newCollectionName"
            onChange={p.onChangeTextField}
            onKeyPress={p.onKeyPress}
            type="text"
            value={p.newCollectionName}
        />
        <ul>
        {p.collections.map((collection, i) => {

            const isMember = collection.products.indexOf(p.selectedProductId) >= 0
            const action = isMember === true
                ? p.removeProductFromCollection
                : p.addProductToCollection

            return (
                <li key={i}
                    onClick={action.bind(this, collection.id)}
                >
                    {isMember === true ? 'x' : ''} {collection.name}
                </li>
            )
        })}
        </ul>
    </div>
)

module.exports = CollectionSelection