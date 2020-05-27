const app = require("../server.js");
const supertest = require('supertest')
const request = supertest(app)
const dbConnection = require('../database/dbConnection');
var DbConnection = new dbConnection();

describe("achievement CRUD", () => {
    id=""
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
    it('Get all the achievements', async done => {
        const res = await request.get('/api/achievement')
        expect(res.status).toBe(200)
        done()
    })
    it("Post an achievement", async done => {
        const res = await request.post('/api/achievement')
        .send({description:'jest test achievement',name:'test', xp:0});
        id=res.body
        expect(res.status).toBe(200);
        done();
    });
    it('Get created achievement by id', async done => {
        const res = await request.get(`/api/achievement/${id}`)
        expect(res.body[0].id).toBe(id)
        done()
    })
    it("Delete achievement", async done =>{
        const res = await request.delete(`/api/achievement/${id}`);
        expect(res.status).toBe(200);
        done();
    })
})