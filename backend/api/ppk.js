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

/*
    "idUser" : 123
*/

router.get('/getOwnBarang',(req,res,next)=>{
    const query= "Select * from Barang where idUser = " + req.body.idUser;
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
    "stokBarang": 5
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
    "idBarang": 231,
    "namaBarang": "pentol",
    "batasSewa": "2018-11-29T02:36:47.697Z"
}
*/

router.post('/postSewa',(req,res,next)=>{
    console.log(req.user);
    let query="insert into sewa(idUser,idBarang,namaBarang,batasSewa,username)" +
    "values("+req.user._id+","+req.body.idBarang+",'"+req.body.namaBarang+"','"+req.body.batasSewa+"','"+req.user.username+"')"
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json('done');
    }).catch(err=>{
        res.status(404);
        res.json(err);
    })
})

module.exports = router;