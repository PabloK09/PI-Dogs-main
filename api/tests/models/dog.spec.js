const { Breed, Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");
const { v4: uuidv4 } = require("uuid");

describe("Breed model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Breed.sync({ force: true }));
    describe("id", () => {
      it("should throw an error if id is null", (done) => {
        Breed.create({})
          .then(() => done(new Error("It requires a valid id")))
          .catch(() => done());
      });
      it("should work when its a valid id", () => {
        Breed.create({ id: uuidv4() });
      });
    });
    
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Breed.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Breed.create({ name: "PugTest" });
      });
    });

    describe("weight", () => {
      it("should throw an error if weight is null", (done) => {
        Breed.create({})
          .then(() => done(new Error("It requires a valid weight")))
          .catch(() => done());
      });
      it("should work when its a valid weight", () => {
        Breed.create({ weight: [10, 20] });
      });
    });

    describe("height", () => {
      it("should throw an error if height is null", (done) => {
        Breed.create({})
          .then(() => done(new Error("It requires a valid height")))
          .catch(() => done());
      });
      it("should work when its a valid height", () => {
        Breed.create({ height: [30, 50] });
      });
    });

    describe("life span", () => {
      it("should not throw an error if life_span is null", (done) => {
        Breed.create({})
          .then(() => done())
          .catch(() => done());
      });
      it("should work when its a valid life span", () => {
        Breed.create({ life_span: [5, 20] });
      });
    });

    const breedTest = {
      id: uuidv4(),
      name: "testing",
      weight: [30, 50],
      height: [25, 45],
      life_span: [10, 15],
    };

    describe("Breed Create", () => {
      it("should throw an error if Breed Create is null", (done) => {
        Breed.create({})
          .then(() => done(new Error("It requires a valid height")))
          .catch(() => done());
      });
      it("should work when its a valid Breed Create", () => {
        Breed.create(breedTest);
      });
    });
  });
  describe("Temperament model", () => {
    before(() =>
      conn.authenticate().catch((err) => {
        console.error("Unable to connect to the database:", err);
      })
    );

    describe("Validators", () => {
      beforeEach(() => Temperament.sync({ force: true }));
      describe("id", () => {
        it("should throw an error if id is null", (done) => {
          Temperament.create({})
            .then(() => done(new Error("It requires a valid id")))
            .catch(() => done());
        });
        it("should work when its a valid id", () => {
          Temperament.create({ id: uuidv4() });
        });
      });

      describe("name", () => {
        it("should throw an error if name is null", (done) => {
          Temperament.create({})
            .then(() => done(new Error("It requires a valid name")))
            .catch(() => done());
        });
        it("should work when its a valid name", () => {
          Temperament.create({ name: "Testing" });
        });
      });
    });
  });
});
