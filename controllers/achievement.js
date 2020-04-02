var express = require('express');
var router = express.Router();
var achievementRepository = require('../repository/achievementRepository');
var Repo = new achievementRepository();
const uuidv4 = require('uuid/v4');
const moment = require('moment');

//get all achievements
router.get('/',(req,res)=>{
    Repo.getAll().then(users=>{
        res.status(200).json(users);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

//get acheivements by userId
router.get('/users/:id', (req, res) => {
    Repo.getAchievementsByUserId(req.params.id).then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
}) 

module.exports = router;