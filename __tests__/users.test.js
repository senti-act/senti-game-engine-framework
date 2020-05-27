const app = require("../server.js");
const supertest = require('supertest')
const request = supertest(app)
const dbConnection = require('../database/dbConnection');
var DbConnection = new dbConnection();


describe("post get and delete users", () => {
        var id=''
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
    it("Create a user", async done => {
        const res = await request.post('/api/users')
        .send({nickname:'jesttest', xp:0,level_id:1});
        expect(res.status).toBe(200);
        id = res.body.id
        done();
    });
    it("Get created user by id", async done =>{
        const res = await request.get(`/api/users/${id}`);
        expect(res.body[0].nickname).toBe('jesttest');
        done();
    })
    it("Delete created user", async done =>{
        const res = await request.delete(`/api/users/${id}`);
        expect(res.status).toBe(200);
        done();
    })
});

describe("posting and tracking the points for the user", () => {
    var id=''
    var achievements = []
    var points = 0
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
    it("Create a user", async done => {
        const res = await request.post('/api/users')
        .send({nickname:'jestpoints', xp:0,level_id:1});
        expect(res.status).toBe(200);
        var userId = res.body.id
        id = userId
        done();
    });
    it("Get created user", async done =>{
        const res = await request.get(`/api/users/${id}`);
        expect(res.body[0].xp).toBe(0);
        done();
    })
    it("Get all achievemnts", async done =>{
        const res = await request.get(`/api/achievement`);
        queryAchievements = res.body
        achievements = queryAchievements
        expect(res.status).toBe(200);
        done();
    })
    it("Get achievement", async done =>{
        const res = await request.get(`/api/achievement/${achievements[0].id}`);
        xp = res.body[0].xp
        points = xp
        expect(res.body[0].id).toBe(1);
        done();
    })

    it("Give achievement to a user", async done =>{
        const res = await request.post(`/api/user/achievement`)
        .send({user_id:id,achievement_id:achievements[0].id});
        expect(res.status).toBe(200);
        done();
    })

    it("Get user", async done =>{
        const res = await request.get(`/api/users/${id}`);
        expect(res.body[0].xp).toBe(points);
        done();
    })
    it("Delete user achievement", async done =>{
        const res = await request.delete(`/api/user/achievement/${id}`);
        expect(res.status).toBe(200);
        done();
    })
    it("Delete created user", async done =>{
        const res = await request.delete(`/api/users/${id}`);
        expect(res.status).toBe(200);
        done();
    })
});


