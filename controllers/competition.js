var express = require('express');
var router = express.Router();
var competitionRepository = require('../repository/competitionRepository');
var Repo = new competitionRepository();
const moment = require('moment');

//get all competitions
router.get('/',(req,res)=>{
    Repo.getAll().then(x=>{
        res.status(200).json(x);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

//get all userCompetitions
router.get('/userCompetitions',(req,res)=>{
    Repo.getAllUserCompetition().then(x=>{
        res.status(200).json(x);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

module.exports = router;