const { Router } = require("express");
// Importar todos los routers;
const router = Router();

const breed = require('./breed')
const temperament = require('./temperament')

// Configurar los routers

router.use("/dogs", breed);
router.use("/temperament", temperament)


module.exports = router;
