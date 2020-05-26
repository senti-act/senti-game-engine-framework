const app = require("../server.js");
const supertest = require('supertest')
const request = supertest(app)
const dbConnection = require('../database/dbConnection');
var DbConnection = new dbConnection();


describe("Test the root path", () => {
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
  it("Should respond 200 OK the GET method", async done => {
      const res = await request.get('/api/users');
      expect(res.status).toBe(200);
      done();
  });
});
// it('Get all the achievements', async done => {
//     const res = await request.get('/')
//     expect(res.status).toBe(200)
//     console.log(res.data)
//     done()
// })

// it('Get the achievement by id', async done => {
//     const res = await request.get('/achievement/').send({id: '1'})
//     expect(res.body).toBe(1)
//     done()
// })
