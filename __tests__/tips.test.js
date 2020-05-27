const app = require("../server.js");
const supertest = require('supertest')
const request = supertest(app)
const dbConnection = require('../database/dbConnection');
var DbConnection = new dbConnection();

describe("create tip, get and delete", () => {
    var id;
    var tip_id;
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
        .send({nickname:'tiptest', xp:0,level_id:1});
        expect(res.status).toBe(200);
        var userId = res.body.id
        id = userId
        done();
    });
    it("Get created user", async done =>{
        const res = await request.get(`/api/users/${id}`);
        expect(res.status).toBe(200);
        done();
    })
    it("Create a tip", async done => {
        const res = await request.post('/api/tips')
        .send(
            {user_id:id,
             category_id: 1,
             description:"test_",
             approved:1,
             anonymous:0,
             title:'test'
            });
        expect(res.status).toBe(200);
        done();
    });
    it("Get the created tip", async done =>{
        const res = await request.get(`/api/tips/user/${id}`);
        var x = res.body[0].id;
        tip_id = x
        expect(res.status).toBe(200);
        done();
    })
    it("Delete tip", async done =>{
        const res = await request.delete(`/api/tips/${tip_id}`);
        expect(res.status).toBe(200);
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
})