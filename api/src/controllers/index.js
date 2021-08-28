const {v4: uuidv4} = require('uuid')

class modelCrud {
  constructor(model) {
    this.model = model;
  }

  getAll = (req, res, next) => {
    return this.model.findAll()
      .then((results) => res.send(results))
      .catch((err) => next(err.toJSON));
  };

  getById = (req, res, next) => {
    const { id } = req.params;
    return this.model.findByPk(id)
      .then((resultsId) => res.send(resultsId))
      .catch((err) => next(err.toJSON));
  };

  create = (req, res, next) => {
    const breed = req.body;
    return this.model.create({
      ...breed,
      id: uuidv4(),
    })
      .then((created) => res.send(created))
      .catch((err) => next(err.toJSON));
  };

  update = (req, res, next) => {
    const { id } = req.params;
    const breedEdit = req.body;
    return this.model.update(breedEdit, {
      where: {
        id,
      },
    })
      .then((updated) => res.send(updated))
      .catch((err) => next(err.toJSON));
  };

  destroy = (req, res, next) => {
    const { id } = req.params;
    return this.model.destroy({
      where: {
        id,
      },
    })
      .then(() => res.sendStatus(200).json({message: "Destroy completed"}))
      .catch((err) => next(err.toJSON));
  };
}

module.exports = modelCrud