var mongoose = require('mongoose')

var productSchema = mongoose.Schema({
    aliExpressUrl: String,
    blueRibbon: Boolean,
    categories: [Number],
    greenRibbon: Boolean,
    imageUrl: String,
    orders: Number,
    price: Number,
    productId: Number,
    rank: Number,
    reviewsCount: Number,
    reviewScore: Number,
    supplierScore: Number,
    title: String,
});

module.exports = mongoose.model('Product', productSchema)