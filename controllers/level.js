var express = require('express');
var router = express.Router();
var levelRepository = require('../repository/levelRepository');
var Repo = new levelRepository();

//get all levels
router.get('/',(req,res)=>{
    Repo.getAllLevels().then(levels=>{
        res.status(200).json(levels);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

module.exports = router;