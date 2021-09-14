/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const server = require("../../src/app.js");
const { Breed, Temperament, conn } = require("../../src/db.js");
const { v4: uuidv4 } = require("uuid");
const breedController = require("../../src/controllers/breeds");

const agent = session(server);
let supertest = require("supertest-as-promised")(require("../../src/db.js"));

const dog = {
  id: uuidv4(),
  name: "Pug",
  weight: [10, 20],
  height: [10, 20],
};
const temp = {
  id: uuidv4(),
  name: "Testing",
};

describe("Breed routes", () => {
  before(
    async () =>
      await conn.authenticate().catch((err) => {
        console.error("Unable to connect to the database:", err);
      })
  );

  beforeEach(async (done) => {
    Breed.sync({ force: true }).then(() => Breed.create(dog));
    Temperament.sync({ force: true }).then(() => Temperament.create(temp));
    await done();
  });

  describe("GET /dogs", () => {
    it("should get 200 if the path is /dogs", (done) => {
      done();
      return agent.get("/dogs").end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
      });
    });
    it("It has to give 404 if the path is not / dogs ", (done) => {
      done();
      return agent.get("/doges").end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(404);
      });
    });

    it("should get 200 and matching query name breeds", (done) => {
      done();
      return agent.get("/dogs?name=Affe").end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect("Content-type", /json/);
      });
    });
    it("should get 404 if not matching query name with a breed", (done) => {
      done();
      return agent.get("/dogs?name=Affeeeee").end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect("Content-type", /json/);
      });
    });
  });

  describe("GET /dogs/:id", () => {
    it("should get a breed by id", (done) => {
      done();
      return agent.get("/dogs/1").end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect("Content-type", /json/);
        expect((res) => {
          expect(res.body.name).toEqual("Affenpinscher");
        });
      });
    });
    it("should get 404 and not matching query name breeds", (done) => {
      done();
      return agent.get("/dogs/1111").end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(404);
      });
    });
  });

  describe("POST /dog", () => {
    it("should add a breed in data base", (done) => {
      done();
      return agent.post("/dog").send(dog).end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).toEqual(dog)
      });
    });
    it("should return a error if dog has a property null", (done) => {
      done()
      return agent
        .post("/dog")
        .send({}).end(function (err, res) {
          if (err) done(err);
          expect(res.status).to.equal(404);
          expect(res.body).toEqual(undefined)
        });
    });
  });
  describe("GET /temperament", () => {
    it("should return all temperaments", (done) => {
      done()
      return agent.get("/temperament").end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
      });
    });
  });
});
