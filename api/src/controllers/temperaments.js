const { Temperament } = require("../db.js");
const ModelCrud = require("./index")

class TemperamentModel extends ModelCrud {
    constructor(model) {
        super (model);
    }
    //me tengo que traer todos los temperamentos posibles que tenga la api y guardarlos en mi base de datos
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
