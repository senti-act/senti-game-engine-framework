var express = require('express');
var router = express.Router();
var activityRepository = require('../repository/activityRepository');
var Repo = new activityRepository();

//get all activities
router.get('/',(req, res)=>{
    Repo.getAll().then(x=>{
        res.status(200).json(x);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

//get activity by id
router.get('/activity/:id',(req, res)=>{
    Repo.getActivityById(req.param).then(x=>{
        res.status(200).json(x);})
        .catch(err=>{
            res.status(500).json(err);
        })
    })

//get activity by userId
router.get('/users/:id',(req, res)=>{
    Repo.getActivityByUserId(req.param).then(x=>{
         res.status(200).json(x);})
        .catch(err=>{
             res.status(500).json(err);
            })
        })
    
module.exports = router;