const { Breed, Temperament } = require("../db.js");
const ModelCrud = require("./index");
const axios = require("axios");
const { BASE_URL, SEARCH_NAME } = require("../utils/constants");
const {API_KEY} = process.env;
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
          let [myBreedResults, apiBreedsResults] = results;
          myBreedResults = myBreedResults.map((breed) => {
            return {
              id: breed.id,
              name: breed.name,
              weight: breed.weight.map((w)=> {
                return w.value
              }).join(" - "),
              height: breed.height.map((h)=> {
                return h.value
              }).join(" - "),
              life_span: breed.life_span?.map((ls)=> {
                return ls.value
              }).join(" - "),
              image: breed.image,
              temperament: breed.temperament.map(temp => {
                return temp.name
              }).join(", ")
            };
          });

          apiBreedsResults = apiBreedsResults.data.map((breed) => {
            return {
              id: breed.id,
              name: breed.name,
              weight: breed.weight.metric,
              height: breed.height.metric,
              life_span: breed.life_span,
              temperament: breed.temperament,
              image: breed.reference_image_id ? "https://cdn2.thedogapi.com/images/"+breed.reference_image_id + ".jpg" : `https://www.seekpng.com/png/full/360-3605845_dog-holding-paper-in-mouth.png`
            };
          });
          
          const responde = myBreedResults.concat(apiBreedsResults);
          return responde.length
            ? res.send(responde)
            : res.send({ message: "The breed not exist" })
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
        });
        
        const apiBreeds = axios.get(BASE_URL); 
        Promise.all([myBreed, apiBreeds]) 
          .then((results) => {
            let [myBreedResults, apiBreedsResults] = results;

            myBreedResults = myBreedResults.map((breed) => {
              return {
                id: breed.id,
                name: breed.name,
                weight: breed.weight.map((w)=> {
                  return w.value
                }).join(" - "),
                height: breed.height.map((h)=> {
                  return h.value
                }).join(" - "),
                life_span: breed.life_span?.map((ls)=> {
                  return ls.value
                }).join(" - "),
                image: breed.image,
                temperament: breed.temperament.map(temp => {
                  return temp.name
                }).join(", ")
              };
            });

            apiBreedsResults = apiBreedsResults.data.map((breed) => {
              return {
                id: breed.id,
                name: breed.name,
                weight: breed.weight.metric,
                height: breed.height.metric,
                life_span: breed.life_span,
                temperament: breed.temperament,
                image: breed.image.url,
              };
            });
            const responde = myBreedResults.concat(apiBreedsResults);

            return responde
              ? res.send(responde)
              : res.send({ message: "Responde no existe" });
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
        let myBreedId = this.model.findByPk(id, {
          include: [
            {
              model: Temperament,
              as: "temperament",
              attributes: ["id", "name"],
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        myBreedId.then((resultsId) => {
          let arrBreed = []
          arrBreed.push(resultsId);
          arrBreed = arrBreed.map((breed) => {
              return {
                id: breed.id,
                name: breed.name,
                weight: breed.weight.map((w)=> {
                  return w.value
                }).join(" - "),
                height: breed.height.map((h)=> {
                  return h.value
                }).join(" - "),
                life_span: breed.life_span?.map((ls)=> {
                  return ls.value
                }).join(" - "),
                image: breed.image,
                temperament: breed.temperament.map(temp => {
                  return temp.name
                }).join(", ")
              };
          })
          
          resultsId ? res.send(arrBreed) : res.sendStatus(404);
        });
      } else {
        axios.get(BASE_URL).then((resultsId) => {
          let axiosId = resultsId.data.filter(
            (apiId) => apiId.id === parseInt(id)
          );
          axiosId = axiosId.map((breed) => {
            return {
              id: breed.id,
              name: breed.name,
              life_span: breed.life_span,
              weight: breed.weight.metric,
              height: breed.height.metric,
              temperament: breed.temperament,
              image: breed.image.url,
              bred_for: breed.bred_for,
              breed_group: breed.breed_group,
              origin: breed.origin
            };
          });
          return axiosId.length ? res.send(axiosId) : res.sendStatus(404);
        });
      }
    } catch (err) {
      next(err.toJSON);
    }
  };

  created = (req, res, next) => {
    const modelo = req.body;
    try {
      return Breed
        .create({
          ...modelo,
          id: uuidv4(),
        })
        
        .then((breed) => {
          breed.addTemperament(modelo.temperament)})
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
