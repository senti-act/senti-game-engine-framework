var express = require('express');
var router = express.Router();
var achievementRepository = require('../repository/achievementRepository');
var Repo = new achievementRepository();

//get all achievements
router.get('/',(req,res)=>{
    Repo.getAll().then(x=>{
        res.status(200).json(x);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

//get achievements by userId
router.get('/users/:id', (req, res) => {
    Repo.getAchievementsByUserId(req.params.id).then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
}) 

module.exports = router;