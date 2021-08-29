const { Router } = require("express");
// Importar todos los routers;
const router = Router();

const breed = require('./breed')
const temperament = require('./temperament')
const breedController = require("../controllers/breeds")

// Configurar los routers

router.post("/dog", breedController.created)

router.use("/dogs", breed);
router.use("/temperament", temperament)


module.exports = router;
