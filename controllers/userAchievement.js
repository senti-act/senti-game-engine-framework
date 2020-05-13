var express = require('express');
var router = express.Router();
var userAchievementRepository = require('../repository/userAchievementRepository');
var userRepository = require('../repository/userRepository');
var Repo = new userAchievementRepository();
var UserRepo = new userRepository();
var achievementRepository = require('../repository/achievementRepository');
var AchievmentRepo = new achievementRepository();

//get by userID
router.get('/:id', (req, res) => {
    Repo.getByUserId(req.params.id).then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
})

// //get by userID and achievementID
// router.get('/:id', (req, res) => {
//     Repo.getByUserId(req.params.id).then(x => {
//         res.status(200).json(x);
//     }).catch(err => {
//         res.status(500).json(err);
//     })
// })

//post user achievement
// when we post it we update user's xp
router.post('/', (req, res) => {
    var obj = req.body;
    Repo.create(obj).then(x => {
        AchievmentRepo.getAchievementById(obj.achievement_id).then(y => {
            UserRepo.getById(obj.user_id).then(x => {
                var user = x
                user[0].xp = user[0].xp + y[0].xp
                UserRepo.updateUser(obj.user_id, user)
            }).catch(err => {
                console.log(err)
            })
        }).catch(err =>
            console.log(err))
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;