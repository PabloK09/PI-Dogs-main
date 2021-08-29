const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const temperamentController = require("../controllers/temperaments")
const router = Router();

// Configurar los routers

router.get("/", temperamentController.getAll);


router.get("/:id",  temperamentController.getById);
//router.post("/",  temperamentController.create);
router.put("/:id",  temperamentController.update);
router.delete("/:id",  temperamentController.destroy);


module.exports = router;