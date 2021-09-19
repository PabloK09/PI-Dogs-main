const { Router } = require("express");
const breedController = require("../controllers/breeds")
const router = Router();


router.get("/", breedController.getAllv3);
router.get("/:id",  breedController.getByIdv2);
router.put("/:id",  breedController.updatev2);
router.delete("/:id",  breedController.destroy);


module.exports = router;