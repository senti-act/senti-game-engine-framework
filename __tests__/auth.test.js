const app = require("../server.js");
const supertest = require('supertest')
const request = supertest(app)
const dbConnection = require('../database/dbConnection');
var DbConnection = new dbConnection();
var moment = require('moment');

describe("authentication", () => {
    var auth_token;
    beforeAll(() => {
        DbConnection.createPool().then(x => {
        console.log('Database connected');
        })
    });
    afterAll(() => {
        DbConnection.closeConnection().then(x=>{
        console.log('Database closed');
        }).catch(x=>{
        console.log("Error occured while closing database connection")
        })
    });
    it("authenticate user", async done => {
        const res = await request.post('/api/users/auth')
        .send({orgNickname:'', username:'',password:''});
        expect(res.status).toBe(200);
        var tok = res.body.data.token
        auth_token = tok
        console.log(auth_token)

        done();
    });
    // it("Get weekly consumption", async done =>{
    //     var today =moment().format("YYYY-MM-DD");
    //     var last_week = moment().subtract(7,'days');
    //     const res = await request.get(`/api/users/usageByDay/${last_week}/${today}/`)
    //     .set('Authorization', 'bearer ' + auth_token);
    //     console.log(auth_token)
    //     expect(res.status).toBe(200);
    //     done();
    // })
     // it("Get monthly consumption", async done =>{
    //     var today =moment().format("YYYY-MM-DD");
    //     var last_month = moment().subtract(30,'days');
    //     const res = await request.get(`/api/users/usageByDay/${last_month}/${today}/`)
    //     .set('Authorization', 'bearer ' + auth_token);
    //     console.log(auth_token)
    //     expect(res.status).toBe(200);
    //     done();
    // })
  
})