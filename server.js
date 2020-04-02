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
const port = process.env.NODE_PORT || 4000

app.use(helmet())
app.use(bodyParser.json())
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//CONTROLLERS
const userController=require('./controllers/user');
const tipsController=require('./controllers/tips');
const levelController=require('./controllers/level');
const competitionController=require('./controllers/competition');
const achievementController=require('./controllers/achievement');

const dbConnection=require('./database/dbConnection');

var DbConnection=new dbConnection();
app.use('/api/users',userController);
app.use('/api/tips',tipsController);
app.use('/api/level',levelController);
app.use('/api/competition',competitionController);
app.use('/api/achievement',achievementController);


app.get('/',(req, res)=>{
    res.end('SUCCESS');
})

app.get('/api',(req,res)=>{
    var endpoints=listEndpoints(app);
    var counter=0;
    var mystring="";
    endpoints.forEach(x=>{
        x.methods.forEach(y=>{
            counter++;
            mystring+=`${y}: ${x.path}\n`
        })
    })
    var finalString=`API Endpoints ${counter} pcs:\n`;
    finalString+=mystring;
    res.status(200).send(finalString);
})

server.listen(port,()=>{
    DbConnection.createPool().then(x=>{
        console.log('Database connected');
    })
})

//---Start the express server---------------------------------------------------

const startServer = () => {
	app.listen(port, () => {
		console.log('Senti Service started on port', port)
	}).on('error', (err) => {
		if (err.errno === 'EADDRINUSE') {
			console.log('Service not started, port ' + port + ' is busy')
		} else {
			console.log(err)
		}
	})
}

startServer()
