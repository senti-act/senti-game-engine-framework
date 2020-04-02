var express = require('express');
var router = express.Router();
var levelRepository = require('../repository/levelRepository');
var Repo = new levelRepository();

//get all approved tips
router.get('/',(req,res)=>{
    Repo.getAllLevels().then(tips=>{
        res.status(200).json(tips);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

module.exports = router;