import * as Actions from '../../actions'
import * as types from '../../constants/ActionTypes'

const eventListener = {
    [types.ADD_PRODUCT_TO_COLLECTION]: (action, dispatch, state) => {

        const {
            collectionId
        } = action

        dispatch(Actions.ajaxAddProductToCollection({
            next: Actions.ajaxGetCollections,
            payload: {
                collectionId,
                productId: state.profitly.productId
            }
        }))
    },
    [types.CLICK_PRODUCT_RIGHT_ONE]: (action, dispatch, state) => {

        const {
            productId
        } = action

        const ajaxAction = state.profitly.savedProducts.indexOf(productId) >= 0
            ? Actions.ajaxUnsaveProduct
            : Actions.ajaxSaveProduct

        dispatch(ajaxAction({
            next: Actions.ajaxGetProducts,
            payload: {
                id: productId
            }
        }))
    },
    [types.CLICK_PRODUCT_RIGHT_TWO]: (action, dispatch, state) => {

        const {
            productId
        } = action

        dispatch(Actions.prepareAddProductToCollection(productId))
        dispatch(Actions.toggleCollectionSelectionControl())
    },
    [types.ON_DROPDOWN_SELECTION]: (action, dispatch, state) => {
        const {
            name,
            selected
        } = action

        if(name === 'category') {

            const category = state.profitly.categories[selected].id

            dispatch(Actions.ajaxGetProducts({
                payload: {
                    category,
                    sortBy: state.profitly.sortBy,
                }
            }))
        }
        if(name === 'sortBy') {

            const sort = state.profitly.sort[selected].id

            dispatch(Actions.ajaxGetProducts({
                payload: {
                    category: state.profitly.category,
                    sort
                }
            }))
        }
    },
    [types.ONCHANGE_TEXT_FIELD]: (action, dispatch, state) => {
        const {
            name,
            value
        } = action

        if(name === 'search') {
            dispatch(Actions.ajaxGetProducts({
                payload: {
                    q: value
                }
            }))
        }
    },
    [types.ONKEYPRESS_ADD_NEW_COLLECTION]: (action, dispatch, state) => {

        const {
            keyCode,
            next
        } = action

        if(keyCode === 'Enter') {
            dispatch(Actions.toggleAddNewCollection())
            dispatch(Actions.ajaxAddCollection({
                next: Actions.ajaxGetCollections,
                payload: {
                    newCollectionName: state.profitly.newCollectionName
                }
            }))
        }
    },
    [types.ONKEYPRESS_ADD_NEW_COLLECTION_FOR_PRODUCT]: (action, dispatch, state) => {

        const {
            keyCode,
            next
        } = action

        if(keyCode === 'Enter') {
            dispatch(Actions.ajaxAddCollection({
                next: Actions.ajaxGetCollections,
                payload: {
                    newCollectionName: state.profitly.newCollectionName
                }
            }))
        }
    },
    [types.REMOVE_PRODUCT_FROM_COLLECTION]: (action, dispatch, state) => {

        const {
            collectionId
        } = action

        dispatch(Actions.ajaxRemoveProductFromCollection({
            next: Actions.ajaxGetCollections,
            payload: {
                collectionId,
                productId: state.profitly.productId
            }
        }))
    },
}

export default eventListener