const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    prod_name: { type: String },
    prod_desc: { type: String },
    prod_price: { type: Number },
    manuf_date: { type: Date, default: Date.now },
    exp_date: { type: Date, default: Date.now },
    barcode: { type: Number }
})

module.exports = mongoose.model('Product', ProductSchema)
