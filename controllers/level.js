var express = require('express');
var router = express.Router();
var levelRepository = require('../repository/levelRepository');
var userRepository = require('../repository/userRepository');
var Repo = new levelRepository();
var UserRepo = new userRepository();

//get all levels
router.get('/', (req, res) => {
    Repo.getAllLevels().then(levels => {
        res.status(200).json(levels);
    }).catch(err => {
        res.status(500).json(err);
    })
})

//get user's level
router.get('/:id', (req, res) => {
    Repo.getAllLevels().then(levels => {
        var x = []
        var min = 0;
        UserRepo.getById(req.params.id).then(user => {
            for (var l of levels) {
                if (user[0].xp < l.neededXP) {
                    x.push(l.id)
                }
            }
            min = Math.min(...x)
            res.status(200).json({ level: min });
        }
        ).catch(err => {
            console.log(err)
            res.status(500).json({ level: 'dupa' });
        })
    }).catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;