const express = require('express')
const router = express.Router()
const nhanVienController = require('../controllers/NhanVienController')

router.use('/GetList', nhanVienController.getList)
router.use('/Insert', nhanVienController.themNv)
router.use('/Delete', nhanVienController.xoaNv)
router.use('/Update', nhanVienController.capNhatNv)
router.use('/Search', nhanVienController.timKiemNv)
router.use('/', nhanVienController.index)


module.exports = router;