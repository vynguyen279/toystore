const express = require("express");
const router = express.Router();
const CTDDHController = require("../controllers/CTDDHController");

router.use("/AddDetail", CTDDHController.themCTDDH);
router.use("/Detail", CTDDHController.getListDetaiil);

router.use("/", CTDDHController.index);

module.exports = router;
