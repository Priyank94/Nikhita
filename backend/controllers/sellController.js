const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Sell = mongoose.model('Sell');
const _ = require('lodash');


// router.get('/', (req, res) => {
//     // res.render("sell/addOrEdit", {
//     //     viewTitle: "Insert Sell"
//     // });
// });

router.post('/', (req, res) => {
    console.log(" req.body ",req.body)
    if (_.isEmpty(req.body._id))
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var sell = new Sell();
    sell.storeName = req.body.storeName;
    sell.sellDate = new Date(req.body.sellDate);
    sell.strSellDate = req.body.strSellDate;
    sell.dt = _.round(req.body.dt);
    sell.da = _.round(req.body.da);
    sell.achPer = _.round(req.body.achPer);
    sell.ff = _.round(req.body.ff);
    sell.bills = _.round(req.body.bills);
    sell.qty = _.round(req.body.qty);
    sell.aov = _.round(req.body.aov);
    sell.upt = _.round(req.body.upt);
    sell.asp = _.round(req.body.asp);
    sell.mtdt = _.round(req.body.mtdt);
    sell.mtda = _.round(req.body.mtda);
    sell.mAchPer = _.round(req.body.mAchPer);
    sell.dayOnlineSale = _.round(req.body.dayOnlineSale);
    sell.dayConsultations = _.round(req.body.dayConsultations);
    sell.mtdOnlineSale = _.round(req.body.mtdOnlineSale);
    sell.mtdConsultations = _.round(req.body.mtdConsultations);
    sell.save((err, doc) => {
        if (!err)
            res.send({
                statusCode: 200,
                msg: 'Sell saved successfuly...',
                data: doc
            })
        else {
            res.send({
                statusCode: 404,
                err: err
            })
        }
    });
}

function updateRecord(req, res) {
    Sell.updateOne({
        _id: req.body._id
    }, req.body, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.send({
                statusCode: 200,
                msg: 'Sell updated successfuly...',
                data: doc
            });
        } else {
            res.send({
                statusCode: 404,
                err: err
            });
        }
    });
}


//- find all records with pagination
router.get('/list', (req, res) => {
    var page = 1;
    var limit = 10;

    if(req.body.page) {
        page = req.body.page;
    }

    if(req.body.limit) {
        limit = req.body.limit;
    }

    const options = {
        page: page,
        limit: limit,
        sort:{
            _id: -1
        }
      };
       
      Sell.paginate({}, options, function(err, result) {
        // result.itemsList [here docs become itemsList]
        // result.paginator.itemCount = 100 [here totalDocs becomes itemCount]
        // result.paginator.perPage = 10 [here limit becomes perPage]
        // result.paginator.currentPage = 1 [here page becomes currentPage]
        // result.paginator.pageCount = 10 [here totalPages becomes pageCount]
        // result.paginator.next = 2 [here nextPage becomes next]
        // result.paginator.prev = null [here prevPage becomes prev]
        // result.paginator.slNo = 1 [here pagingCounter becomes slNo]
        // result.paginator.hasNextPage = true
        // result.paginator.hasPrevPage = false
        if (!err) {
            res.send({
                statusCode: 200,
                data: result
            });
        } else {
            res.send({
                statusCode: 404,
                err: err
            });
        }

      });
});


// function handleValidationError(err, body) {
//     for (field in err.errors) {
//         switch (err.errors[field].path) {
//             case 'fullName':
//                 body['fullNameError'] = err.errors[field].message;
//                 break;
//             case 'email':
//                 body['emailError'] = err.errors[field].message;
//                 break;
//             default:
//                 break;
//         }
//     }
// }

router.get('/:id', (req, res) => {
    Sell.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send({
                statusCode: 200,
                data: doc
            });
        } else {
            res.send({
                statusCode: 400,
                err: err
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Sell.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send({
                statusCode: 200,
                msg:'Record deleted successfully'
            });
        } else {
            console.log('Error in sell delete :' + err);
        }
    });
});


router.post('/prev-day-sale', (req, res) => {
    Sell.findOne({
        strSellDate: req.body.prevDate
    }, (err, doc) => {
        if (!err) {
            res.send({
                statusCode: 200,
                data: doc
            });
        } else {
            res.send({
                statusCode: 400,
                err: err
            });
        }
    });
});

module.exports = router;