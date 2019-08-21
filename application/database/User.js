var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
    collections: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Collection'
        }
    ],
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    local: {
        email: String,
        password: String,
    },
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        }
    ],
    stripe: {
        customer: Object,
        paidUntilDate: Date,
        subscription: Object,
        autoRenew: Boolean,
        token: Object
    },
    type: String
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema)