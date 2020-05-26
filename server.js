#!/usr/bin/env nodejs
process.title = "senti-act-game-engine-framework"
const dotenv = require('dotenv')
dotenv.config();
if (dotenv.error) {
    console.warn(dotenv.error)
}
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
var app = express()
    , server = require('http').createServer(app);
const bodyParser = require('body-parser')

app.use(helmet())
// app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb'}));

// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' }))
app.use(cors())

//CONTROLLERS
const userController = require('./controllers/user');
const tipsController = require('./controllers/tips');
const levelController = require('./controllers/level');
const competitionController = require('./controllers/competition');
const achievementController = require('./controllers/achievement');
const userCompetitionController = require('./controllers/userCompetition');
const activityController = require('./controllers/activity');
const userAchievementController = require('./controllers/userAchievement');

// const dbConnection = require('./database/dbConnection');

// var DbConnection = new dbConnection();
app.use('/api/users', userController);
app.use('/api/tips', tipsController);
app.use('/api/level', levelController);
app.use('/api/competition', competitionController);
app.use('/api/achievement', achievementController);
app.use('/api/user/competition', userCompetitionController);
app.use('/api/activity', activityController);
app.use('/api/user/achievement', userAchievementController);


app.get('/', (req, res) => {
    res.end('SUCCESS');
})

app.get('/api', (req, res) => {
    var endpoints = listEndpoints(app);
    var counter = 0;
    var mystring = "";
    endpoints.forEach(x => {
        x.methods.forEach(y => {
            counter++;
            mystring += `${y}: ${x.path}\n`
        })
    })
    var finalString = `API Endpoints ${counter} pcs:\n`;
    finalString += mystring;
    res.status(200).send(finalString);
})

module.exports=app;
// server.listen(port, () => {
    // DbConnection.createPool().then(x => {
    //     //             console.log('Database connected');
    //     //         })
// })

//---Start the express server---------------------------------------------------

// const startServer = () => {
//     server.listen(port, () => {
//         console.log('Senti Service started on port', port)
//         DbConnection.createPool().then(x => {
//             console.log('Database connected');
//         })
//     }).on('error', (err) => {
//         if (err.errno === 'EADDRINUSE') {
//             console.log('Service not started, port ' + port + ' is busy')
//         } else {
//             console.log(err)
//         }
//     })
// }

// startServer()


// --> LOGIN FLOW
// 1: login from the app by the given endpoint
// 2a: save the user to our databse if he is missing data or doesnt exist
// 2b: just throw him to the app if exists
// 3: save the token to asyncstorage and call all of our endpoints with the bearer: token

// --> REGISTER FLOW
// 1: register from the by the given endpoint
// 2: save the user to our database and
// 3: authenticate in to the app

// --> how do we verify the token ?? token --> contains uuid ? do we wanna get it on the fly or save it to db 
// 1: create verifyToken middleware
// 2: insert it to our endpoitns where we need verification
// 3: if else if token doesnt match 

//plan A : get uuid from token when request --> optimal
//plan B : get uuid from users device on each request when needed --> lame version