const express = require("express");
const router = express.Router();
const taiKhoanController = require("../controllers/TaiKhoanController");

router.use("/DangNhap", taiKhoanController.dangNhap);
router.use("/CheckEmail", taiKhoanController.checkEmail);
router.use("/GetList", taiKhoanController.getList);
router.use("/DoiMatKhau", taiKhoanController.doiMatKhau);
router.use("/DangKy", taiKhoanController.dangKy);
router.use("/ResetMatKhau", taiKhoanController.resetMatKhau);
router.use("/SendEmail", taiKhoanController.sendEmail);
router.use("/UpdateTitle", taiKhoanController.capNhatChucVu);
router.use("/", taiKhoanController.index);

module.exports = router;
