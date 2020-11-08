const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

/* GET ALL ORDERS */
router.get('/', (req, res) => {
    database.table('orders_details as od')
    .join([
        {
            table: 'orders as o',
            on: 'o.id = od.order_id'
        },
        {
            table: 'products as p',
            on: 'p.id = od.product_id'
        },
        {
            table: 'users as u',
            on: 'u.id = o.user_id'
        }
    ])
    .withFields(['o.id', 'p.title as name','p.description', 'p.price', 'u.username'])
    .sort({id: 1})
    .getAll()
    .then(orders =>{
        if(orders.length > 0){
            res.status(200).json(orders);
        }else{
            res.json({message: 'No Oders Found'});
        }
    }).catch(err => console.log(err));
});

// GET SINGLE ORDER
router.get('/:id', (req, res)=> {
    const orderId = req.params.id;


    database.table('orders_details as od')
    .join([
        {
            table: 'orders as o',
            on: 'o.id = od.order_id'
        },
        {
            table: 'products as p',
            on: 'p.id = od.product_id'
        },
        {
            table: 'users as u',
            on: 'u.id = o.user_id'
        }
    ])
    .withFields(['o.id', 'p.title as name','p.description', 'p.price', 'u.username'])
    .filter({'o.id': orderId})
    .getAll()
    .then(orders =>{
        if(orders.length > 0){
            res.status(200).json(orders);
        }else{
            res.json({message: `No Oders Found with orderId ${orderId}`});
        }
    }).catch(err => console.log(err));
})

// PLACE A NEW ORDER
// https://www.youtube.com/watch?v=2fEukDAXkgY&list=PLsjmv9aDmNDAN5adZxbGTlQHlgU2je7KE&index=5  @ 9:58 mins in YouTube
// 
// POSTMAN EXAMPLE QUERY/POST
//  {
//     "userId": "2",
//     "products":
//     [{"id": "1", "incart":"2"},{"id": "18", "incart": "5"},{"id": "32", "incart": "3"},{"id": "18", "incart": "5"},{"id": "13", "incart": "8"}]
// }

router.post('/new', (req, res) => {

    let {userId, products} = req.body;

    console.log(userId, products);
});



module.exports = router;