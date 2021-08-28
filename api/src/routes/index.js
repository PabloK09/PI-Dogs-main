const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Breed, Temperament } = require("../db.js");
const {v4: uuidv4} = require("uuid")

const router = Router();
//USAR TRY AND CATCH EN LAS RUTAS Y TODO ASYNC AWAIT
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", (req, res, next) => {
  return Breed.findAll()  
  .then((breeds) => res.send(breeds))
  .catch((err) => next(err.toJSON));
});

router.get("/dogs/:id", (req, res, next) => {
    const {id} = req.params
    return Breed.findByPk(id)  
    .then((breeds) => res.send(breeds))
    .catch((err) => next(err.toJSON));
});

router.post("/dogs", (req, res, next) => {
    const breed = req.body
    return Breed.create({
        ...breed,
        id: uuidv4()
    })
    .then((breeds) => res.send(breeds))
    .catch((err) => next(err.toJSON));
  });

router.put("/dogs/:id", (req, res, next) => {
    const {id} = req.params
    const breedEdit = req.body
    return Breed.update(breedEdit, {
        where: {
            id,
        },
    })
    .then((breedsUpdate) => res.send(breedsUpdate))
    .catch((err) => next(err.toJSON));
  });

router.delete("/dogs/:id", (req, res, next) =>{
    const {id} = req.params
    return Breed.destroy({
        where: {
            id,
        },
    })
    .then(() => res.sendStatus(200).send("Borrado"))
    .catch((err) => next(err.toJSON));
})


module.exports = router;
