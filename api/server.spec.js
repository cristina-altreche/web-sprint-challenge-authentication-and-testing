const request = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");
const { intersect } = require("../database/dbConfig");
const { expectCt } = require("helmet");

let token = "";

describe("server", function () {
  it("should run the tests", function () {
    expect(true).toBe(true);
  });
});


// FIRST ENDPOINT TEST
describe("/api/auth/login", function () {
  // REGISTER USER
  beforeEach(async () => {
    await request(server).post("/api/auth/register").send({
      username: "test user",
      password: "test pass",
    });
  });

  // FIRST CHECK FOR 200 RESPONSE
  it("should respond with status 200", function () {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "test user",
        password: "test pass",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  // THEN CHECK FOR MESSAGE
  it("should respond with message welcome to our api", function () {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "test user",
        password: "test pass",
      })
      .then((res) => {
        expect(res.body.message).toBe("Welcome to our API");
      });
  });
});

// SECOND ENDPOINT TEST
describe('/api/auth/register', function() {

    beforeEach(async () => {
        await db("users").truncate()
    })

    //FIRST CHECK FOR STATUS 400
    it('should respond with status 400', function() {
        return request(server)
        .post('/api/auth/register')
        .send({
            "username": "test user",
            // "password": "test pass"

        })
        .then(res => {
            expect(res.status).toBe(400)
        })
    })

    // THEN CHECK FOR ERROR RESPONSE
    it('should respond with an error', function() {
        return request(server)
        .post('/api/auth/register')
        .send({
            "username": "test user",
            // "password": "test pass"
        })
        .then(res => {
            token = res.body.token
            expect(res.body.message).toBe("Please provide username and password")
        })
    })
})



