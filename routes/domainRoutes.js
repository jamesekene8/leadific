const router = require("express").Router();
const domainController = require("../controllers/domainController");

router.post("/", domainController.createDomain);

router.get("/", domainController.getAllDomain);

router.put("/:domainId", domainController.updateDomain);

router.get("/byOwner/:ownerId", domainController.getByOwner);

router.post("/search", domainController.fuzzySearch);

module.exports = router;
