const { Breed, Temperament, Breedcreated } = require("../db.js");
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
          let [myBreedResults, apiBreedsResults] = results;
          myBreedResults = myBreedResults.map((breed) => {
            return {
              id: breed.id,
              name: breed.name,
              weight: breed.weight
                .map((w) => {
                  return w.value;
                })
                .join(" - "),
              height: breed.height
                .map((h) => {
                  return h.value;
                })
                .join(" - "),
              life_span: breed.life_span
                ?.map((ls) => {
                  return ls.value;
                })
                .join(" - "),
              image: breed.image,
              temperament: breed.temperament
                .map((temp) => {
                  return temp.name;
                })
                .join(", "),
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
              image: breed.reference_image_id
                ? "https://cdn2.thedogapi.com/images/" +
                  breed.reference_image_id +
                  ".jpg"
                : `https://www.seekpng.com/png/full/360-3605845_dog-holding-paper-in-mouth.png`,
            };
          });

          const responde = myBreedResults.concat(apiBreedsResults);
          return responde.length
            ? res.send(responde)
            : res.send({ message: "The breed not exist" });
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
        Promise.all([myBreed, apiBreeds]).then((results) => {
          let [myBreedResults, apiBreedsResults] = results;

          myBreedResults = myBreedResults.map((breed) => {
            console.log(breed);
            return {
              id: breed.id,
              name: breed.name,
              weight: breed.weight
                .map((w) => {
                  return w.value;
                })
                .join(" - "),
              height: breed.height
                .map((h) => {
                  return h.value;
                })
                .join(" - "),
              life_span: breed.life_span
                ?.map((ls) => {
                  return ls.value;
                })
                .join(" - "),
              image: breed.image,
              temperament: breed.temperaments
                .map((temp) => {
                  return temp.name;
                })
                .join(", "),
              created: breed.created,
              fav: (breed.fav = false),
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
              fav: (breed.fav = false),
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
          let arrBreed = [];
          arrBreed.push(resultsId);
          arrBreed = arrBreed.map((breed) => {
            return {
              id: breed.id,
              name: breed.name,
              weight: breed.weight
                .map((w) => {
                  return w.value;
                })
                .join(" - "),
              height: breed.height
                .map((h) => {
                  return h.value;
                })
                .join(" - "),
              life_span: breed.life_span
                ?.map((ls) => {
                  return ls.value;
                })
                .join(" - "),
              image: breed.image,
              temperament: breed.temperament
                .map((temp) => {
                  return temp.name;
                })
                .join(", "),
            };
          });

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
              origin: breed.origin,
            };
          });
          return axiosId.length ? res.send(axiosId) : res.sendStatus(404);
        });
      }
    } catch (err) {
      next(err);
    }
  };

  created = (req, res, next) => {
    const modelo = req.body;
    try {
      return Breed.create({
        ...modelo,
        id: uuidv4(),
      })

        .then((breed) => {
          breed.addTemperament(modelo.temperament);
        })
        .then((created) => {
          return res.send(created);
        });
    } catch (err) {
      next(err);
    }
  };

  getAllv3 = (req, res, next) => {
    const myBreed = Breed.findAll(
      {
      order: [["name", "asc"]],
    }
    );
    const myBreedCreated = Breedcreated.findAll(
      {
      include: [
        {
          model: Temperament,
          as: "temperament",
          attributes: ["id", "name"],
        },
      ],
      order: [["name", "asc"]],
    }
    );
    Promise.all([myBreed, myBreedCreated]).then((results) => {
      let [myBreedResults, myBreedCreatedResults] = results;
      myBreedResults = myBreedResults.map((breed) => {
        return {
          id: breed.id,
          name: breed.name,
          weight: breed.weight
            .map((w) => {
              return w.value;
            })
            .join(" - "),
          height: breed.height
            .map((h) => {
              return h.value;
            })
            .join(" - "),
          life_span: breed.life_span
            ?.map((ls) => {
              return ls.value;
            })
            .join(" - "),
          image: breed.image,
          temperament: breed.temperaments,
          created: breed.created,
          fav: breed.favourite,
        };
      });
      myBreedCreatedResults = myBreedCreatedResults.map((breed) => {
        return {
          id: breed.id,
          name: breed.name,
          weight: breed.weight
            .map((w) => {
              return w.value;
            })
            .join(" - "),
          height: breed.height
            .map((h) => {
              return h.value;
            })
            .join(" - "),
          life_span: breed.life_span
            ?.map((ls) => {
              return ls.value;
            })
            .join(" - "),
          image: breed.image,
          temperament: breed.temperament
                .map((temp) => {
                  return temp.name;
                })
                .join(", "),
          created: breed.created,
          fav: breed.favourite,
        }
      })
      const response = myBreedCreatedResults.concat(myBreedResults)
      res.send(response)
    });
  };

  getByIdv2 = (req, res, next) => {
    const { id } = req.params;
    try{
      if(id.length > 10){
      const myBreeCreatedId = Breedcreated.findByPk(id, {
        include: [
          {
            model: Temperament,
            as: "temperament",
            attributes: ["id", "name"],
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      myBreeCreatedId.then((resultsId) => {
        let arrBreed = [];
        arrBreed.push(resultsId);
        arrBreed = arrBreed.map((breed) => {
          return {
            id: breed.id,
            name: breed.name,
            weight: breed.weight
              .map((w) => {
                return w.value;
              })
              .join(" - "),
            height: breed.height
              .map((h) => {
                return h.value;
              })
              .join(" - "),
            life_span: breed.life_span
              ?.map((ls) => {
                return ls.value;
              })
              .join(" - "),
            image: breed.image,
            temperament: breed.temperament
              .map((temp) => {
                return temp.name;
              })
              .join(", "),
          };
        });

        resultsId ? res.send(arrBreed) : res.sendStatus(404);
      }) }
      else{
        const myBreeId = Breed.findByPk(id, {
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        myBreeId.then((resultsId) => {
          let arrBreed = [];
          arrBreed.push(resultsId);
          arrBreed = arrBreed.map((breed) => {
            return {
              id: breed.id,
              name: breed.name,
              weight: breed.weight
                .map((w) => {
                  return w.value;
                })
                .join(" - "),
              height: breed.height
                .map((h) => {
                  return h.value;
                })
                .join(" - "),
              life_span: breed.life_span
                ?.map((ls) => {
                  return ls.value;
                })
                .join(" - "),
              image: breed.image,
              temperament: breed.temperaments,
              bred_for: breed.bred_for,
              breed_group: breed.breed_group,
              origin: breed.origin,
            };
          });
          resultsId ? res.send(arrBreed) : res.sendStatus(404);
        })
      }
    } 
    catch (err) {
      next(err)
    }
  }

  createdv2 = (req, res, next) => {
    const modelo = req.body;
    try {
      return Breedcreated.create({
        id: uuidv4(),
        ...modelo,
      })
        .then((breed) => {
          breed.addTemperament(modelo.temperaments);
        })
        .then((created) => {
          return res.send(created);
        });
    } catch (err) {
      next(err);
    }
  };

  updatev2 = (req, res, next) => {
    const { id } = req.params;
    if(id.length > 10){
    const breedEdit = req.body;
    return Breedcreated.update(breedEdit, {
      where: {
        id,
      },
    })
      .then((updated) => res.send(updated))
      .catch((err) => next(err.toJSON));
  }else {
    const breedEdit = req.body;
    return Breed.update(breedEdit, {
      where: {
        id,
      },
    })
      .then((updated) => res.send(updated))
      .catch((err) => next(err.toJSON));
  }
}
}

const breedController = new BreedModel(Breed);

module.exports = breedController;
