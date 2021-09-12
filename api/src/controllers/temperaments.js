const { Temperament } = require("../db.js");
const ModelCrud = require("./index")

class TemperamentModel extends ModelCrud {
    constructor(model) {
        super (model);
    }
    
    getAll = (req, res, next) => {
        try{
           const myTemperament = this.model.findAll({
               order: [['name', 'asc']]
           })
           myTemperament.then((results) => res.send(results));
        }catch(err){
            next(err);
        }
    }
}

const temperamentController = new TemperamentModel(Temperament)

module.exports = temperamentController
