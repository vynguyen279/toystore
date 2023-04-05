const express = require('express')
const router = express.Router()
const taiKhoanController = require('../controllers/TaiKhoanController')

router.use('/DangNhap', taiKhoanController.dangNhap)
router.use('/GetList', taiKhoanController.getList)
// router.use('/DoiMatKhau', taiKhoanController.doiMatKhau)
// router.use('/KhoaOrMoKhoaTaiKhoan', taiKhoanController.khoaOrMoKhoaTaiKhoan)
router.use('/CapTaiKhoanOrResetMatKhau', taiKhoanController.capTaiKhoanOrResetMatKhau)
router.use('/', taiKhoanController.index)


module.exports = router;