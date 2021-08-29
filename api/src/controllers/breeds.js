const { Breed, Temperament } = require("../db.js");
const ModelCrud = require("./index");
const axios = require("axios");
const { BASE_URL, SEARCH_NAME } = require("../utils/constants");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

class BreedModel extends ModelCrud {
  constructor(model) {
    super(model);
  }
  getAllv2 = (req, res, next) => {
    const { name } = req.query;
    try {
      if (name) {
        const myBreed = this.model.findAll({
          include: [
            {
              model: Temperament,
              as: "temperament",
              attributes: ["id", "name"],
            },
          ],
          where: {
            name: {
              [Op.substring]: `${name}`,
            },
          },
        });
        const apiBreeds = axios.get(SEARCH_NAME + `/?name=${name}`);
        Promise.all([myBreed, apiBreeds]).then((results) => {
          const [myBreedResults, apiBreedsResults] = results;
          const responde = myBreedResults.concat(apiBreedsResults.data);
          return responde.length
            ? res.send(responde)
            : res.send({ message: "La raza no existe" });
        });
      } else {
        const myBreed = this.model.findAll({
          include: [
            {
              model: Temperament,
              as: "temperament",
              attributes: ["id", "name"],
            },
          ],
        }); //me traigo todo lo que tenga
        const apiBreeds = axios.get(BASE_URL); //aplico axios para pedirle data a mi api
        Promise.all([myBreed, apiBreeds]) //Hago un promise all para que cuando ya este lista la promesa de mi db y de mi api me devuelva todo junto al mismo tiempo
          .then((results) => {
            //lo que me devuelve
            const [myBreedResults, apiBreedsResults] = results; //van a ser 2 arreglo y por eso le hago un destructuring al results
            const responde = myBreedResults.concat(apiBreedsResults.data); //y lo que voy a mandar como respuesta va a ser la concatenacion de el array de mi db con el array de mi api (axios lo guarda en .data)
            return responde
              ? res.send(responde)
              : res.send({ message: "Responde no existe" }); //por ultimo respondo al servidor
          });
      }
    } catch (err) {
      next(err);
    }
  };

  getById = (req, res, next) => {
    const { id } = req.params;
    try {
      if (id.length > 10) {
        const myBreedId = this.model.findByPk(
          id, {
          include: [
            {
              model: Temperament,
              as: "temperament",
              attributes: ["id", "name"],
            },
          ],
        });
        myBreedId.then((resultsId) => {
          resultsId? res.send(resultsId) : res.sendStatus(404)
        });
      } else {
        axios.get(BASE_URL).then((resultsId) => {
          const axiosId = resultsId.data.filter(
            (apiId) => apiId.id === parseInt(id)
          );
          return axiosId.length? res.send(axiosId) : res.sendStatus(404)
        });
      }
    } catch (err) {
      next(err.toJSON);
    }
  };

  created = (req, res, next) => {
    const modelo = req.body;
    try {
      return this.model
        .create({
          ...modelo,
          id: uuidv4(),
        })
        .then((breed) => breed.addTemperament(modelo.temperament))
        .then((created) => {
          return res.send(created);
        });
    } catch (err) {
      next(err.toJSON);
    }
  };
}

const breedController = new BreedModel(Breed);

module.exports = breedController;
