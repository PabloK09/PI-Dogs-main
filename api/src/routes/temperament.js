const { Router } = require("express");

const temperamentController = require("../controllers/temperaments")
const router = Router();

router.get("/", temperamentController.getAll);

router.get("/:id",  temperamentController.getById);
router.post("/",  temperamentController.create);
router.put("/:id",  temperamentController.update);
router.delete("/:id",  temperamentController.destroy);


module.exports = router;
