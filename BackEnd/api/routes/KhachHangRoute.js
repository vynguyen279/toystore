const express = require('express')
const router = express.Router()
const khachHangController = require('../controllers/KhachHangController')

router.use('/GetList', khachHangController.getList)
router.use('/Insert', khachHangController.themKh)
router.use('/Delete', khachHangController.xoaKh)
router.use('/Update', khachHangController.capNhatKh)
router.use('/Search', khachHangController.timKiemKh)
router.use('/', khachHangController.index)


module.exports = router;