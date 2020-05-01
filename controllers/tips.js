var express = require('express');
var router = express.Router();
var tipsRepository = require('../repository/tipsRepository');
var repo2 = require('../repository/userAchievementRepository');
var UARepo = new repo2();
var Repo = new tipsRepository();

//get all approved tips
router.get('/',(req,res)=>{
    Repo.getAllApproved().then(tips=>{
        res.status(200).json(tips);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

//get all categories
router.get('/categories',(req,res)=>{
    Repo.getAllCategories().then(x=>{
        res.status(200).json(x);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

//get approved tips by category_id
router.get('/:id', (req, res) => {
    Repo.getByCategoryId(req.params.id).then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
})

//post tip
router.post('/', (req, res) => {
    var tip = req.body
    Repo.postTip(tip).then(x => {
        var obj = {user_id:req.body.user_id, achievement_id: 10}
        UARepo.create(obj).then(x=>{
            res.status(200).json(x);
        }).catch(err=>{
            res.status(500).json(err);
        })
    }).catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;