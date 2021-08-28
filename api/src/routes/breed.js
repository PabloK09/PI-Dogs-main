const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const breedController = require("../controllers/breeds")
const router = Router();

// Configurar los routers

router.get("/", breedController.getAllv2);
router.get("/:id",  breedController.getById);
router.post("/",  breedController.create);


router.put("/:id",  breedController.update);
router.delete("/:id",  breedController.destroy);


module.exports = router;