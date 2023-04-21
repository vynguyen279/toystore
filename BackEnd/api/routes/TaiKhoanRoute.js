const express = require("express");
const router = express.Router();
const taiKhoanController = require("../controllers/TaiKhoanController");

<<<<<<< HEAD
router.use('/DangNhap', taiKhoanController.dangNhap)
router.use('/GetList', taiKhoanController.getList)
router.use('/DoiMatKhau', taiKhoanController.doiMatKhau)
router.use('/SendEmail', taiKhoanController.sendEmail)
router.use('/CapTaiKhoanOrResetMatKhau', taiKhoanController.capTaiKhoan)
router.use('/ResetMatKhau', taiKhoanController.resetMatKhau)
router.use('/', taiKhoanController.index)
=======
router.use("/DangNhap", taiKhoanController.dangNhap);
router.use("/CheckEmail", taiKhoanController.checkEmail);
router.use("/GetList", taiKhoanController.getList);
router.use("/DoiMatKhau", taiKhoanController.doiMatKhau);
// router.use('/KhoaOrMoKhoaTaiKhoan', taiKhoanController.khoaOrMoKhoaTaiKhoan)
router.use("/DangKy", taiKhoanController.capTaiKhoan);
router.use("/ResetMatKhau", taiKhoanController.resetMatKhau);
router.use("/", taiKhoanController.index);
>>>>>>> 59a1d99c58741cf79db0156d082d91291b512a25

module.exports = router;
