const { Temperament } = require("../db.js");
const ModelCrud = require("./index")
const axios = require("axios");
const {BASE_URL} = require("../constants")

class TemperamentModel extends ModelCrud {
    constructor(model) {
        super (model);
    }
    //me tengo que traer todos los temperamentos posibles que tenga la api y guardarlos en mi base de datos
    getAll = (req, res, next) => {
        
    }
}

const temperamentController = new TemperamentModel(Temperament)

module.exports = temperamentController

getAll = (req, res, next) => {
    const temperamentos = [];
    try{
        axios.get(BASE_URL)
        .then((resultTemp)=> {
            resultTemp.data.map(apiTemp => {
                !temperamentos.includes(apiTemp.temperament)?
                false : temperamentos.push(apiTemp.temperament);
            })
            console.log(temperamentos);
            res.send(temperamentos);
        })
    }catch(err){
        next(err);
    }
}