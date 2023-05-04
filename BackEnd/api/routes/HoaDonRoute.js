const express = require("express");
const router = express.Router();
const hoaDonController = require("../controllers/HoaDonController");

router.use("/GetList", hoaDonController.getList);
router.use("/Insert", hoaDonController.themHD);
// router.use("/FilterOrder", donHangController.filterOrder);
// router.use("/UpdateOrder", donHangController.updateOrder);

router.use("/", hoaDonController.index);

module.exports = router;
