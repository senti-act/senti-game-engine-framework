var express = require('express');
var router = express.Router();
var userCompetitionRepository = require('../repository/userCompetitionRepository');
var Repo = new userCompetitionRepository();

//get all by ID
router.get('/:id',(req,res)=>{
    Repo.getById(req.params.id).then(x=>{
        res.status(200).json(x);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

//get all order by points desc
router.get('/order/:id',(req,res)=>{
    Repo.orderByPoints(req.params.id).then(x=>{
        res.status(200).json(x);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

module.exports = router;