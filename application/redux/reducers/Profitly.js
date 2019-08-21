import * as types from '../constants/ActionTypes'

const InitialState = {
    confirmPassword: '',
    categories: [],
    category: -1,
    dropdowns: {},
    email: '',
    listingType: 'listing-ribbon',
    password: '',
    paymentSelection: 'monthly',
    paymentStep: 'selection',
    products: [],
    showAddNewCollection: false,
    showCollectionSelection: false,
    sort: [],
    search: '',
    sortBy: 0,
}

const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}

const updateObj = (oldObject, newValues) => Object.assign({}, oldObject, newValues)

export const goToPayment = (state, action) => {

    return updateObj(
        state,
        { paymentStep: 'payment' }
    )
}

export const goToPaymentSuccess = (state, action) => {

    return updateObj(
        state,
        { paymentStep: 'success' }
    )
}

export const onChangeTextField = (state, action) => {

    const {
        name,
        value,
    } = action

    const obj = {}
    obj[name] = value
    return updateObj(
        state,
        obj
    )
}

export const onClickCategoryDropdown = (state, action) => {

    return updateObj(
        state,
        {
            dropdowns: {
                category: !state.dropdowns.category,
                sortBy: false
            }
        }
    )
}

export const onClickShowGridView = (state, action) => {

    return updateObj(
        state,
        {
            listingType: 'listing-grid'
        }
    )
}

export const onClickShowListView = (state, action) => {

    return updateObj(
        state,
        {
            listingType: 'listing-ribbon'
        }
    )
}

export const onClickSortByDropdown = (state, action) => {

    return updateObj(
        state,
        {
            dropdowns: {
                category: false,
                sortBy: !state.dropdowns.sortBy
            }
        }
    )
}

export const onDropdownSelection = (state, action) => {

    const {
        name,
        selected,
    } = action

    const obj = {}
    obj[name] = selected
    return updateObj(
        state,
        obj
    )
}

export const prepareAddProductToCollection = (state, action) => {

    const {
        productId
    } = action

    return updateObj(
        state,
        { productId }
    )
}

export const setActiveProduct = (state, action) => {

    const {
        productId
    } = action

    return updateObj(
        state,
        { activeProduct: productId }
    )
}

export const setCategories = (state, action) => {

    const {
        categories
    } = action

    return updateObj(
        state,
        { categories }
    )
}

export const setCollection = (state, action) => {

    const {
        collection
    } = action

    return updateObj(
        state,
        { collection }
    )
}

export const setCollections = (state, action) => {

    const {
        collections
    } = action

    return updateObj(
        state,
        { collections }
    )
}

export const setProducts = (state, action) => {

    const {
        products,
        savedProducts
    } = action

    return updateObj(
        state,
        {
            products,
            savedProducts
        }
    )
}

export const setSort = (state, action) => {

    const {
        sort
    } = action

    return updateObj(
        state,
        { sort }
    )
}

export const subscriptionFailure = (state, action) => {

    return updateObj(
        state,
        {  paymentError: true }
    )
}

export const toggleAddNewCollection = (state, action) => {

    return updateObj(
        state,
        {
            showAddNewCollection: !state.showAddNewCollection
        }
    )
}

export const toggleCollectionSelectionControl = (state, action) => {

    return updateObj(
        state,
        {
            showCollectionSelection: !state.showCollectionSelection
        }
    )
}

export const togglePaymentSelection = (state, action) => {

    return updateObj(
        state,
        {
            paymentSelection: state.paymentSelection === 'monthly'
                ? 'yearly'
                : 'monthly'
        }
    )
}

const reducers = {}
reducers[types.GO_TO_PAYMENT] = goToPayment
reducers[types.GO_TO_PAYMENT_SUCCESS] = goToPaymentSuccess
reducers[types.ONCHANGE_TEXT_FIELD] = onChangeTextField
reducers[types.ONCLICK_CATEGORY_DROPDOWN] = onClickCategoryDropdown
reducers[types.ONCLICK_SHOW_GRID_VIEW] = onClickShowGridView
reducers[types.ONCLICK_SHOW_LIST_VIEW] = onClickShowListView
reducers[types.ONCLICK_SORT_BY_DROPDOWN] = onClickSortByDropdown
reducers[types.ON_DROPDOWN_SELECTION] = onDropdownSelection
reducers[types.PREPARE_ADD_PRODUCT_TO_COLLECTION] = prepareAddProductToCollection
reducers[types.SET_ACTIVE_PRODUCT] = setActiveProduct
reducers[types.SET_CATEGORIES] = setCategories
reducers[types.SET_COLLECTION] = setCollection
reducers[types.SET_COLLECTIONS] = setCollections
reducers[types.SET_PRODUCTS] = setProducts
reducers[types.SET_SORT] = setSort
reducers[types.SUBSCRIPTION_FAILURE] = subscriptionFailure
reducers[types.TOGGLE_ADD_NEW_COLLECTION] = toggleAddNewCollection
reducers[types.TOGGLE_COLLECTION_SELECTION_CONTROL] = toggleCollectionSelectionControl
reducers[types.TOGGLE_PAYMENT_SELECTION] = togglePaymentSelection

const reducer = createReducer(InitialState, reducers)

module.exports = reducer
