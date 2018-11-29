const express = require('express');
const options = require('../db/connectionAzure');
const router = express.Router();

var knex = require('knex')(options);


router.get('/',(req,res)=>{
    res.json(
     req.user
    )
})




//doesn't need any body to accses . this is get method
router.get('/getBarang',(req,res,next)=>{
    const query= "Select * from Barang"
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json(ress);
    }).catch(err=>{
        res.status(404).json(err);
    })
})

router.get('/getSewa',(req,res,next)=>{
    const query= "Select * from sewa"
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json(ress);
    }).catch(err=>{
        res.status(404).json(err);
    })
})




//when you want to accses with post thread method in this route , 
//you need to pass body like this
/*

{
    "namaBarang": "Coba dari Backend 2",
    "stokBarang": "Mari kita coba apakah bisa pada percobaan ke 2 ini"
}
 make sure you pass with right key , so backend can catch your pass , otherwise
 it will return an error

*/

router.post('/postBarang',(req,res,next)=>{
    console.log(req.user);
    let query="insert into Barang(idUser, namaBarang, stokBarang, username)" +
    "values("+req.user._id+",'"+req.body.namaBarang+"',"+req.body.stokBarang+",'"+req.user.username+"')"
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json('done');
    }).catch(err=>{
        res.status(404);
        res.json(err);
    })
})

/*
{
    
}
*/


module.exports = router;