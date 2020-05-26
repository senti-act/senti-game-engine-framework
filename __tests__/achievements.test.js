const request = require("supertest");
const { app, server } = require("../server");



describe("Test the root path", () => {
    // afterEach(() => {
    //     server.close();
    //   });

    test("It should response the GET method", () => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200)
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
