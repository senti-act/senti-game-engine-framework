var express = require('express');
var router = express.Router();
var achievementRepository = require('../repository/achievementRepository');
var Repo = new achievementRepository();

//get all achievements
router.get('/', (req, res) => {
    Repo.getAll().then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    Repo.getAchievementById(req.params.id).then(x => {
        res.status(200).json(x);
    }).catch(err => {
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

// get xp from achievement by user id
router.get('/xp/users/:id', (req, res) => {
    Repo.getXpFromAchievementByUserId(req.params.id).then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
})

// post achievement
router.post('/', (req, res) => {
    var achievement = req.body;
    Repo.createAchievement(achievement).then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
})

router.delete('/:id', (req, res) => {
    Repo.delete(req.params.id).then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
})


module.exports = router;