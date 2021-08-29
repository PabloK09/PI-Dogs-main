const { Router } = require("express");
const breedController = require("../controllers/breeds")
const router = Router();


router.get("/", breedController.getAllv2);
router.get("/:id",  breedController.getById);

router.put("/:id",  breedController.update);
router.delete("/:id",  breedController.destroy);


module.exports = router;