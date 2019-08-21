var mongoose = require('mongoose')

var collectionSchema = mongoose.Schema({
    name: String,
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        }
    ],
});

module.exports = mongoose.model('Collection', collectionSchema)