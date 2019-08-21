const { combineReducers } = require('redux')
const Profitly = require('./Profitly')

module.exports = combineReducers({
    profitly: Profitly,
})