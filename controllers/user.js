var express = require('express');
var router = express.Router();
var userRepository = require('../repository/userRepository');
var Repo = new userRepository();
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const axios = require("axios");

//get all users
router.get('/', (req, res) => {
    Repo.getAll().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json(err);
    })
})

//get user by id
router.get('/:id', (req, res) => {
    Repo.getById(req.params.id).then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
})

//get user by uuid
router.get('/uuid/:uuid', (req, res) => {
    Repo.getByUuid(req.params.uuid).then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
})

//update user
router.put('/:id', (req, res) => {
    Repo.updateUser(req.params.id, req.body).then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
})

//post user
router.post('/', (req, res) => {
    var user = req.body;
    user.id = uuidv4();
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    user.createdAt = date

    Repo.create(user).then(x => {
        res.status(200).json(x);
    }).catch(err => {
        res.status(500).json(err);
    })
})

//get user by uuid
router.get('/usageByDay/:startDate/:endDate',(req, res) => {
    var token=req.header('Authorization');
    var tokenSegments=token.split(' ');
    var actualToken=tokenSegments[1];
     
    getUsageByDay(req.params.startDate,req.params.endDate,actualToken).then(x=>{
        console.log(x)
        res.status(200).json(x);
    }).catch(x=>{
        res.status(500).json(x);
    })
   
})

function getUsageByDay(startDate,endDate,token) {
    return new Promise((resolve, reject) => {
        const requestUri = `https://dev.services.senti.cloud/databroker/v2/waterworks/data/usagebyday/${startDate}/${endDate}`;
        axios.get(requestUri, {headers :{ 'Authorization': 'Bearer ' + token}}).then(x => {
            var data = x.data;
            var sum = 0;
            data.forEach(item => {
                sum += item.averageFlowPerDay
            });
            data.push("sum",{
                sumOfAvgM3:(sum).toFixed(2),
                sumOfAvgMl:(sum * 100).toFixed(2),
                sumOfAvgL:(sum * 1000).toFixed(2)
            })
            // data.push({sumOfAvgMl:(sum * 100).toFixed(2)})
            // data.push({sumOfAvgL:(sum * 1000).toFixed(2)})
            // data.sumOfAvgM3 = (sum).toFixed(2);
            // data.sumOfAvgMl = (sum * 100).toFixed(2);
            // data.sumOfAvgL = (sum * 1000).toFixed(2);
            resolve(data);
        }).catch(error => {
            reject(error);
        });         
    });
}
module.exports = router;