const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate-v2');

var SellSchema = new Schema({
    storeName: {
        type: String,
        required: 'This field is required.',
    },
    strSellDate: {
        type:String,
        // unique:true
    },
    sellDate: {
        type: Date
    },
    dt: {
        type: Number
    },
    da: {
        type: Number
    },
    achPer: { //* Per = Percentage
        type: Number
    },
    ff: {
        type: Number
    },
    bills: {
        type: Number
    },
    qty: {
        type: Number
    },
    aov: {
        type: Number
    },
    upt: {
        type: Number
    },
    asp: {
        type: Number
    },
    mtdt: {
        type: Number
    },
    mtda: {
        type: Number
    },
    mAchPer: { //* m = month, Per = Percentage
        type: Number
    },
    dayOnlineSale: {
        type: Number
    },
    dayConsultations: {
        type: Number
    },
    mtdOnlineSale: {
        type: Number
    },
    mtdConsultations: {
        type: Number
    }
});

SellSchema.plugin(timestamps);
SellSchema.plugin(mongoosePaginate);

global.deepPopulate = require('mongoose-deep-populate')(mongoose);
global.timestamps = require('mongoose-timestamp');

// global.uniqueValidator = require('mongoose-unique-validator');
// global.validators = require('mongoose-validators');

// Custom validation for email
// sellSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

module.exports = mongoose.model('Sell', SellSchema);