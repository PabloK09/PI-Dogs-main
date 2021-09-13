/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Breed, Temperament, conn } = require("../../src/db.js");
const { v4: uuidv4 } = require("uuid");

const agent = session(app);
const dog = {
  id: uuidv4(),
  name: "Pug",
  weight: [10, 20],
  height: [10, 20],
};
const temp = {
  id: uuidv4(),
  name: "Testing"
}

describe("Breed routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(() => {
    Breed.sync({ force: true }).then(() => Breed.create(dog))
    Temperament.sync({ force: true }).then(() => Temperament.create(temp))
  })

  describe("GET /dogs", () => {
    it("should get 200", () => {
      agent.get("/dogs").expect(200).expect("Content-type", /json/);
    });
    it("should get 200 and matching query name breeds", () => {
      agent.get("/dogs?name=Affe").expect(200).expect("Content-type", /json/);
    });
    it("should get 404 and not matching query name breeds", () => {
      agent
        .get("/dogs?name=Affeeeeeeee")
        .expect(404)
        .expect("Content-type", /json/);
    });
  });

  describe("GET /dogs/:id", () => {
    it("should get a breed by id", () => {
      agent
        .get("/dogs/1")
        .expect(200)
        .expect("Content-type", /json/)
        .expect((res) => {
          expect(res.body.name).toEqual("Affenpinscher");
        });
    });
    it("should get 404 and not matching query name breeds", () => {
      agent
        .get("/dogs/1111")
        .expect(404)
        .expect("Content-type", /json/);
    });
  });

  describe("POST /dog", () => {
    it("should add a breed in data base", () => {
      agent
        .post("/dog")
        .send(dog)
        .expect(200)
        .expect("Content-type", /json/)
        .expect((res) => {
          expect(res.body).toEqual(dog);
        });
    });
    it("should return a error if dog has a property null", () => {
      agent
        .post("/dog")
        .send({})
        .expect(404)
        .expect("Content-type", /json/)
        .expect((res) => {
          expect(res.body).toEqual({});
        });
    });
  });
  describe("GET /temperament", () => {
    it("should return all temperaments", () => {
      agent
      .get("/temperament")
      .expect(200)
      .expect("Content-type", /json/)
    })
  })
});
