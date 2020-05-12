var express = require('express');
var router = express.Router();
var tipsRepository = require('../repository/tipsRepository');
var repo2 = require('../repository/userAchievementRepository');
var UARepo = new repo2();
var Repo = new tipsRepository();
var userRepository = require('../repository/userRepository');
var UserRepo = new userRepository();
var achievementRepository = require('../repository/achievementRepository');
var AchievmentRepo = new achievementRepository();

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
// when we post we give user an achivement and update user's xp
//TODO we can check if he already has that acheivement
router.post('/', (req, res) => {
    var tip = req.body
    Repo.postTip(tip).then(x => {
        var obj = {user_id:req.body.user_id, achievement_id: 10}
        UARepo.create(obj).then(x=>{
            AchievmentRepo.getAchievementById(obj.achievement_id).then(y => {
                UserRepo.getById(obj.user_id).then(x => {
                    var user = x
                    user[0].xp = user[0].xp + y[0].xp
                    UserRepo.updateUser(obj.user_id, user)
                }).catch(err => {
                    console.log(err)
                })
            res.status(200).json(x);
        }).catch(err=>{
            res.status(500).json(err);
        })
    }).catch(err => {
        res.status(500).json(err);
    })
})})

module.exports = router;