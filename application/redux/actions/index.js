import * as types from '../constants/ActionTypes'

export const getKeyCode = (evt) => {
    // Keys which, in WebKit browsers (and I guess IE?), have the
    // wrong codes, or which have symbolic names in DOM 3.
    // Too bad ← maps to % and → maps to ', no?  ' in WebKit is 222.
    // Fortunately Firefox gives us DOM 3 `key`, so this won’t break
    // Firefox.
    const _keyCodeMap = {
        187: '=',
        189: '-',
        191: '/',
        37: 'Left',
        39: 'Right',
        222: '\'',
        8: 'Backspace'
    }

    const unshiftedKeys = '`1234567890-=,'
    const reshiftedKeys = '~!@#$%^&*[]_+<'
    const {
        key,
        keyCode,
        shiftKey,
    } = evt

    // Map keys with indirect character mappings when holding down `Shift`
    // TODO: Data structure format could be improved
    const shiftMap = {}
    for (var i = 0; i < unshiftedKeys.length; i++) {
        shiftMap[unshiftedKeys.charAt(i)] = reshiftedKeys.charAt(i)
    }

    // Optimal case, this browser is current and supports `key`
    if (key) {
        return key
    }

    // Do our best to try and get the named key
    const c = _keyCodeMap[keyCode] || String.fromCharCode(keyCode).toLowerCase()

    // OK by now we should have something representing a named key
    return shiftKey ? shiftMap[c] || c.toUpperCase() : c
}

export const addProductToCollection = (collectionId) => ({
    collectionId,
    type: types.ADD_PRODUCT_TO_COLLECTION,
})

export const ajaxAddCollection = ({ next, payload }) => ({
    fail: ajaxError,
    next,
    payload,
    type: types.AJAX_ADD_COLLECTION
})

export const ajaxAddProductToCollection = ({ next, payload }) => ({
    fail: ajaxError,
    next,
    payload,
    type: types.AJAX_ADD_PRODUCT_TO_COLLECTION
})

export const ajaxCreateSubscription = ({ fail, next, payload }) => ({
    fail,
    next,
    payload,
    type: types.AJAX_CREATE_SUBSCRIPTION
})

export const ajaxError = ({ config, error, url }) => ({
    config,
    error,
    type: types.AJAX_RESPONSE_ERROR,
    url
})

export const ajaxGetCategories = ({ payload }) => ({
    fail: ajaxError,
    next: setCategories,
    payload,
    type: types.AJAX_GET_CATEGORIES
})

export const ajaxGetCollection = ({ payload }) => ({
    fail: ajaxError,
    next: setCollection,
    payload,
    type: types.AJAX_GET_COLLECTION
})

export const ajaxGetCollections = ({ payload }) => ({
    fail: ajaxError,
    next: setCollections,
    payload,
    type: types.AJAX_GET_COLLECTIONS
})

export const ajaxGetProducts = ({ payload }) => ({
    fail: ajaxError,
    next: setProducts,
    payload,
    type: types.AJAX_GET_PRODUCTS
})

export const ajaxGetSavedProducts = ({ payload }) => ({
    fail: ajaxError,
    next: setProducts,
    payload,
    type: types.AJAX_GET_SAVED_PRODUCTS
})

export const ajaxGetSort = ({ payload }) => ({
    fail: ajaxError,
    next: setSort,
    payload,
    type: types.AJAX_GET_SORT
})

export const ajaxRemoveProductFromCollection = ({ next, payload }) => ({
    fail: ajaxError,
    next,
    payload,
    type: types.AJAX_REMOVE_PRODUCT_FROM_COLLECTION
})

export const ajaxSaveProduct = ({ next, payload }) => ({
    fail: ajaxError,
    next,
    payload,
    type: types.AJAX_SAVE_PRODUCT
})

export const ajaxUnsaveProduct = ({ next, payload }) => ({
    fail: ajaxError,
    next,
    payload,
    type: types.AJAX_UNSAVE_PRODUCT
})

export const ajaxUpdateProduct = ({ next, payload }) => ({
    fail: ajaxError,
    next,
    payload,
    type: types.AJAX_UPDATE_PRODUCT
})

export const clickProductRight1 = (productId) => ({
    productId,
    type: types.CLICK_PRODUCT_RIGHT_ONE,
})

export const clickProductRight2 = (productId) => ({
    productId,
    type: types.CLICK_PRODUCT_RIGHT_TWO,
})

export const goToPayment = () => ({
    type: types.GO_TO_PAYMENT
})

export const goToPaymentSuccess = () => ({
    type: types.GO_TO_PAYMENT_SUCCESS
})

export const onChangeTextField = (e) => ({
    name: e.target.name,
    type: types.ONCHANGE_TEXT_FIELD,
    value: e.target.value,
})

export const onClickCategoryDropdown = () => ({
    type: types.ONCLICK_CATEGORY_DROPDOWN,
})

export const onClickShowGridView = () => ({
    type: types.ONCLICK_SHOW_GRID_VIEW,
})

export const onClickShowListView = () => ({
    type: types.ONCLICK_SHOW_LIST_VIEW,
})

export const onClickSortByDropdown = () => ({
    type: types.ONCLICK_SORT_BY_DROPDOWN,
})

export const onDropdownSelection = (selected, name) => ({
    name,
    selected,
    type: types.ON_DROPDOWN_SELECTION,
})

export const onKeyPressAddNewCollectionForProduct = (e) => ({
    keyCode: getKeyCode(e),
    type: types.ONKEYPRESS_ADD_NEW_COLLECTION_FOR_PRODUCT,
})

export const onKeyPressAddNewCollection = (e) => ({
    keyCode: getKeyCode(e),
    type: types.ONKEYPRESS_ADD_NEW_COLLECTION,
})

export const prepareAddProductToCollection = (productId) => ({
    productId,
    type: types.PREPARE_ADD_PRODUCT_TO_COLLECTION,
})

export const removeProductFromCollection = (collectionId) => ({
    collectionId,
    type: types.REMOVE_PRODUCT_FROM_COLLECTION,
})

export const setActiveProduct = (productId) => ({
    productId,
    type: types.SET_ACTIVE_PRODUCT,
})

export const setCategories = ({ categories }) => ({
    categories,
    type: types.SET_CATEGORIES
})

export const setCollection = ({ collection }) => ({
    collection,
    type: types.SET_COLLECTION
})

export const setCollections = ({ collections }) => ({
    collections,
    type: types.SET_COLLECTIONS
})

export const setProducts = ({ products, savedProducts }) => ({
    products,
    savedProducts,
    type: types.SET_PRODUCTS
})

export const setSort = ({ sort }) => ({
    sort,
    type: types.SET_SORT
})

export const subscriptionFailure = ({ config, error, url }) => ({
    config,
    error,
    type: types.SUBSCRIPTION_FAILURE,
    url,
})

export const subscriptionSuccess = () => ({
    type: types.SUBSCRIPTION_SUCCESS,
})

export const toggleAddNewCollection = () => ({
    type: types.TOGGLE_ADD_NEW_COLLECTION
})

export const toggleCollectionSelectionControl = () => ({
    type: types.TOGGLE_COLLECTION_SELECTION_CONTROL
})

export const togglePaymentSelection = () => ({
    type: types.TOGGLE_PAYMENT_SELECTION,
})