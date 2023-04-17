const express = require("express");
const router = express.Router();
const gioHangController = require("../controllers/GioHangController");

router.use("/AddCart", gioHangController.themSP);
router.use("/DeleteCart", gioHangController.xoaSP);
router.use("/DeleteAllCart", gioHangController.xoaAll);
router.use("/ListCart", gioHangController.getListCart);

router.use("/", gioHangController.index);

module.exports = router;
