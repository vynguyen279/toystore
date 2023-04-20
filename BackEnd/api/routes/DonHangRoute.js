const express = require("express");
const router = express.Router();
const donHangController = require("../controllers/DonHangController");

router.use("/AddOrder", donHangController.themDH);
router.use("/ListOrder", donHangController.getListOrder);
router.use("/UpdateOrder", donHangController.updateOrder);

router.use("/", donHangController.index);

module.exports = router;
